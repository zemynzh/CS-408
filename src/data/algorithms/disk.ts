import type { DiskVisual, DiskStep } from '@/types/exam'
import { randInt, pickUniqueInts } from '@/utils/algo'

export function buildDiskSchedulingDemo(): DiskVisual {
  const initialPos = 100
  const requests = pickUniqueInts(8, 10, 199)
  const steps: DiskStep[] = []
  
  let currentPos = initialPos
  let remaining = [...requests]
  let totalDistance = 0

  steps.push({
    description: `磁头初始位置: ${initialPos}`,
    currentPos,
    moveDistance: 0,
    visitedIndex: -1,
  })

  // SSTF (Shortest Seek Time First) 简单演示
  while (remaining.length > 0) {
    // 寻找距离当前位置最近的请求
    let minIdx = 0
    let minDistance = Math.abs(currentPos - remaining[0])
    
    for (let i = 1; i < remaining.length; i++) {
      const dist = Math.abs(currentPos - remaining[i])
      if (dist < minDistance) {
        minDistance = dist
        minIdx = i
      }
    }

    const next = remaining[minIdx]
    const distance = Math.abs(currentPos - next)
    totalDistance += distance
    
    steps.push({
      description: `访问磁道 ${next}，移动距离: ${distance}`,
      currentPos: next,
      moveDistance: distance,
      visitedIndex: requests.indexOf(next),
    })

    currentPos = next
    remaining.splice(minIdx, 1)
  }

  return {
    type: 'disk',
    algorithm: 'SSTF 磁盘调度',
    initialPos,
    requests,
    steps,
    totalDistance,
  }
}
