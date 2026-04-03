import type { QueueVisual, QueueStep } from '@/types/exam'
import { pickUniqueInts } from '@/utils/algo'

export function buildQueueDemo(): QueueVisual {
  const n = 6
  const inputSequence = pickUniqueInts(n, 1, 99)
  const steps: QueueStep[] = []
  const queue: number[] = []
  const output: number[] = []
  let i = 0

  while (output.length < n) {
    const canEnqueue = i < n
    const canDequeue = queue.length > 0
    const doDequeue = canDequeue && (!canEnqueue || Math.random() < 0.45)

    if (doDequeue) {
      const el = queue.shift()!
      output.push(el)
      steps.push({
        description: `出队 ${el}`,
        op: 'dequeue',
        element: el,
        queueState: [...queue],
        outputSoFar: [...output],
      })
    } else {
      const el = inputSequence[i++]
      queue.push(el)
      steps.push({
        description: `入队 ${el}`,
        op: 'enqueue',
        element: el,
        queueState: [...queue],
        outputSoFar: [...output],
      })
    }
  }

  return { type: 'queue', inputSequence, steps }
}
