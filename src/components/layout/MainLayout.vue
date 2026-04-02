<script setup lang="ts">
// 主布局容器（待实现）
// 三栏结构：左侧侧边栏 + 中间内容区 + 右侧工具栏
</script>

<template>
  <div class="flex h-screen flex-col">
    <!-- TopNav -->
    <!-- 主体三栏 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- SideBar -->
      <!-- 中间内容区 -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
      <!-- RightPanel -->
    </div>
  </div>
</template>
