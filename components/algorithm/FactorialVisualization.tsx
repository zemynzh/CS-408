'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft, Calculator, Zap, Target, GitBranch } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface RecursionStep {
  n: number
  result: number
  status: 'pending' | 'calculating' | 'completed' | 'returning'
  depth: number
  callStack: number[]
}

export default function FactorialVisualization() {
  const [inputNumber, setInputNumber] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(800)
  const [recursionSteps, setRecursionSteps] = useState<RecursionStep[]>([])
  const [showInfo, setShowInfo] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [finalResult, setFinalResult] = useState<number | null>(null)
  const [maxDepth, setMaxDepth] = useState(0)
  const [totalCalls, setTotalCalls] = useState(0)
  const isPausedRef = useRef(false)
  const shouldStopRef = useRef(false)
  const isResettingRef = useRef(false)

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

  // 阶乘计算算法
  const calculateFactorial = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    setFinalResult(null)
    setMaxDepth(0)
    setTotalCalls(0)
    
    const steps: RecursionStep[] = []
    let stepCount = 0
    let callCount = 0
    let maxRecursionDepth = 0
    
    // 递归函数
    const factorial = async (n: number, depth: number = 0, callStack: number[] = []): Promise<number> => {
      // 检查是否需要停止
      if (shouldStopRef.current) {
        throw new Error('stopped')
      }
      
      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      callCount++
      setTotalCalls(callCount)
      
      if (depth > maxRecursionDepth) {
        maxRecursionDepth = depth
        setMaxDepth(maxRecursionDepth)
      }
      
      const currentCallStack = [...callStack, n]
      
      // 添加计算步骤
      const step: RecursionStep = {
        n,
        result: 0,
        status: 'calculating',
        depth,
        callStack: currentCallStack
      }
      
      steps.push(step)
      setRecursionSteps([...steps])
      stepCount++
      setCurrentStep(stepCount)
      
      await wait()
      
      // 检查是否需要停止
      if (shouldStopRef.current) {
        throw new Error('stopped')
      }
      
      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      let result: number
      
      if (n === 0 || n === 1) {
        // 基本情况
        result = 1
        step.status = 'completed'
        step.result = result
        setRecursionSteps([...steps])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
        
        // 检查是否需要停止
        if (shouldStopRef.current) {
          throw new Error('stopped')
        }
        
        // 检查是否暂停
        while (isPausedRef.current && !shouldStopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        // 返回步骤
        step.status = 'returning'
        setRecursionSteps([...steps])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
        
        return result
      } else {
        // 递归情况
        const recursiveResult = await factorial(n - 1, depth + 1, currentCallStack)
        result = n * recursiveResult
        
        step.status = 'completed'
        step.result = result
        setRecursionSteps([...steps])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
        
        // 检查是否需要停止
        if (shouldStopRef.current) {
          throw new Error('stopped')
        }
        
        // 检查是否暂停
        while (isPausedRef.current && !shouldStopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        // 返回步骤
        step.status = 'returning'
        setRecursionSteps([...steps])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
        
        return result
      }
    }
    
    try {
      const result = await factorial(inputNumber)
      setFinalResult(result)
    } catch (error: any) {
      if (error.message !== 'stopped') {
        console.error('计算错误:', error)
      }
    } finally {
      setIsRunning(false)
      setIsPaused(false)
    }
  }, [inputNumber, isRunning, speed])

  // 暂停/恢复计算
  const togglePause = () => {
    if (isRunning) {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      isPausedRef.current = newPausedState
    }
  }

  // 重置计算
  const resetCalculation = () => {
    // 标记正在重置
    isResettingRef.current = true
    
    // 设置停止标志
    setShouldStop(true)
    shouldStopRef.current = true
    
    // 延迟重置，确保算法完全停止
    setTimeout(() => {
      if (isResettingRef.current) {
        setRecursionSteps([])
        setCurrentStep(0)
        setFinalResult(null)
        setMaxDepth(0)
        setTotalCalls(0)
        setIsRunning(false)
        setIsPaused(false)
        setShouldStop(false)
        shouldStopRef.current = false
        isPausedRef.current = false
        isResettingRef.current = false
      }
    }, 300)
  }

  // 获取步骤颜色
  const getStepColor = (status: string) => {
    switch (status) {
      case 'calculating':
        return 'bg-yellow-400 dark:bg-yellow-500'
      case 'completed':
        return 'bg-blue-400 dark:bg-blue-500'
      case 'returning':
        return 'bg-green-400 dark:bg-green-500'
      default:
        return 'bg-gray-400 dark:bg-gray-500'
    }
  }

  // 获取步骤阴影
  const getStepShadow = (status: string) => {
    switch (status) {
      case 'calculating':
        return 'shadow-lg shadow-yellow-500/50'
      case 'completed':
        return 'shadow-lg shadow-blue-500/50'
      case 'returning':
        return 'shadow-lg shadow-green-500/50'
      default:
        return 'shadow-md shadow-gray-500/30'
    }
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
                  阶乘计算
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解递归阶乘算法
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
                <Calculator className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                递归过程可视化
              </h2>
              
              {/* 计算信息显示 */}
              <div className="mb-6">
                <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        计算: {inputNumber}!
                      </span>
                    </div>
                    {finalResult !== null && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-green-400 dark:bg-green-500"></div>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          结果: {finalResult.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 递归调用栈可视化 */}
              <div className="mb-8">
                <div className="relative h-96 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30 overflow-hidden">
                  {recursionSteps.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          点击"开始计算"查看递归过程
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-full overflow-y-auto">
                      {recursionSteps.map((step, index) => (
                        <div
                          key={index}
                          className={`glass-liquid p-4 rounded-2xl border transition-all duration-300 ${getStepColor(step.status)} ${getStepShadow(step.status)}`}
                          style={{
                            marginLeft: `${step.depth * 20}px`,
                            borderColor: step.status === 'calculating' ? 'rgba(251, 191, 36, 0.3)' :
                                         step.status === 'completed' ? 'rgba(59, 130, 246, 0.3)' :
                                         step.status === 'returning' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(156, 163, 175, 0.3)'
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-gray-800/20 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
                                {step.n}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {step.status === 'calculating' ? '计算中...' :
                                   step.status === 'completed' ? '计算完成' :
                                   step.status === 'returning' ? '返回结果' : '等待中'}
                                </div>
                                <div className="text-xs text-gray-700 dark:text-white/80">
                                  深度: {step.depth} | 调用栈: {step.callStack.join(' → ')}
                                </div>
                              </div>
                            </div>
                            {step.status === 'completed' || step.status === 'returning' ? (
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {step.result.toLocaleString()}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-700 dark:text-white/80">
                                {step.n === 0 || step.n === 1 ? '= 1' : `= ${step.n} × (${step.n - 1}!)`}
                              </div>
                            )}
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
                  onClick={isRunning ? togglePause : calculateFactorial}
                  disabled={finalResult !== null}
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
                        <Calculator className="w-5 h-5 mr-2" />
                        开始计算
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button
                  onClick={resetCalculation}
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
                      阶乘是数学中的一个重要概念，表示一个正整数的所有正整数因子的乘积。
                      例如：5! = 5 × 4 × 3 × 2 × 1 = 120
                    </p>
                    <p className="leading-relaxed">
                      递归是解决阶乘计算的一种优雅方法，它将问题分解为更小的子问题，
                      直到达到基本情况（0! = 1 或 1! = 1）。
                    </p>
                    <p>
                      <strong>递归定义：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>n! = n × (n-1)! （递归情况）</li>
                      <li>0! = 1 （基本情况）</li>
                      <li>1! = 1 （基本情况）</li>
                      <li>时间复杂度：O(n)</li>
                      <li>空间复杂度：O(n)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>检查输入是否为0或1（基本情况）</li>
                      <li>如果是基本情况，返回1</li>
                      <li>否则，递归调用factorial(n-1)</li>
                      <li>将当前数字与递归结果相乘</li>
                      <li>返回最终结果</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>应用场景：</strong>阶乘计算在组合数学、概率论、排列组合、
                        算法复杂度分析等领域有广泛应用。
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
                    输入数字: {inputNumber}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    注意：大数字可能导致计算时间较长
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">递归深度</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{maxDepth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">函数调用次数</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{totalCalls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">计算结果</span>
                  <span className={`text-sm font-semibold ${finalResult !== null ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {finalResult !== null ? finalResult.toLocaleString() : '未计算'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(n)</span>
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
                  <div className="w-4 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在计算</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-400 dark:bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">计算完成</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-400 dark:bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">返回结果</span>
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