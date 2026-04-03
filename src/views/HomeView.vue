<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, FileText, Sparkles, Workflow, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { MODULES } from '@/config/modules'
import { CHAPTERS } from '@/config/chapters'
import { EXAM_YEARS } from '@/config/exams'

const router = useRouter()

const knowledgeModules = computed(() => MODULES.filter((m) => m.type === 'knowledge'))

function countLeafChapters(moduleKey: string) {
  const chapters = CHAPTERS[moduleKey as keyof typeof CHAPTERS] ?? []
  let count = 0
  for (const ch of chapters) {
    if (ch.children?.length) count += ch.children.length
    else count += 1
  }
  return count
}

const totalLeafChapters = computed(() => {
  return knowledgeModules.value.reduce((sum, m) => sum + countLeafChapters(m.key), 0)
})

const latestExamYear = computed(() => EXAM_YEARS[0]?.year ?? null)

function goToModule(key: string) {
  const chapters = CHAPTERS[key as keyof typeof CHAPTERS] ?? []
  const firstLeaf = chapters[0]?.children?.[0]?.id ?? chapters[0]?.id ?? null
  router.push({ name: 'knowledge', params: { module: key, chapterId: firstLeaf ?? undefined } })
}

function goToExams() {
  router.push({ name: 'exam', params: { year: latestExamYear.value ?? undefined } })
}
</script>

<template>
  <div class="h-full overflow-y-auto bg-background">
    <div class="max-w-6xl mx-auto px-6 py-10">
      <section class="relative overflow-hidden rounded-2xl border border-border bg-card/30">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div class="relative p-8 md:p-12">
          <div class="flex items-start justify-between gap-6">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold text-foreground/80">
                <Sparkles class="h-3.5 w-3.5" />
                408 复习助手 · 知识点 + 真题一体化
              </div>
              <h1 class="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
                用更清晰的结构，系统化复习 408
              </h1>
              <p class="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                左侧按科目与章节导航，右侧按题号快速定位；知识点支持 Markdown 排版，真题支持滚动高亮与一键跳题，尽量把复习流程做得更顺手。
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <Button size="lg" class="gap-2" @click="goToModule(knowledgeModules[0]?.key ?? 'data-structure')">
                  <BookOpen class="h-4 w-4" />
                  开始复习
                </Button>
                <Button variant="outline" size="lg" class="gap-2" @click="goToExams">
                  <FileText class="h-4 w-4" />
                  查看真题
                </Button>
              </div>

              <div class="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <div class="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2">
                  <BookOpen class="h-3.5 w-3.5 text-primary" />
                  <span>已整理 {{ totalLeafChapters }} 个知识点章节</span>
                </div>
                <div class="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2">
                  <FileText class="h-3.5 w-3.5 text-primary" />
                  <span>真题年份 {{ EXAM_YEARS.length }} 份（2009–2026）</span>
                </div>
              </div>
            </div>

            <div class="hidden lg:block shrink-0 w-80">
              <div class="rounded-xl border border-border bg-background/50 p-5">
                <div class="text-sm font-semibold">快速入口</div>
                <div class="mt-3 grid gap-2">
                  <button
                    v-for="mod in knowledgeModules"
                    :key="mod.key"
                    class="flex items-center justify-between gap-3 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    @click="goToModule(mod.key)"
                  >
                    <span class="truncate font-medium">{{ mod.label }}</span>
                    <span class="text-xs text-muted-foreground">
                      {{ countLeafChapters(mod.key) }} 节
                    </span>
                  </button>

                  <button
                    class="flex items-center justify-between gap-3 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    @click="goToExams"
                  >
                    <span class="truncate font-medium">历年真题</span>
                    <span class="text-xs text-muted-foreground">
                      {{ latestExamYear ? `最新 ${latestExamYear}` : '进入' }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-10 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border border-border bg-card/30 p-6">
          <div class="flex items-center gap-2 text-sm font-semibold">
            <Workflow class="h-4 w-4 text-primary" />
            结构化章节
          </div>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            按科目与章/节组织，和侧边栏导航保持一致，减少来回翻找成本。
          </p>
        </div>
        <div class="rounded-xl border border-border bg-card/30 p-6">
          <div class="flex items-center gap-2 text-sm font-semibold">
            <Search class="h-4 w-4 text-primary" />
            更顺的定位
          </div>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            真题页面支持滚动高亮题号与右侧跳题（题号导航），定位更快。
          </p>
        </div>
        <div class="rounded-xl border border-border bg-card/30 p-6">
          <div class="flex items-center gap-2 text-sm font-semibold">
            <BookOpen class="h-4 w-4 text-primary" />
            Markdown 排版
          </div>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            知识点内容使用 Markdown 渲染，表格与排版已做全局样式优化，阅读更舒服。
          </p>
        </div>
      </section>

      <section class="mt-10 rounded-2xl border border-border bg-card/20 p-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold">从一个章节开始，保持节奏</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              推荐先从「数据结构」开始建立题感与方法论，再逐步扩展到其余科目。
            </p>
          </div>
          <div class="flex gap-3">
            <Button variant="secondary" class="gap-2" @click="goToModule('data-structure')">
              <BookOpen class="h-4 w-4" />
              数据结构
            </Button>
            <Button variant="outline" class="gap-2" @click="goToExams">
              <FileText class="h-4 w-4" />
              做一套真题
            </Button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
