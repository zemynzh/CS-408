import type { KMPVisual, KMPStep } from '@/types/exam'

export function buildKMPDemo(): KMPVisual {
  const text = 'ABABDABACDABABCABAB'
  const pattern = 'ABABCABAB'
  const steps: KMPStep[] = []
  
  // 计算 next 数组
  const getNext = (p: string) => {
    const next = new Array(p.length).fill(0)
    let k = 0
    for (let q = 1; q < p.length; q++) {
      while (k > 0 && p[k] !== p[q]) k = next[k - 1]
      if (p[k] === p[q]) k++
      next[q] = k
    }
    return next
  }

  const next = getNext(pattern)
  let q = 0 // pattern 匹配长度

  for (let i = 0; i < text.length; i++) {
    steps.push({
      description: `比较 Text[${i}](${text[i]}) 和 Pattern[${q}](${pattern[q]})`,
      i,
      j: q,
      matchCount: q,
      next: [...next],
    })

    while (q > 0 && pattern[q] !== text[i]) {
      const prevQ = q
      q = next[q - 1]
      steps.push({
        description: `不匹配，根据 next 数组将 Pattern[${prevQ}] 滑动至 Pattern[${q}]`,
        i,
        j: q,
        matchCount: q,
        next: [...next],
      })
    }

    if (pattern[q] === text[i]) {
      q++
    }

    if (q === pattern.length) {
      steps.push({
        description: `匹配成功！找到模式串，起始位置: ${i - pattern.length + 1}`,
        i,
        j: q - 1,
        matchCount: q,
        next: [...next],
      })
      q = next[q - 1] // 继续寻找下一个匹配
    }
  }

  return {
    type: 'kmp',
    text,
    pattern,
    steps,
  }
}
