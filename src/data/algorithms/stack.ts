import type { StackVisual, StackStep } from '@/types/exam'
import { pickUniqueInts } from '@/utils/algo'

export function buildStackDemo(): StackVisual {
  const n = 6
  const inputSequence = pickUniqueInts(n, 1, 9)
  const steps: StackStep[] = []
  const stack: number[] = []
  const output: number[] = []
  let i = 0

  while (output.length < n) {
    const canPush = i < n
    const canPop = stack.length > 0
    const doPop = canPop && (!canPush || Math.random() < 0.45)

    if (doPop) {
      const el = stack.pop()!
      output.push(el)
      steps.push({
        description: `出栈 ${el}`,
        op: 'pop',
        element: el,
        stackState: [...stack],
        outputSoFar: [...output],
      })
    } else {
      const el = inputSequence[i++]
      stack.push(el)
      steps.push({
        description: `入栈 ${el}`,
        op: 'push',
        element: el,
        stackState: [...stack],
        outputSoFar: [...output],
      })
    }
  }

  return { type: 'stack', inputSequence, steps }
}
