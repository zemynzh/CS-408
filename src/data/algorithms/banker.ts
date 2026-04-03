import type { BankerVisual, BankerStep } from '@/types/exam'

export function buildBankerDemo(): BankerVisual {
  const processes = ['P0', 'P1', 'P2', 'P3', 'P4']
  const resources = ['A', 'B', 'C']
  
  // 随机生成一些数据或使用经典教科书示例
  const max = [
    [7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]
  ]
  const allocation = [
    [0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]
  ]
  const available = [3, 3, 2]
  
  const steps: BankerStep[] = []
  const need = max.map((row, i) => row.map((val, j) => val - allocation[i][j]))
  
  let work = [...available]
  let finish = new Array(processes.length).fill(false)
  let safeSequence: number[] = []

  steps.push({
    description: '初始状态：检查是否存在安全序列',
    allocation: allocation.map(r => [...r]),
    need: need.map(r => [...r]),
    available: [...work],
    safeSequence: [],
  })

  // 寻找安全序列过程
  let found = true
  while (found) {
    found = false
    for (let i = 0; i < processes.length; i++) {
      if (!finish[i]) {
        const canBeSatisfied = need[i].every((val, j) => val <= work[j])
        
        steps.push({
          description: `检查进程 ${processes[i]}: 需求 ${need[i]} ${canBeSatisfied ? '<=' : '>'} 当前可用 ${work}`,
          allocation: allocation.map(r => [...r]),
          need: need.map(r => [...r]),
          available: [...work],
          safeSequence: [...safeSequence],
          currentProcess: i,
          isPossible: canBeSatisfied,
        })

        if (canBeSatisfied) {
          work = work.map((val, j) => val + allocation[i][j])
          finish[i] = true
          safeSequence.push(i)
          found = true
          
          steps.push({
            description: `进程 ${processes[i]} 可满足需求，执行完成后释放资源。当前可用更新为: ${work}`,
            allocation: allocation.map(r => [...r]),
            need: need.map(r => [...r]),
            available: [...work],
            safeSequence: [...safeSequence],
            currentProcess: i,
          })
          break
        }
      }
    }
  }

  if (safeSequence.length === processes.length) {
    steps.push({
      description: `找到安全序列: ${safeSequence.map(i => processes[i]).join(' → ')}。系统处于安全状态。`,
      allocation: allocation.map(r => [...r]),
      need: need.map(r => [...r]),
      available: [...work],
      safeSequence: [...safeSequence],
    })
  } else {
    steps.push({
      description: '无法找到满足所有进程的安全序列，系统可能发生死锁！',
      allocation: allocation.map(r => [...r]),
      need: need.map(r => [...r]),
      available: [...work],
      safeSequence: [...safeSequence],
    })
  }

  return {
    type: 'banker',
    processes,
    resources,
    max,
    steps,
  }
}
