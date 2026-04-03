import type { BSTSearchVisual, BSTSearchNode, BSTSearchStep } from '@/types/exam'
import { randInt, pickUniqueInts } from '@/utils/algo'

function insertBST(rootId: string, nodes: Map<string, BSTSearchNode>, val: number) {
  let currentId = rootId
  while (true) {
    const cur = nodes.get(currentId)
    if (!cur) return
    if (val < cur.val) {
      if (!cur.left) {
        const id = `n${nodes.size + 1}`
        cur.left = id
        nodes.set(id, { id, val })
        return
      }
      currentId = cur.left
    } else {
      if (!cur.right) {
        const id = `n${nodes.size + 1}`
        cur.right = id
        nodes.set(id, { id, val })
        return
      }
      currentId = cur.right
    }
  }
}

export function buildBSTNearestDemo(): BSTSearchVisual {
  const values = pickUniqueInts(9, 10, 99)
  const rootId = 'n1'
  const nodes = new Map<string, BSTSearchNode>()
  nodes.set(rootId, { id: rootId, val: values[0] })
  for (const v of values.slice(1)) insertBST(rootId, nodes, v)

  const target = randInt(1, 110)
  const visitedIds: string[] = []
  const steps: BSTSearchStep[] = []

  let candidateId = rootId
  let currentId: string | undefined = rootId
  while (currentId) {
    const cur = nodes.get(currentId)
    if (!cur) break

    const cand = nodes.get(candidateId)!
    const better = Math.abs(target - cur.val) < Math.abs(target - cand.val)
    if (better) candidateId = currentId
    const next = target < cur.val ? cur.left : cur.right

    steps.push({
      description: `访问 ${cur.val}，当前最优 ${nodes.get(candidateId)!.val}，下一步 ${next ? (target < cur.val ? '左' : '右') : '停止'}`,
      currentId,
      candidateId,
      visitedIds: [...visitedIds],
    })
    visitedIds.push(currentId)
    currentId = next
  }

  steps.push({
    description: `结束：K=${target} 的最近邻为 ${nodes.get(candidateId)!.val}`,
    currentId: candidateId,
    candidateId,
    visitedIds: [...visitedIds],
  })

  return { type: 'bstSearch', nodes: [...nodes.values()], rootId, target, steps }
}
