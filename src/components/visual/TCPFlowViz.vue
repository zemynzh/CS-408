<script setup lang="ts">
import { computed } from 'vue'
import type { TCPVisual } from '@/types/exam'
import { Monitor, Server } from 'lucide-vue-next'

const props = defineProps<{ visual: TCPVisual }>()

// 每 ms 对应的像素高度，再次增加以彻底拉开距离
const SCALE = 60 
// 总高度
const height = computed(() => props.visual.totalTime * SCALE + 150)

function getPacketStyle(packet: any, index: number) {
  const startY = packet.time * SCALE + 80
  const endY = packet.arrival * SCALE + 80
  
  return {
    top: `${startY}px`,
    height: `${endY - startY}px`,
    left: '40px',
    width: 'calc(100% - 80px)',
    zIndex: 10 + index
  }
}

// 优化标签偏移逻辑：解决同侧同时间包的堆叠
function getLabelStyle(packet: any, index: number) {
  const isFromClient = packet.from === 'client'
  
  // 找出所有【在同一时刻】且【来自同一发送方】的包，按索引排序
  const sameTimeAndSource = props.visual.packets.filter(p => p.time === packet.time && p.from === packet.from)
  const offsetIndex = sameTimeAndSource.indexOf(packet)
  
  // 找出所有【在同一时刻】且【到达该侧】的包（即另一方发来的包刚好到站）
  const arrivingAtSameTime = props.visual.packets.filter(p => p.arrival === packet.time && p.from !== packet.from)
  
  // 基础垂直偏移：每个同时间包下移 85px 以确保完全避开上方标签
  let verticalOffset = offsetIndex * 85 
  
  // 如果此位置已经有“到站”报文的箭头或标签（TCP 常见的一收一发交汇点），再额外下移
  if (arrivingAtSameTime.length > 0) {
    verticalOffset += 40 
  }

  return {
    transform: `translateY(${verticalOffset}px)`,
    // 标签紧贴发送端的轴线，留出中间空间给时间刻度
    left: isFromClient ? '10px' : 'auto',
    right: !isFromClient ? '10px' : 'auto',
  }
}
</script>

