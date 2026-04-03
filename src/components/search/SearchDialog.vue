<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, FileText, Loader2, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { MODULES } from '@/config/modules'
import { useSearch, type SearchResult } from '@/composables/useSearch'

const props = withDefaults(
  defineProps<{
    open: boolean
    initialQuery?: string
  }>(),
  {
    initialQuery: '',
  },
)

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const openModel = computed({
  get: () => props.open,
  set: (v: boolean) => emits('update:open', v),
})

const router = useRouter()
const { search, warmup } = useSearch()

const keyword = ref('')
const loading = ref(false)
const results = ref<SearchResult[]>([])
const activeIndex = ref(0)

function normalize(s: string) {
  return s.trim().toLowerCase()
}

type HighlightPart = { text: string; hit: boolean }
function highlightParts(text: string, keyword: string): HighlightPart[] {
  const q = normalize(keyword)
  if (!q) return [{ text, hit: false }]
  const hay = normalize(text)
  const parts: HighlightPart[] = []
  let from = 0
  let guard = 0
  while (from < text.length && guard < 40) {
    const i = hay.indexOf(q, from)
    if (i < 0) break
    if (i > from) parts.push({ text: text.slice(from, i), hit: false })
    parts.push({ text: text.slice(i, i + q.length), hit: true })
    from = i + q.length
    guard += 1
  }
  if (!parts.length) return [{ text, hit: false }]
  if (from < text.length) parts.push({ text: text.slice(from), hit: false })
  return parts
}

const moduleOrder = computed(() => {
  const map = new Map<string, number>()
  let i = 0
  for (const m of MODULES) {
    if (m.type !== 'knowledge') continue
    map.set(m.label, i++)
  }
  return map
})

const grouped = computed(() => {
  const q = keyword.value
  const knowledge = new Map<string, SearchResult[]>()
  const exam = new Map<number, SearchResult[]>()

  for (const r of results.value) {
    if (r.type === 'knowledge') {
      const key = r.subtitle || '知识点'
      const arr = knowledge.get(key) ?? []
      arr.push(r)
      knowledge.set(key, arr)
    } else {
      const year = r.meta?.year ?? 0
      const arr = exam.get(year) ?? []
      arr.push(r)
      exam.set(year, arr)
    }
  }

  const knowledgeGroups = Array.from(knowledge.entries()).sort((a, b) => {
    const ai = moduleOrder.value.get(a[0]) ?? 999
    const bi = moduleOrder.value.get(b[0]) ?? 999
    return ai - bi
  })
  const examGroups = Array.from(exam.entries()).sort((a, b) => b[0] - a[0])

  const flat: SearchResult[] = []
  for (const [, items] of knowledgeGroups) flat.push(...items)
  for (const [, items] of examGroups) flat.push(...items)

  const indexById = new Map<string, number>()
  for (let i = 0; i < flat.length; i += 1) indexById.set(flat[i].id, i)

  const activeItem = flat[activeIndex.value] ?? null
  return { knowledgeGroups, examGroups, flat, activeItem, indexById, q }
})

function focusInput() {
  nextTick(() => {
    const el = document.getElementById('global-search-input') as HTMLInputElement | null
    el?.focus()
    el?.select()
  })
}

async function runSearch(value: string) {
  const q = value.trim()
  if (!q) {
    results.value = []
    loading.value = false
    activeIndex.value = 0
    return
  }
  loading.value = true
  results.value = await search(q, 30)
  loading.value = false
  activeIndex.value = 0
}

function close() {
  openModel.value = false
}

function selectResult(item: SearchResult) {
  close()
  router.push(item.route)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!grouped.value.flat.length) return
    activeIndex.value = (activeIndex.value + 1) % grouped.value.flat.length
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!grouped.value.flat.length) return
    activeIndex.value = (activeIndex.value - 1 + grouped.value.flat.length) % grouped.value.flat.length
    return
  }
  if (e.key === 'Enter') {
    const item = grouped.value.flat[activeIndex.value]
    if (!item) return
    e.preventDefault()
    selectResult(item)
  }
}

let timer: number | null = null
watch(
  () => keyword.value,
  (v) => {
    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => runSearch(v), 120)
  },
)

watch(
  () => openModel.value,
  (open) => {
    if (!open) return
    keyword.value = props.initialQuery ?? ''
    results.value = []
    loading.value = false
    activeIndex.value = 0
    warmup()
    focusInput()
    if (keyword.value.trim()) runSearch(keyword.value)
  },
)
</script>

