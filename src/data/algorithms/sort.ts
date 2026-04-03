import type { SortVisual, SortStep } from '@/types/exam'
import { pickUniqueInts } from '@/utils/algo'

export function buildSortDemo(): SortVisual {
  const initialArray = pickUniqueInts(8, 10, 99)
  const steps: SortStep[] = []
  
  // 复制一份用于排序
  const arr = [...initialArray]
  const n = arr.length

  steps.push({
    description: '开始冒泡排序',
    array: [...arr],
    sortedIndices: [],
  })

  // 简单实现冒泡排序以演示
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        description: `比较 ${arr[j]} 和 ${arr[j + 1]}`,
        array: [...arr],
        comparing: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
      })

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({
          description: `交换 ${arr[j + 1]} 和 ${arr[j]}`,
          array: [...arr],
          swapping: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
        })
      }
    }
    steps.push({
      description: `第 ${i + 1} 趟结束，${arr[n - 1 - i]} 已就位`,
      array: [...arr],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
    })
  }

  steps.push({
    description: '排序完成',
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
  })

  return {
    type: 'sort',
    algorithm: '冒泡排序',
    initialArray,
    steps,
  }
}
