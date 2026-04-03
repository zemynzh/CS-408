import type { GraphVisual, GraphStep } from '@/types/exam'

export function buildGraphTraversalDemo(): GraphVisual {
  const nodes = [
    { id: 'A', label: 'A', x: 150, y: 50 },
    { id: 'B', label: 'B', x: 50, y: 120 },
    { id: 'C', label: 'C', x: 250, y: 120 },
    { id: 'D', label: 'D', x: 50, y: 220 },
    { id: 'E', label: 'E', x: 150, y: 220 },
    { id: 'F', label: 'F', x: 250, y: 220 },
  ]
  
  const edges = [
    { from: 'A', to: 'B' }, { from: 'A', to: 'C' },
    { from: 'B', to: 'D' }, { from: 'B', to: 'E' },
    { from: 'C', to: 'E' }, { from: 'C', to: 'F' },
    { from: 'D', to: 'E' }, { from: 'E', to: 'F' },
  ]

  const steps: GraphStep[] = []
  const visitedIds: string[] = []
  const queue: string[] = ['A']
  
  // BFS 演示
  steps.push({
    description: '开始从节点 A 进行广度优先遍历 (BFS)',
    visitedIds: [],
    queueIds: ['A'],
  })

  while (queue.length > 0) {
    const currentId = queue.shift()!
    if (visitedIds.includes(currentId)) continue

    steps.push({
      description: `访问节点 ${currentId}，检查其邻居`,
      visitedIds: [...visitedIds],
      queueIds: [...queue],
      currentId,
    })

    visitedIds.push(currentId)
    
    // 寻找邻居
    const neighbors = edges
      .filter(e => e.from === currentId || e.to === currentId)
      .map(e => e.from === currentId ? e.to : e.from)
      .filter(id => !visitedIds.includes(id) && !queue.includes(id))

    for (const neighbor of neighbors) {
      queue.push(neighbor)
    }

    steps.push({
      description: `节点 ${currentId} 访问完成，新入队邻居: ${neighbors.join(', ') || '无'}`,
      visitedIds: [...visitedIds],
      queueIds: [...queue],
      currentId,
    })
  }

  steps.push({
    description: '遍历结束',
    visitedIds: [...visitedIds],
    queueIds: [],
  })

  return {
    type: 'graph',
    algorithm: '广度优先遍历 (BFS)',
    nodes,
    edges,
    steps,
  }
}
