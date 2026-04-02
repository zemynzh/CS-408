<script setup lang="ts">
// Logo 组件
</script>

<template>
  <div class="flex items-center gap-2 select-none">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 外圆 -->
      <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="2" class="text-primary" />
      <!-- 内部芯片格纹 -->
      <rect x="9" y="9" width="14" height="14" rx="2" fill="currentColor" class="text-primary opacity-15" />
      <rect x="9" y="9" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5" class="text-primary" />
      <!-- 芯片引脚 左 -->
      <line x1="4" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <line x1="4" y1="16" x2="9" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <line x1="4" y1="20" x2="9" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <!-- 芯片引脚 右 -->
      <line x1="23" y1="12" x2="28" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <line x1="23" y1="16" x2="28" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <line x1="23" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <!-- 芯片引脚 上 -->
      <line x1="12" y1="4" x2="12" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <line x1="20" y1="4" x2="20" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <!-- 芯片引脚 下 -->
      <line x1="12" y1="23" x2="12" y2="28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <line x1="20" y1="23" x2="20" y2="28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-primary" />
      <!-- 内部文字 408 -->
      <text
        x="16"
        y="17.5"
        text-anchor="middle"
        font-size="6"
        font-weight="700"
        font-family="monospace"
        fill="currentColor"
        class="text-primary"
      >408</text>
    </svg>
    <span class="font-bold text-base leading-tight tracking-tight hidden sm:block">
      考研<span class="text-primary">408</span>
    </span>
  </div>
</template>