<template>
  <div class="mt-6 p-4 bg-background border border-border rounded-xl shadow-inner overflow-hidden">
    <div class="flex items-center justify-between mb-8 border-b pb-4">
      <h4 class="text-sm font-bold flex items-center gap-2 text-primary">
        <span class="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
        TCP 交互时序图
      </h4>
      <div class="flex items-center gap-3">
        <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-bold">
          TOTAL: {{ visual.totalTime }}ms
        </span>
      </div>
    </div>

    <div class="relative select-none" :style="{ height: `${height}px` }">
      <!-- 两侧垂直基准线（轴线） -->
      <div class="absolute left-10 top-14 bottom-0 w-1.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-full"></div>
      <div class="absolute right-10 top-14 bottom-0 w-1.5 bg-gradient-to-b from-orange-500/30 via-orange-500/10 to-transparent rounded-full"></div>

      <!-- 角色标识 -->
      <div class="absolute left-0 top-0 flex flex-col items-center w-20 z-30">
        <div class="p-2.5 rounded-2xl bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/10">
          <Monitor class="w-5 h-5" />
        </div>
        <span class="text-[11px] font-black mt-3 text-primary tracking-tighter uppercase">Client (C)</span>
      </div>
      <div class="absolute right-0 top-0 flex flex-col items-center w-20 z-30">
        <div class="p-2.5 rounded-2xl bg-orange-500 text-white shadow-xl ring-4 ring-orange-500/10">
          <Server class="w-5 h-5" />
        </div>
        <span class="text-[11px] font-black mt-3 text-orange-600 tracking-tighter uppercase">Server (Si)</span>
      </div>

      <!-- 时间刻度 (更加精致的居中设计) -->
      <div v-for="t in Math.ceil(visual.totalTime / 5) + 1" :key="t" 
           class="absolute left-1/2 -translate-x-1/2 flex items-center z-10"
           :style="{ top: `${(t-1) * 5 * SCALE + 80}px` }">
        <div class="flex items-center">
          <div class="w-4 h-[1px] bg-gradient-to-r from-transparent to-muted-foreground/20"></div>
          <span class="text-[10px] font-mono font-bold text-muted-foreground/50 bg-muted/30 backdrop-blur-sm px-2 py-0.5 border border-border/50 rounded-full tabular-nums">
            {{ (t-1) * 5 }}ms
          </span>
          <div class="w-4 h-[1px] bg-gradient-to-l from-transparent to-muted-foreground/20"></div>
        </div>
      </div>

      <!-- 报文交互线 -->
      <div v-for="(p, i) in visual.packets" :key="i"
           class="absolute group cursor-help"
           :style="getPacketStyle(p, i)">
        
        <!-- 交互箭头 -->
        <svg class="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none">
          <defs>
            <marker :id="`arrow-${i}`" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
              <path d="M0,2 L10,6 L0,10 Z" :class="p.from === 'client' ? 'fill-primary' : 'fill-orange-500'" />
            </marker>
          </defs>
          <line 
            :x1="p.from === 'client' ? '0%' : '100%'" 
            :y1="0" 
            :x2="p.from === 'client' ? '100%' : '0%'" 
            :y2="'100%'" 
            :class="[
              'transition-all duration-300 stroke-[2.5px]',
              p.from === 'client' ? 'stroke-primary/20 group-hover:stroke-primary' : 'stroke-orange-500/20 group-hover:stroke-orange-600'
            ]"
            :marker-end="`url(#arrow-${i})`"
          />
        </svg>
        
        <!-- 标签卡片：增大尺寸和边距以解决重叠 -->
        <div :class="[
          'absolute px-3 py-2 rounded-xl border shadow-lg transition-all duration-300 z-20 min-w-[150px] group-hover:z-50 group-hover:scale-105',
          p.from === 'client' 
            ? 'top-0 border-primary/20 bg-background/95 backdrop-blur shadow-primary/5' 
            : 'bottom-0 border-orange-500/20 bg-background/95 backdrop-blur shadow-orange-500/5',
        ]" :style="getLabelStyle(p, i)">
          <div :class="['font-black text-[12px] mb-1.5 flex items-center justify-between', p.from === 'client' ? 'text-primary' : 'text-orange-600']">
            <span class="flex items-center gap-2">
               <span class="w-2 h-2 rounded-full" :class="p.from === 'client' ? 'bg-primary' : 'bg-orange-500'"></span>
               {{ p.label }}
            </span>
            <span class="text-[9px] bg-muted/50 px-1.5 rounded text-muted-foreground font-mono">{{ p.time }}ms</span>
          </div>
          <div class="flex flex-wrap gap-1.5 mb-2">
            <span v-if="p.seq" class="text-[9px] bg-muted/80 px-2 py-0.5 rounded-md text-muted-foreground border border-border/10 font-mono">seq:{{ p.seq }}</span>
            <span v-if="p.ack" class="text-[9px] bg-muted/80 px-2 py-0.5 rounded-md text-muted-foreground border border-border/10 font-mono">ack:{{ p.ack }}</span>
          </div>
          <div v-if="p.payload" class="text-[10px] text-foreground/60 leading-snug border-t border-muted/50 pt-2 mt-1 italic">
            {{ p.payload }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-[11px] text-muted-foreground leading-relaxed italic border-t pt-4 bg-muted/20 px-4 py-3 rounded-b-xl border-dashed">
      <div class="flex items-start gap-2">
        <span class="text-orange-500 font-bold">PRO TIP:</span>
        <span>{{ visual.description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover line {
  stroke-dasharray: 0;
  stroke-width: 3px;
}
</style>
