'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft, Crown, Target, GitBranch, Grid } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface Queen {
  row: number
  col: number
  isValid: boolean
}

interface BoardCell {
  row: number
  col: number
  hasQueen: boolean
  isAttacked: boolean
  isChecking: boolean
  isValid: boolean
}

interface BacktrackStep {
  row: number
  col: number
  action: 'place' | 'remove' | 'check' | 'backtrack'
  queens: Queen[]
  isValid: boolean
  step: number
}

export default function BacktrackingVisualization() {
  const [boardSize, setBoardSize] = useState(4)
  const [board, setBoard] = useState<BoardCell[][]>([])
  const [queens, setQueens] = useState<Queen[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(600)
  const [showInfo, setShowInfo] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [backtrackSteps, setBacktrackSteps] = useState<BacktrackStep[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [solutions, setSolutions] = useState<Queen[][]>([])
  const [currentSolution, setCurrentSolution] = useState(0)
  const [totalSolutions, setTotalSolutions] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const isPausedRef = useRef(false)
  const shouldStopRef = useRef(false)
  const isResettingRef = useRef(false)

  // 初始化棋盘
  const initializeBoard = useCallback(() => {
    const newBoard: BoardCell[][] = []
    for (let i = 0; i < boardSize; i++) {
      newBoard[i] = []
      for (let j = 0; j < boardSize; j++) {
        newBoard[i][j] = {
          row: i,
          col: j,
          hasQueen: false,
          isAttacked: false,
          isChecking: false,
          isValid: true
        }
      }
    }
    setBoard(newBoard)
    setQueens([])
    setCurrentStep(0)
    setAttempts(0)
    setBacktrackSteps([])
    setIsCompleted(false)
    setSolutions([])
    setCurrentSolution(0)
    setTotalSolutions(0)
    setIsRunning(false)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    isResettingRef.current = false
  }, [boardSize])

  // 初始化
  useEffect(() => {
    initializeBoard()
  }, [initializeBoard])

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

  // 检查位置是否安全
  const isSafe = (row: number, col: number, queens: Queen[]): boolean => {
    for (const queen of queens) {
      // 检查同一行
      if (queen.row === row) return false
      // 检查同一列
      if (queen.col === col) return false
      // 检查对角线
      if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return false
    }
    return true
  }

  // 更新棋盘状态
  const updateBoard = (queens: Queen[], checkingRow?: number, checkingCol?: number) => {
    const newBoard = board.map(row => 
      row.map(cell => ({
        ...cell,
        hasQueen: queens.some(q => q.row === cell.row && q.col === cell.col),
        isAttacked: false,
        isChecking: checkingRow === cell.row && checkingCol === cell.col,
        isValid: true
      }))
    )

    // 标记被攻击的位置
    for (const queen of queens) {
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          if (queen.row === i || queen.col === j || Math.abs(queen.row - i) === Math.abs(queen.col - j)) {
            if (!(queen.row === i && queen.col === j)) {
              newBoard[i][j].isAttacked = true
            }
          }
        }
      }
    }

    setBoard(newBoard)
  }

  // N皇后回溯算法
  const solveNQueens = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    setIsCompleted(false)
    
    const steps: BacktrackStep[] = []
    let stepCount = 0
    let attemptCount = 0
    const allSolutions: Queen[][] = []
    
    // 递归解决N皇后
    const solve = async (row: number, currentQueens: Queen[]): Promise<void> => {
      // 检查是否需要停止
      if (shouldStopRef.current) {
        throw new Error('stopped')
      }
      
      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      // 如果已经放置了所有皇后，找到一个解
      if (row === boardSize) {
        allSolutions.push([...currentQueens])
        setSolutions([...allSolutions])
        setTotalSolutions(allSolutions.length)
        
        const step: BacktrackStep = {
          row: -1,
          col: -1,
          action: 'check',
          queens: [...currentQueens],
          isValid: true,
          step: stepCount
        }
        steps.push(step)
        setBacktrackSteps([...steps])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
        return
      }
      
      // 尝试在当前行的每一列放置皇后
      for (let col = 0; col < boardSize; col++) {
        attemptCount++
        setAttempts(attemptCount)
        
        // 检查是否需要停止
        if (shouldStopRef.current) {
          throw new Error('stopped')
        }
        
        // 检查是否暂停
        while (isPausedRef.current && !shouldStopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        // 检查位置是否安全
        const safe = isSafe(row, col, currentQueens)
        
        // 添加检查步骤
        const checkStep: BacktrackStep = {
          row,
          col,
          action: 'check',
          queens: [...currentQueens],
          isValid: safe,
          step: stepCount
        }
        steps.push(checkStep)
        setBacktrackSteps([...steps])
        stepCount++
        setCurrentStep(stepCount)
        
        updateBoard(currentQueens, row, col)
        await wait()
        
        // 检查是否需要停止
        if (shouldStopRef.current) {
          throw new Error('stopped')
        }
        
        // 检查是否暂停
        while (isPausedRef.current && !shouldStopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        if (safe) {
          // 放置皇后
          const newQueen: Queen = { row, col, isValid: true }
          const newQueens = [...currentQueens, newQueen]
          
          const placeStep: BacktrackStep = {
            row,
            col,
            action: 'place',
            queens: [...newQueens],
            isValid: true,
            step: stepCount
          }
          steps.push(placeStep)
          setBacktrackSteps([...steps])
          stepCount++
          setCurrentStep(stepCount)
          
          setQueens([...newQueens])
          updateBoard(newQueens)
          await wait()
          
          // 检查是否需要停止
          if (shouldStopRef.current) {
            throw new Error('stopped')
          }
          
          // 检查是否暂停
          while (isPausedRef.current && !shouldStopRef.current) {
            await new Promise(resolve => setTimeout(resolve, 100))
          }
          
          // 递归到下一行
          await solve(row + 1, newQueens)
          
          // 检查是否需要停止
          if (shouldStopRef.current) {
            throw new Error('stopped')
          }
          
          // 检查是否暂停
          while (isPausedRef.current && !shouldStopRef.current) {
            await new Promise(resolve => setTimeout(resolve, 100))
          }
          
          // 回溯：移除皇后
          const removeStep: BacktrackStep = {
            row,
            col,
            action: 'remove',
            queens: [...currentQueens],
            isValid: false,
            step: stepCount
          }
          steps.push(removeStep)
          setBacktrackSteps([...steps])
          stepCount++
          setCurrentStep(stepCount)
          
          setQueens([...currentQueens])
          updateBoard(currentQueens)
          await wait()
        }
      }
      
      // 添加回溯步骤
      const backtrackStep: BacktrackStep = {
        row,
        col: -1,
        action: 'backtrack',
        queens: [...currentQueens],
        isValid: false,
        step: stepCount
      }
      steps.push(backtrackStep)
      setBacktrackSteps([...steps])
      stepCount++
      setCurrentStep(stepCount)
      
      await wait()
    }
    
    try {
      await solve(0, [])
      setIsCompleted(true)
      if (allSolutions.length > 0) {
        setQueens(allSolutions[0])
        updateBoard(allSolutions[0])
      }
    } catch (error: any) {
      if (error.message !== 'stopped') {
        console.error('算法错误:', error)
      }
    } finally {
      setIsRunning(false)
      setIsPaused(false)
    }
  }, [board, boardSize, isRunning, speed])

  // 显示特定解
  const showSolution = (solutionIndex: number) => {
    if (solutions[solutionIndex]) {
      setQueens(solutions[solutionIndex])
      updateBoard(solutions[solutionIndex])
      setCurrentSolution(solutionIndex)
    }
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
        initializeBoard()
      }
    }, 300)
  }

  // 获取单元格颜色
  const getCellColor = (cell: BoardCell) => {
    if (cell.hasQueen) {
      return 'bg-purple-500 dark:bg-purple-600'
    }
    if (cell.isChecking) {
      return 'bg-yellow-400 dark:bg-yellow-500'
    }
    if (cell.isAttacked) {
      return 'bg-red-300 dark:bg-red-400'
    }
    return (cell.row + cell.col) % 2 === 0 
      ? 'bg-gray-100 dark:bg-gray-700' 
      : 'bg-gray-200 dark:bg-gray-600'
  }

  // 获取单元格阴影
  const getCellShadow = (cell: BoardCell) => {
    if (cell.hasQueen) {
      return 'shadow-lg shadow-purple-500/50'
    }
    if (cell.isChecking) {
      return 'shadow-lg shadow-yellow-500/50'
    }
    return 'shadow-sm'
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
                  回溯算法 - N皇后问题
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解回溯算法
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
                <Grid className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                N皇后问题可视化
              </h2>
              
              {/* 游戏信息显示 */}
              <div className="mb-6">
                <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        棋盘大小: {boardSize}×{boardSize}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        已放置皇后: {queens.length}
                      </span>
                    </div>
                    {isCompleted && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-green-400 dark:bg-green-500"></div>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          找到 {totalSolutions} 个解
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 棋盘可视化 */}
              <div className="mb-8">
                <div className="relative bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                  <div className="flex justify-center">
                    <div 
                      className="grid gap-1"
                      style={{
                        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                        width: `${Math.min(400, 80 * boardSize)}px`,
                        height: `${Math.min(400, 80 * boardSize)}px`
                      }}
                    >
                      {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`relative flex items-center justify-center transition-all duration-300 ${getCellColor(cell)} ${getCellShadow(cell)}`}
                            style={{ width: '80px', height: '80px' }}
                          >
                            {cell.hasQueen && (
                              <Crown className="w-8 h-8 text-white dark:text-white" />
                            )}
                            {cell.isChecking && !cell.hasQueen && (
                              <div className="w-6 h-6 rounded-full bg-yellow-300 dark:bg-yellow-400 animate-pulse"></div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 回溯步骤可视化 */}
              <div className="mb-8">
                <div className="relative h-64 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30 overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <GitBranch className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    回溯过程
                  </h3>
                  {backtrackSteps.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <GitBranch className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          点击"开始求解"查看回溯过程
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-full overflow-y-auto">
                      {backtrackSteps.map((step, index) => (
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
                                {step.action === 'place' && `放置皇后到 (${step.row + 1}, ${step.col + 1})`}
                                {step.action === 'remove' && `移除皇后从 (${step.row + 1}, ${step.col + 1})`}
                                {step.action === 'check' && step.row >= 0 && `检查位置 (${step.row + 1}, ${step.col + 1})`}
                                {step.action === 'check' && step.row < 0 && '找到解！'}
                                {step.action === 'backtrack' && `回溯到第 ${step.row + 1} 行`}
                              </span>
                            </div>
                            <div className={`text-sm font-semibold ${
                              step.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {step.isValid ? '有效' : '无效'}
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
                  onClick={isRunning ? togglePause : solveNQueens}
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
                        <Crown className="w-5 h-5 mr-2" />
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
                      N皇后问题是回溯算法的经典应用，目标是在N×N的棋盘上放置N个皇后，
                      使得没有两个皇后能够互相攻击（同一行、同一列或同一对角线）。
                    </p>
                    <p className="leading-relaxed">
                      回溯算法通过尝试不同的选择，当发现当前选择无法达到目标时，
                      会撤销最后的选择并尝试其他可能性，直到找到所有解或确定无解。
                    </p>
                    <p>
                      <strong>规则：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>每行只能放置一个皇后</li>
                      <li>每列只能放置一个皇后</li>
                      <li>每个对角线只能放置一个皇后</li>
                      <li>时间复杂度：O(N!)</li>
                      <li>空间复杂度：O(N)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>回溯算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>从第一行开始，尝试在每一列放置皇后</li>
                      <li>检查放置位置是否安全（不与已有皇后冲突）</li>
                      <li>如果安全，放置皇后并递归到下一行</li>
                      <li>如果到达最后一行，找到一个解</li>
                      <li>如果不安全或需要回溯，移除皇后并尝试下一列</li>
                      <li>重复直到尝试完所有可能性</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>应用场景：</strong>回溯算法广泛应用于约束满足问题、
                        组合优化、游戏AI、调度问题等领域。
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
                    棋盘大小: {boardSize}×{boardSize}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="8"
                    value={boardSize}
                    onChange={(e) => setBoardSize(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    注意：大棋盘可能导致计算时间较长
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">尝试次数</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{attempts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">已放置皇后</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{queens.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">找到解数</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">{totalSolutions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">完成状态</span>
                  <span className={`text-sm font-semibold ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {isCompleted ? '已完成' : '进行中'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(N!)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">空间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(N)</span>
                </div>
              </div>
            </div>

            {/* 解选择器 */}
            {totalSolutions > 0 && (
              <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  解选择器
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">当前解</span>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {currentSolution + 1} / {totalSolutions}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => showSolution(Math.max(0, currentSolution - 1))}
                      disabled={currentSolution === 0}
                      className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      上一个
                    </button>
                    <button
                      onClick={() => showSolution(Math.min(totalSolutions - 1, currentSolution + 1))}
                      disabled={currentSolution === totalSolutions - 1}
                      className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      下一个
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                  <div className="w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-600 shadow-lg shadow-purple-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">皇后位置</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在检查</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-red-300 dark:bg-red-400 shadow-md shadow-red-500/30"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">被攻击区域</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 shadow-sm"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">安全区域</span>
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
