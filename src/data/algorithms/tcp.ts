import type { TCPVisual, TCPPacket } from '@/types/exam'
import { randInt } from '@/utils/algo'

export function buildTCPDemo(): TCPVisual {
  const base = randInt(1000, 5000)
  const totalTime = 1400
  const packets: TCPPacket[] = [
    { from: 'client', label: 'SYN', seq: base, ack: '-', time: 0, arrival: 120 },
    { from: 'server', label: 'SYN+ACK', seq: base + 800, ack: base + 1, time: 180, arrival: 320 },
    { from: 'client', label: 'ACK', seq: base + 1, ack: base + 801, time: 360, arrival: 460 },
    { from: 'client', label: '[data]', seq: base + 1, ack: base + 801, payload: '发送 400B 数据', time: 520, arrival: 690 },
    { from: 'server', label: 'ACK', seq: base + 801, ack: base + 401, time: 720, arrival: 820 },
    { from: 'client', label: '[data]', seq: base + 401, ack: base + 801, payload: '发送 300B 数据', time: 880, arrival: 1030 },
    { from: 'server', label: 'ACK', seq: base + 801, ack: base + 701, time: 1080, arrival: 1180 },
  ]
  return {
    type: 'tcp',
    packets,
    totalTime,
    description: '简化的 TCP 建连与数据确认过程，用于直观理解 seq/ack 与往返时延。',
  }
}