<template>
  <Sheet v-model:open="openModel">
    <SheetContent side="top" class="p-0">
      <div class="px-4 py-4">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="global-search-input"
                v-model="keyword"
                class="h-11 pl-10"
                placeholder="搜索知识点、题目、解析..."
                @keydown="onKeydown"
              />
            </div>
            <Button variant="outline" class="h-11 px-4" @click="close">关闭</Button>
          </div>

          <div class="mt-4 rounded-xl border border-border bg-background/40 overflow-hidden">
            <div class="px-4 py-2 flex items-center justify-between">
              <div class="text-xs font-semibold text-muted-foreground tracking-wide uppercase">搜索结果</div>
              <div class="text-xs text-muted-foreground">{{ results.length ? `${results.length} 条` : '' }}</div>
            </div>
            <Separator />

            <div class="relative">
              <div v-if="loading" class="absolute inset-x-0 top-0 z-10 px-4 py-3">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 class="h-4 w-4 animate-spin" />
                  正在检索...
                </div>
              </div>

              <ScrollArea class="h-[60vh]">
                <div class="p-2">
                  <template v-if="grouped.knowledgeGroups.length">
                    <div class="px-3 py-2 text-xs font-bold text-foreground/50 uppercase tracking-wide">知识点</div>
                    <template v-for="[groupName, items] in grouped.knowledgeGroups" :key="groupName">
                      <div class="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">{{ groupName }}</div>
                      <button
                        v-for="item in items"
                        :key="item.id"
                        type="button"
                        :class="[
                          'w-full text-left rounded-lg px-3 py-2 transition-colors',
                          item.id === grouped.activeItem?.id
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent/60',
                        ]"
                        @mouseenter="activeIndex = grouped.indexById.get(item.id) ?? 0"
                        @click="selectResult(item)"
                      >
                        <div class="flex items-start gap-3">
                          <div class="mt-0.5">
                            <BookOpen class="h-4 w-4 text-primary" />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                              <div class="text-sm font-semibold truncate">
                                <template v-for="(p, i) in highlightParts(item.title, grouped.q)" :key="i">
                                  <span v-if="p.hit" class="bg-primary/20 text-primary px-0.5 rounded-sm">{{ p.text }}</span>
                                  <span v-else>{{ p.text }}</span>
                                </template>
                              </div>
                              <div class="text-[11px] text-muted-foreground truncate">知识点</div>
                            </div>
                            <div v-if="item.snippet" class="mt-1 text-xs text-muted-foreground line-clamp-2">
                              <template v-for="(p, i) in highlightParts(item.snippet, grouped.q)" :key="i">
                                <span v-if="p.hit" class="bg-primary/20 text-primary px-0.5 rounded-sm">{{ p.text }}</span>
                                <span v-else>{{ p.text }}</span>
                              </template>
                            </div>
                          </div>
                        </div>
                      </button>
                    </template>
                  </template>

                  <template v-if="grouped.examGroups.length">
                    <div class="mt-2 px-3 py-2 text-xs font-bold text-foreground/50 uppercase tracking-wide">历年真题</div>
                    <template v-for="[y, items] in grouped.examGroups" :key="y">
                      <div class="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">{{ y }} 年</div>
                      <button
                        v-for="item in items"
                        :key="item.id"
                        type="button"
                        :class="[
                          'w-full text-left rounded-lg px-3 py-2 transition-colors',
                          item.id === grouped.activeItem?.id
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent/60',
                        ]"
                        @mouseenter="activeIndex = grouped.indexById.get(item.id) ?? 0"
                        @click="selectResult(item)"
                      >
                        <div class="flex items-start gap-3">
                          <div class="mt-0.5">
                            <FileText class="h-4 w-4 text-primary" />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                              <div class="text-sm font-semibold truncate">
                                <template v-for="(p, i) in highlightParts(item.title, grouped.q)" :key="i">
                                  <span v-if="p.hit" class="bg-primary/20 text-primary px-0.5 rounded-sm">{{ p.text }}</span>
                                  <span v-else>{{ p.text }}</span>
                                </template>
                              </div>
                              <div class="flex items-center gap-1">
                                <span
                                  v-if="item.meta?.questionId != null"
                                  class="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-semibold"
                                >
                                  {{ item.meta.questionId }}
                                </span>
                                <span
                                  v-if="item.meta?.subject"
                                  class="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-semibold"
                                >
                                  {{ item.meta.subject }}
                                </span>
                                <span
                                  v-if="item.meta?.kind"
                                  class="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-semibold"
                                >
                                  {{ item.meta.kind }}
                                </span>
                              </div>
                            </div>
                            <div v-if="item.snippet" class="mt-1 text-xs text-muted-foreground line-clamp-2">
                              <template v-for="(p, i) in highlightParts(item.snippet, grouped.q)" :key="i">
                                <span v-if="p.hit" class="bg-primary/20 text-primary px-0.5 rounded-sm">{{ p.text }}</span>
                                <span v-else>{{ p.text }}</span>
                              </template>
                            </div>
                          </div>
                        </div>
                      </button>
                    </template>
                  </template>

                  <div v-if="!loading && !results.length" class="px-3 py-10 text-center">
                    <div class="text-sm font-semibold">暂无结果</div>
                    <div class="mt-1 text-xs text-muted-foreground">试试更短的关键词，或换一种表述。</div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
