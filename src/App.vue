<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNav from '@/components/layout/TopNav.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightPanel from '@/components/layout/RightPanel.vue'
</script>

<template>
  <div class="h-screen flex flex-col bg-background text-foreground overflow-hidden">
    <!-- 顶部导航 -->
    <TopNav />

    <!-- 主体：侧边栏 + 内容区 + 右侧工具栏 -->
    <div class="flex flex-1 overflow-hidden">
      <SideBar />
      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
      <RightPanel />
    </div>
  </div>
</template>
