import type { GanttVisual } from '@/types/exam'
import { randInt } from '@/utils/algo'

export function buildGanttDemo(): GanttVisual {
  const procs = ['P1', 'P2', 'P3', 'P4'].slice(0, randInt(3, 4))
  const segments: { process: string; start: number; end: number }[] = []
  let t = 0
  for (let i = 0; i < randInt(7, 10); i += 1) {
    const p = procs[randInt(0, procs.length - 1)]
    const len = randInt(1, 4) * 100
    segments.push({ process: p, start: t, end: t + len })
    t += len
  }
  return {
    type: 'gantt',
    segments,
    totalTime: t,
    description: '随机生成的时间片示例，用于观察调度结果的甘特图表现。',
  }
}
