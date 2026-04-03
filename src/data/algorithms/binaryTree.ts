import type { BinaryTreeVisual, BinaryTreeNode, TraversalStep } from '@/types/exam'
import { pickUniqueInts } from '@/utils/algo'

export function buildBinaryTreeTraversalDemo(): BinaryTreeVisual {
  const vals = pickUniqueInts(9, 1, 99).map((n) => String(n))
  const nodes: BinaryTreeNode[] = vals.map((v, idx) => {
    const id = `n${idx + 1}`
    const left = idx * 2 + 1 < vals.length ? `n${idx * 2 + 2}` : undefined
    const right = idx * 2 + 2 < vals.length ? `n${idx * 2 + 3}` : undefined
    return { id, val: v, left, right }
  })

  const map = new Map(nodes.map((n) => [n.id, n]))
  const visited: string[] = []
  const steps: TraversalStep[] = []

  function preorder(id: string) {
    const node = map.get(id)
    if (!node) return
    steps.push({ description: `访问节点 ${node.val}`, highlightIds: [id], visitedIds: [...visited] })
    visited.push(id)
    steps.push({ description: `确认访问 ${node.val}`, highlightIds: [id], visitedIds: [...visited] })
    if (node.left) preorder(node.left)
    if (node.right) preorder(node.right)
  }

  preorder('n1')
  steps.push({ description: '遍历结束', highlightIds: [], visitedIds: [...visited] })

  return { type: 'binaryTree', nodes, rootId: 'n1', steps }
}
