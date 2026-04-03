import type { RouteLocationRaw } from 'vue-router'
import { CHAPTERS } from '@/config/chapters'
import { MODULES } from '@/config/modules'

type SearchType = 'knowledge' | 'exam'

export interface SearchMeta {
  moduleKey?: string
  year?: number
  questionId?: number
  subject?: string
  kind?: string
}

export interface SearchResult {
  id: string
  type: SearchType
  title: string
  subtitle: string
  snippet?: string
  route: RouteLocationRaw
  meta?: SearchMeta
}

interface SearchDoc extends SearchResult {
  text: string
}

const knowledgeMarkdownModules = import.meta.glob('../data/knowledge/**/*.md', {
  query: '?raw',
  import: 'default',
})

const examDataModules = import.meta.glob('../data/exams/*.ts')

let docCache: SearchDoc[] | null = null
let docCachePromise: Promise<SearchDoc[]> | null = null

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function toSnippet(text: string, keyword: string) {
  const q = normalize(keyword)
  if (!q) return undefined
  const hay = normalize(text)
  const i = hay.indexOf(q)
  if (i < 0) return undefined
  const start = Math.max(0, i - 32)
  const end = Math.min(text.length, i + Math.max(q.length, 48) + 48)
  const sliced = text.slice(start, end).replace(/\s+/g, ' ').trim()
  return start > 0 ? `…${sliced}` : sliced
}

function scoreDoc(doc: SearchDoc, keyword: string) {
  const q = normalize(keyword)
  if (!q) return 0
  const t = normalize(doc.title)
  const b = normalize(doc.text)
  const ti = t.indexOf(q)
  const bi = b.indexOf(q)
  if (ti < 0 && bi < 0) return 0
  let score = 0
  if (ti >= 0) score += 260 - Math.min(ti, 200)
  if (bi >= 0) score += 120 - Math.min(bi, 100)
  if (t.startsWith(q)) score += 60
  return score
}

async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>) {
  const results: R[] = []
  let i = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const current = i++
      results[current] = await mapper(items[current])
    }
  })
  await Promise.all(workers)
  return results
}

function buildKnowledgeMetaDocs() {
  const knowledgeModules = MODULES.filter((m) => m.type === 'knowledge')
  const docs: SearchDoc[] = []
  for (const mod of knowledgeModules) {
    const chapters = CHAPTERS[mod.key] ?? []
    for (const ch of chapters) {
      const leaves = ch.children?.length ? ch.children : [ch]
      for (const leaf of leaves) {
        docs.push({
          id: `k:${mod.key}:${leaf.id}`,
          type: 'knowledge',
          title: leaf.title,
          subtitle: mod.label,
          route: { name: 'knowledge', params: { module: mod.key, chapterId: leaf.id } },
          meta: { moduleKey: mod.key },
          text: `${mod.label} ${leaf.title}`,
        })
      }
    }
  }
  return docs
}

async function hydrateKnowledgeContent(docs: SearchDoc[]) {
  const knowledgeDocs = docs.filter((d) => d.type === 'knowledge')
  await mapLimit(knowledgeDocs, 12, async (doc) => {
    const [, moduleKey, chapterId] = doc.id.split(':')
    const path = `../data/knowledge/${moduleKey}/${chapterId}.md`
    const loader = knowledgeMarkdownModules[path] as undefined | (() => Promise<string>)
    if (!loader) return doc
    const raw = await loader()
    doc.text = `${doc.text}\n${raw}`
    return doc
  })
  return docs
}

function parseExamYear(path: string) {
  const match = path.match(/\/(\d+)\.ts$/)
  return match ? Number(match[1]) : null
}

function buildExamDocsFromModule(year: number, mod: any): SearchDoc[] {
  const choice = (mod.CHOICE_QUESTIONS ?? []) as any[]
  const answer = (mod.ANSWER_QUESTIONS ?? []) as any[]
  const docs: SearchDoc[] = []

  for (const q of choice) {
    const title = `【${year}】${q.id} 选择题`
    const text = [q.subject, q.question, ...(q.options ?? []), q.explanation?.analysis ?? ''].join('\n')
    docs.push({
      id: `e:${year}:${q.id}`,
      type: 'exam',
      title,
      subtitle: '历年真题',
      route: { name: 'exam', params: { year }, hash: `#q-${q.id}` },
      meta: { year, questionId: q.id, subject: q.subject, kind: '选择题' },
      text,
    })
  }

  for (const q of answer) {
    const title = `【${year}】${q.id} 解答题`
    const text = [q.subject, q.question, q.explanation?.analysis ?? '', ...(q.explanation?.knowledgePoints ?? [])].join('\n')
    docs.push({
      id: `e:${year}:${q.id}`,
      type: 'exam',
      title,
      subtitle: '历年真题',
      route: { name: 'exam', params: { year }, hash: `#q-${q.id}` },
      meta: { year, questionId: q.id, subject: q.subject, kind: '解答题' },
      text,
    })
  }

  return docs
}

async function buildDocCache() {
  const baseDocs = buildKnowledgeMetaDocs()
  const examEntries = Object.entries(examDataModules)
  const examDocsNested = await mapLimit(examEntries, 6, async ([path, loader]) => {
    const year = parseExamYear(path)
    if (!year) return []
    const mod = await loader()
    return buildExamDocsFromModule(year, mod)
  })

  const docs = [...baseDocs, ...examDocsNested.flat()]
  await hydrateKnowledgeContent(docs)
  return docs
}

async function ensureDocs() {
  if (docCache) return docCache
  if (!docCachePromise) docCachePromise = buildDocCache().then((docs) => (docCache = docs))
  return docCachePromise
}

export function useSearch() {
  async function warmup() {
    await ensureDocs()
  }

  async function search(keyword: string, limit = 30): Promise<SearchResult[]> {
    const q = normalize(keyword)
    if (!q) return []
    const docs = await ensureDocs()
    const scored = docs
      .map((doc) => ({ doc, score: scoreDoc(doc, q) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ doc }) => ({
        id: doc.id,
        type: doc.type,
        title: doc.title,
        subtitle: doc.subtitle,
        snippet: toSnippet(doc.text, q),
        route: doc.route,
        meta: doc.meta,
      }))
    return scored
  }

  return { search, warmup }
}
