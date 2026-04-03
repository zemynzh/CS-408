import type { PageVisual, PageStep } from '@/types/exam'
import { randInt } from '@/utils/algo'

export function buildPageReplacementDemo(): PageVisual {
  const frameCount = 3
  const referenceString = Array.from({ length: 12 }, () => randInt(1, 7))
  const steps: PageStep[] = []
  
  let frames: (number | null)[] = Array(frameCount).fill(null)
  const lruQueue: number[] = [] // 用于 LRU 逻辑

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]
    const hitIndex = frames.indexOf(page)
    const hit = hitIndex !== -1
    let replaced: number | null = null

    if (hit) {
      // LRU: 更新使用顺序
      const idx = lruQueue.indexOf(page)
      lruQueue.splice(idx, 1)
      lruQueue.push(page)
      
      steps.push({
        description: `页面 ${page} 已在物理块中 (命中)`,
        access: page,
        frames: [...frames],
        hit: true,
      })
    } else {
      const emptyIndex = frames.indexOf(null)
      if (emptyIndex !== -1) {
        frames[emptyIndex] = page
        lruQueue.push(page)
        steps.push({
          description: `物理块未满，将页面 ${page} 放入空闲块`,
          access: page,
          frames: [...frames],
          hit: false,
        })
      } else {
        // LRU 替换最久未使用的
        replaced = lruQueue.shift()!
        const replaceIndex = frames.indexOf(replaced)
        frames[replaceIndex] = page
        lruQueue.push(page)
        steps.push({
          description: `物理块满，替换最久未使用的页面 ${replaced} 为 ${page}`,
          access: page,
          frames: [...frames],
          hit: false,
          replaced,
        })
      }
    }
  }

  return {
    type: 'page',
    algorithm: 'LRU 页面置换',
    referenceString,
    frameCount,
    steps,
  }
}
