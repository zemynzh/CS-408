export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pickUniqueInts(count: number, min: number, max: number) {
  const set = new Set<number>()
  while (set.size < count) set.add(randInt(min, max))
  return [...set]
}
