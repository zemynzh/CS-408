'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft, Move, Target, GitBranch, Layers } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface Disk {
  id: number
  size: number
  tower: number
  position: number
  isMoving: boolean
  targetTower?: number
  targetPosition?: number
}

interface Move {
  from: number
  to: number
  disk: number
  step: number
}

interface Tower {
  id: number
  disks: number[]
  x: number
  y: number
}

export default function TowerOfHanoiVisualization() {
  const [disks, setDisks] = useState<Disk[]>([])
  const [towers, setTowers] = useState<Tower[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(800)
  const [diskCount, setDiskCount] = useState(4)
  const [moveCount, setMoveCount] = useState(0)
  const [totalMoves, setTotalMoves] = useState(0)
  const [showInfo, setShowInfo] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [moves, setMoves] = useState<Move[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const isPausedRef = useRef(false)
  const shouldStopRef = useRef(false)
  const isResettingRef = useRef(false)

  // 初始化汉诺塔
  const initializeTowers = useCallback(() => {
    const newDisks: Disk[] = []
    const newTowers: Tower[] = [
      { id: 0, disks: [], x: 150, y: 300 },
      { id: 1, disks: [], x: 300, y: 300 },
      { id: 2, disks: [], x: 450, y: 300 }
    ]
    
    // 创建圆盘
    for (let i = 0; i < diskCount; i++) {
      const disk: Disk = {
        id: i,
        size: diskCount - i,
        tower: 0,
        position: i,
        isMoving: false
      }
      newDisks.push(disk)
      newTowers[0].disks.push(i)
    }
    
    setDisks(newDisks)
    setTowers(newTowers)
    setCurrentStep(0)
    setMoveCount(0)
    setTotalMoves(Math.pow(2, diskCount) - 1)
    setMoves([])
    setIsCompleted(false)
    setIsRunning(false)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    isResettingRef.current = false
  }, [diskCount])

  // 初始化
  useEffect(() => {
    initializeTowers()
  }, [initializeTowers])

  // 等待函数
  const wait = async () => {
    await new Promise(resolve => setTimeout(resolve, speed))
    
    // 检查是否需要停止
    if (shouldStopRef.current) {
      throw new Error('stopped')
    }
    
    // 检查是否暂停
    while (isPausedRef.current && !shouldStopRef.current) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  // 汉诺塔算法
  const solveHanoi = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    setIsCompleted(false)
    
    const movesList: Move[] = []
    let stepCount = 0
    
    // 递归解决汉诺塔
    const hanoi = async (n: number, from: number, to: number, aux: number): Promise<void> => {
      // 检查是否需要停止
      if (shouldStopRef.current) {
        throw new Error('stopped')
      }
      
      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      if (n === 1) {
        // 移动一个圆盘
        const move: Move = {
          from,
          to,
          disk: towers[from].disks[towers[from].disks.length - 1],
          step: stepCount
        }
        movesList.push(move)
        setMoves([...movesList])
        
        // 执行移动
        await executeMove(move)
        stepCount++
        setCurrentStep(stepCount)
        
        return
      }
      
      // 递归移动n-1个圆盘到辅助塔
      await hanoi(n - 1, from, aux, to)
      
      // 移动最大的圆盘到目标塔
      const move: Move = {
        from,
        to,
        disk: towers[from].disks[towers[from].disks.length - 1],
        step: stepCount
      }
      movesList.push(move)
      setMoves([...movesList])
      
      await executeMove(move)
      stepCount++
      setCurrentStep(stepCount)
      
      // 递归移动n-1个圆盘从辅助塔到目标塔
      await hanoi(n - 1, aux, to, from)
    }
    
    try {
      await hanoi(diskCount, 0, 2, 1)
      setIsCompleted(true)
    } catch (error: any) {
      if (error.message !== 'stopped') {
        console.error('算法错误:', error)
      }
    } finally {
      setIsRunning(false)
      setIsPaused(false)
    }
  }, [disks, towers, isRunning, speed, diskCount])

  // 执行移动
  const executeMove = async (move: Move) => {
    const disksCopy = [...disks]
    const towersCopy = [...towers]
    
    // 找到要移动的圆盘
    const disk = disksCopy.find(d => d.id === move.disk)
    if (!disk) return
    
    // 标记圆盘正在移动
    disk.isMoving = true
    disk.targetTower = move.to
    disk.targetPosition = towersCopy[move.to].disks.length
    setDisks([...disksCopy])
    
    await wait()
    
    // 检查是否需要停止
    if (shouldStopRef.current) {
      throw new Error('stopped')
    }
    
    // 检查是否暂停
    while (isPausedRef.current && !shouldStopRef.current) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // 从源塔移除圆盘
    const fromTower = towersCopy[move.from]
    const diskIndex = fromTower.disks.indexOf(move.disk)
    if (diskIndex > -1) {
      fromTower.disks.splice(diskIndex, 1)
    }
    
    // 添加到目标塔
    const toTower = towersCopy[move.to]
    toTower.disks.push(move.disk)
    
    // 更新圆盘状态
    disk.tower = move.to
    disk.position = toTower.disks.length - 1
    disk.isMoving = false
    disk.targetTower = undefined
    disk.targetPosition = undefined
    
    setTowers([...towersCopy])
    setDisks([...disksCopy])
    setMoveCount(prev => prev + 1)
    
    await wait()
  }

  // 暂停/恢复算法
  const togglePause = () => {
    if (isRunning) {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      isPausedRef.current = newPausedState
    }
  }

  // 重置算法
  const resetAlgorithm = () => {
    // 标记正在重置
    isResettingRef.current = true
    
    // 设置停止标志
    setShouldStop(true)
    shouldStopRef.current = true
    
    // 延迟重置，确保算法完全停止
    setTimeout(() => {
      if (isResettingRef.current) {
        initializeTowers()
      }
    }, 300)
  }

  // 获取圆盘颜色
  const getDiskColor = (size: number) => {
    const colors = [
      'bg-red-400 dark:bg-red-500',
      'bg-orange-400 dark:bg-orange-500',
      'bg-yellow-400 dark:bg-yellow-500',
      'bg-green-400 dark:bg-green-500',
      'bg-blue-400 dark:bg-blue-500',
      'bg-purple-400 dark:bg-purple-500',
      'bg-pink-400 dark:bg-pink-500',
      'bg-indigo-400 dark:bg-indigo-500'
    ]
    return colors[(size - 1) % colors.length]
  }

  // 获取圆盘阴影
  const getDiskShadow = (isMoving: boolean) => {
    return isMoving 
      ? 'shadow-2xl shadow-black/30 animate-pulse' 
      : 'shadow-lg shadow-black/20'
  }

  // 获取塔颜色
  const getTowerColor = (towerId: number) => {
    const colors = [
      'bg-blue-600 dark:bg-blue-500',
      'bg-green-600 dark:bg-green-500',
      'bg-purple-600 dark:bg-purple-500'
    ]
    return colors[towerId % colors.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 导航栏 */}
      <div className="sticky top-0 z-40 glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/algorithm"
                className="glass-liquid p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  汉诺塔
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解递归汉诺塔算法
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="glass-liquid p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
              >
                <Info className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主可视化区域 */}
          <div className="lg:col-span-2">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Layers className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                汉诺塔可视化
              </h2>
              
              {/* 游戏信息显示 */}
              <div className="mb-6">
                <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        圆盘数量: {diskCount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Move className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        移动次数: {moveCount} / {totalMoves}
                      </span>
                    </div>
                    {isCompleted && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-green-400 dark:bg-green-500"></div>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          完成！
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 汉诺塔可视化 */}
              <div className="mb-8">
                <div className="relative h-96 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                  <svg className="w-full h-full absolute inset-0">
                    {/* 绘制塔座 */}
                    {towers.map((tower) => (
                      <g key={tower.id}>
                        {/* 塔柱 */}
                        <rect
                          x={tower.x - 8}
                          y={tower.y - 200}
                          width="16"
                          height="200"
                          className={`${getTowerColor(tower.id)} transition-all duration-300`}
                          rx="2"
                        />
                        {/* 塔基 */}
                        <rect
                          x={tower.x - 40}
                          y={tower.y}
                          width="80"
                          height="20"
                          className={`${getTowerColor(tower.id)} transition-all duration-300`}
                          rx="4"
                        />
                        {/* 塔标签 */}
                        <text
                          x={tower.x}
                          y={tower.y + 45}
                          textAnchor="middle"
                          className="text-sm font-bold text-gray-700 dark:text-gray-300 pointer-events-none"
                        >
                          塔 {tower.id + 1}
                        </text>
                      </g>
                    ))}
                    
                    {/* 绘制圆盘 */}
                    {disks.map((disk) => {
                      const tower = towers[disk.tower]
                      if (!tower) return null
                      
                      const diskIndex = tower.disks.indexOf(disk.id)
                      const y = tower.y - 20 - (diskIndex * 25)
                      const width = disk.size * 20 + 40
                      
                      return (
                        <g key={disk.id}>
                          <rect
                            x={tower.x - width / 2}
                            y={y}
                            width={width}
                            height="20"
                            className={`${getDiskColor(disk.size)} ${getDiskShadow(disk.isMoving)} transition-all duration-500`}
                            rx="10"
                          />
                          <text
                            x={tower.x}
                            y={y + 13}
                            textAnchor="middle"
                            className="text-xs font-bold text-white dark:text-white pointer-events-none"
                          >
                            {disk.size}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* 移动历史 */}
              <div className="mb-8">
                <div className="relative h-64 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30 overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Move className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    移动历史
                  </h3>
                  {moves.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Move className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          点击"开始求解"查看移动过程
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-full overflow-y-auto">
                      {moves.map((move, index) => (
                        <div
                          key={index}
                          className={`glass-liquid p-3 rounded-xl border transition-all duration-300 ${
                            index === currentStep - 1 
                              ? 'bg-yellow-400/20 dark:bg-yellow-500/20 border-yellow-400/30 dark:border-yellow-500/30' 
                              : 'bg-white/20 dark:bg-gray-800/20 border-gray-200/30 dark:border-gray-600/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-blue-400 dark:bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                {index + 1}
                              </div>
                              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                移动圆盘 {move.disk + 1} (大小: {diskCount - move.disk})
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              从塔 {move.from + 1} → 塔 {move.to + 1}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={isRunning ? togglePause : solveHanoi}
                  disabled={isCompleted}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 disabled:hover:scale-100 disabled:hover:shadow-none relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isRunning ? (
                      isPaused ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          继续
                        </>
                      ) : (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          暂停
                        </>
                      )
                    ) : (
                      <>
                        <Move className="w-5 h-5 mr-2" />
                        开始求解
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button
                  onClick={resetAlgorithm}
                  className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    重置
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>

            {/* 算法说明 */}
            {showInfo && (
              <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30 mt-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                  算法说明
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p className="leading-relaxed">
                      汉诺塔是一个经典的递归问题，目标是将所有圆盘从起始塔移动到目标塔，
                      每次只能移动一个圆盘，且大圆盘不能放在小圆盘上面。
                    </p>
                    <p className="leading-relaxed">
                      递归解决方案将问题分解为更小的子问题：移动n-1个圆盘到辅助塔，
                      移动最大的圆盘到目标塔，然后移动n-1个圆盘到目标塔。
                    </p>
                    <p>
                      <strong>规则：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>每次只能移动一个圆盘</li>
                      <li>大圆盘不能放在小圆盘上面</li>
                      <li>可以使用所有三个塔</li>
                      <li>最少移动次数：2^n - 1</li>
                      <li>时间复杂度：O(2^n)</li>
                      <li>空间复杂度：O(n)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>递归算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>如果只有一个圆盘，直接移动到目标塔</li>
                      <li>否则，递归移动n-1个圆盘到辅助塔</li>
                      <li>移动最大的圆盘到目标塔</li>
                      <li>递归移动n-1个圆盘从辅助塔到目标塔</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>应用场景：</strong>汉诺塔问题在递归算法教学、算法复杂度分析、
                        计算机科学教育等领域有重要应用。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 控制面板 */}
          <div className="space-y-6">
            {/* 参数设置 */}
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                参数设置
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    圆盘数量: {diskCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="7"
                    value={diskCount}
                    onChange={(e) => setDiskCount(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    最少移动次数: {Math.pow(2, diskCount) - 1}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    动画速度: {speed}ms
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    step="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* 统计信息 */}
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                统计信息
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">当前步骤</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{currentStep}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">已移动次数</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{moveCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">总移动次数</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{totalMoves}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">完成状态</span>
                  <span className={`text-sm font-semibold ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {isCompleted ? '已完成' : '进行中'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(2^n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">空间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(n)</span>
                </div>
              </div>
            </div>

            {/* 颜色说明 */}
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <div className="w-5 h-5 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                颜色说明
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-red-400 dark:bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">最大圆盘</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-400 dark:bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">中等圆盘</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-400 dark:bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">小圆盘</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在移动</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  )
}
