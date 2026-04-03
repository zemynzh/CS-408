import type { HeapVisual, HeapStep } from '@/types/exam'
import { pickUniqueInts } from '@/utils/algo'

export function buildHeapDemo(): HeapVisual {
  const initialArray = pickUniqueInts(7, 10, 99)
  const steps: HeapStep[] = []
  
  const heap: number[] = []
  
  // 逐个插入构建大顶堆
  for (const val of initialArray) {
    heap.push(val)
    let cur = heap.length - 1
    
    steps.push({
      description: `将 ${val} 插入堆尾`,
      heap: [...heap],
      highlightIndices: [cur],
    })

    // 向上调整 (Sift Up)
    while (cur > 0) {
      const parent = Math.floor((cur - 1) / 2)
      steps.push({
        description: `比较节点 ${heap[cur]} 与父节点 ${heap[parent]}`,
        heap: [...heap],
        highlightIndices: [cur, parent],
      })

      if (heap[cur] > heap[parent]) {
        [heap[cur], heap[parent]] = [heap[parent], heap[cur]]
        steps.push({
          description: `交换节点 ${heap[parent]} 与父节点 ${heap[cur]}`,
          heap: [...heap],
          highlightIndices: [cur, parent],
        })
        cur = parent
      } else {
        break
      }
    }
  }

  return {
    type: 'heap',
    initialArray,
    steps,
  }
}
