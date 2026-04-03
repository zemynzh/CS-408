<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Moon, Sun, Search, Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import SearchDialog from '@/components/search/SearchDialog.vue'
import AppLogo from './AppLogo.vue'
import { useTheme } from '@/composables/useTheme'
import { MODULES } from '@/config/modules'
import type { ModuleKey } from '@/config/modules'

const router = useRouter()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const mobileMenuOpen = ref(false)
const searchFocused = ref(false)

const activeModule = computed<ModuleKey | null>(() => {
  const name = String(route.name)
  if (name === 'knowledge') return route.params.module as ModuleKey
  if (name === 'exam') return 'past-exams'
  if (name === 'algorithms') return 'algorithms'
  return null
})

function navigateTo(key: ModuleKey) {
  const mod = MODULES.find((m) => m.key === key)
  if (mod?.type === 'exam') router.push({ name: 'exam' })
  else if (mod?.type === 'algorithms') router.push({ name: 'algorithms' })
  else router.push({ name: 'knowledge', params: { module: key } })
  mobileMenuOpen.value = false
}

const searchQuery = ref('')
const searchOpen = ref(false)
const searchInitial = ref('')
function handleSearch() {
  searchInitial.value = searchQuery.value.trim()
  searchOpen.value = true
  mobileMenuOpen.value = false
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchInitial.value = ''
    searchOpen.value = true
    mobileMenuOpen.value = false
  }
}

function goHome() {
  router.push({ name: 'home' })
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="flex h-14 items-center px-4">

      <!-- Logo：左对齐 -->
      <div class="flex-none">
        <button
          type="button"
          class="inline-flex items-center gap-2 cursor-pointer select-none"
          aria-label="返回首页"
          @click="goHome"
        >
          <AppLogo />
        </button>
      </div>

      <!-- 桌面端：模块导航居中 -->
      <nav class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
        <Button
          v-for="mod in MODULES"
          :key="mod.key"
          :variant="activeModule === mod.key ? 'default' : 'ghost'"
          size="sm"
          class="text-sm font-medium transition-colors duration-150"
          @click="navigateTo(mod.key)"
        >
          {{ mod.label }}
        </Button>
      </nav>

      <!-- 右侧工具区 -->
      <div class="flex items-center gap-2 ml-auto">

        <!-- 搜索框：用 max-width 动画代替 width，避免 layout reflow -->
        <div
          class="relative hidden md:block overflow-hidden transition-[max-width] duration-200 ease-in-out"
          :style="{ maxWidth: searchFocused ? '13rem' : '9rem' }"
        >
          <Search
            class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10"
          />
          <Input
            v-model="searchQuery"
            placeholder="搜索..."
            class="h-8 w-52 pl-8 text-sm"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            @keyup.enter="handleSearch"
          />
        </div>

        <!-- 主题切换：图标淡入淡出 -->
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 relative"
          :aria-label="isDark ? '切换浅色模式' : '切换深色模式'"
          @click="toggleTheme"
        >
          <Sun
            :class="[
              'h-4 w-4 absolute transition-all duration-200',
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75',
            ]"
          />
          <Moon
            :class="[
              'h-4 w-4 absolute transition-all duration-200',
              !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75',
            ]"
          />
        </Button>

        <!-- 移动端：汉堡菜单 -->
        <Sheet v-model:open="mobileMenuOpen">
          <SheetTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 md:hidden"
              aria-label="打开菜单"
            >
              <Menu class="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="w-64 p-0">
            <SheetHeader class="px-4 py-4 border-b border-border">
              <SheetTitle class="text-left">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 cursor-pointer select-none"
                  aria-label="返回首页"
                  @click="goHome"
                >
                  <AppLogo />
                </button>
              </SheetTitle>
            </SheetHeader>

            <nav class="flex flex-col gap-1 p-3">
              <Button
                v-for="mod in MODULES"
                :key="mod.key"
                :variant="activeModule === mod.key ? 'default' : 'ghost'"
                class="w-full justify-start text-sm font-medium transition-colors duration-150"
                @click="navigateTo(mod.key)"
              >
                {{ mod.label }}
              </Button>
            </nav>

            <div class="px-3 pt-1">
              <div class="relative">
                <Search
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none"
                />
                <Input
                  v-model="searchQuery"
                  placeholder="搜索..."
                  class="h-9 w-full pl-8 text-sm"
                  @keyup.enter="handleSearch"
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </div>
  </header>

  <SearchDialog v-model:open="searchOpen" :initialQuery="searchInitial" />
</template>
