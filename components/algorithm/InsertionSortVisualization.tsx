'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface ArrayElement {
  value: number
  status: 'normal' | 'comparing' | 'inserting' | 'sorted'
}

export default function InsertionSortVisualization() {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [arraySize, setArraySize] = useState(10)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [showInfo, setShowInfo] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(false)
  const shouldStopRef = useRef(false)
  const isResettingRef = useRef(false)

  // 生成随机数组
  const generateArray = useCallback(() => {
    const newArray: ArrayElement[] = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 1,
        status: 'normal'
      })
    }
    setArray(newArray)
    setCurrentStep(0)
    setComparisons(0)
    setSwaps(0)
    setIsRunning(false)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    isResettingRef.current = false
  }, [arraySize])

  // 初始化数组
  useEffect(() => {
    generateArray()
  }, [generateArray])

  // 插入排序算法
  const insertionSort = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    const arr = [...array]
    let compCount = 0
    let swapCount = 0
    let stepCount = 0

    // 标记第一个元素为已排序
    arr[0].status = 'sorted'
    setArray([...arr])
    stepCount++
    setCurrentStep(stepCount)
    
    await new Promise(resolve => setTimeout(resolve, speed))

    for (let i = 1; i < arr.length; i++) {
      // 检查是否需要停止
      if (shouldStopRef.current) {
        setIsRunning(false)
        setIsPaused(false)
        return
      }
      
      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      const currentElement = arr[i]
      currentElement.status = 'inserting'
      setArray([...arr])
      stepCount++
      setCurrentStep(stepCount)
      
      await new Promise(resolve => setTimeout(resolve, speed))

      // 检查是否需要停止
      if (shouldStopRef.current) {
        setIsRunning(false)
        setIsPaused(false)
        return
      }

      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      let j = i - 1
      
      // 将当前元素插入到已排序序列中的正确位置
      while (j >= 0) {
        // 检查是否需要停止
        if (shouldStopRef.current) {
          setIsRunning(false)
          setIsPaused(false)
          return
        }
        
        // 检查是否暂停
        while (isPausedRef.current && !shouldStopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        // 标记正在比较的元素
        arr[j].status = 'comparing'
        currentElement.status = 'inserting'
        setArray([...arr])
        compCount++
        setComparisons(compCount)
        stepCount++
        setCurrentStep(stepCount)
        
        await new Promise(resolve => setTimeout(resolve, speed))

        // 检查是否需要停止
        if (shouldStopRef.current) {
          setIsRunning(false)
          setIsPaused(false)
          return
        }

        // 检查是否暂停
        while (isPausedRef.current && !shouldStopRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        if (arr[j].value > currentElement.value) {
          // 交换元素
          arr[j + 1] = arr[j]
          arr[j] = currentElement
          swapCount++
          setSwaps(swapCount)
          
          // 重置比较状态
          arr[j].status = 'normal'
          arr[j + 1].status = 'inserting'
          setArray([...arr])
          
          await new Promise(resolve => setTimeout(resolve, speed))

          // 检查是否需要停止
          if (shouldStopRef.current) {
            setIsRunning(false)
            setIsPaused(false)
            return
          }

          // 检查是否暂停
          while (isPausedRef.current && !shouldStopRef.current) {
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        } else {
          // 重置比较状态
          arr[j].status = 'normal'
          break
        }
        
        j--
      }
      
      // 标记当前元素为已排序
      arr[j + 1].status = 'sorted'
      setArray([...arr])
      
      // 检查是否需要停止
      if (shouldStopRef.current) {
        setIsRunning(false)
        setIsPaused(false)
        return
      }

      // 检查是否暂停
      while (isPausedRef.current && !shouldStopRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    setIsRunning(false)
    setIsPaused(false)
  }, [array, isRunning, speed])

  // 暂停/恢复排序
  const togglePause = () => {
    if (isRunning) {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      isPausedRef.current = newPausedState
    }
  }

  // 重置排序
  const resetSort = () => {
    // 标记正在重置
    isResettingRef.current = true
    
    // 设置停止标志
    setShouldStop(true)
    shouldStopRef.current = true
    
    // 延迟重置，确保算法完全停止
    setTimeout(() => {
      if (isResettingRef.current) {
        generateArray()
      }
    }, 300)
  }

  // 获取元素颜色
  const getElementColor = (status: string) => {
    switch (status) {
      case 'comparing':
        return 'bg-yellow-400 dark:bg-yellow-500'
      case 'inserting':
        return 'bg-orange-400 dark:bg-orange-500'
      case 'sorted':
        return 'bg-green-400 dark:bg-green-500'
      default:
        return 'bg-blue-400 dark:bg-blue-500'
    }
  }

  // 获取元素阴影
  const getElementShadow = (status: string) => {
    switch (status) {
      case 'comparing':
        return 'shadow-lg shadow-yellow-500/50'
      case 'inserting':
        return 'shadow-lg shadow-orange-500/50'
      case 'sorted':
        return 'shadow-lg shadow-green-500/50'
      default:
        return 'shadow-md shadow-blue-500/30'
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
                  插入排序
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解插入排序算法
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
                <BarChart3 className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                排序可视化
              </h2>
              
              {/* 数组可视化 */}
              <div className="mb-8">
                <div className="flex items-end justify-center space-x-2 h-64 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                  {array.map((element, index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-300 ease-out ${getElementColor(element.status)} ${getElementShadow(element.status)} rounded-t-lg flex items-end justify-center`}
                      style={{
                        width: `${Math.max(30, 400 / arraySize)}px`,
                        height: `${(element.value / 100) * 200}px`,
                        minHeight: '20px'
                      }}
                    >
                      <span className="absolute -top-8 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {element.value}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-lg"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={isRunning ? togglePause : insertionSort}
                  disabled={array.every(el => el.status === 'sorted')}
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
                        <Play className="w-5 h-5 mr-2" />
                        开始排序
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button
                  onClick={resetSort}
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
                      插入排序是一种简单直观的排序算法，它的工作原理是通过构建有序序列，
                      对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
                    </p>
                    <p className="leading-relaxed">
                      就像我们整理扑克牌一样，将一张新牌插入到已经整理好的牌堆中的正确位置。
                      这种算法对于小规模数据或基本有序的数据效率较高。
                    </p>
                    <p>
                      <strong>特点：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>稳定排序：相同元素的相对位置不变</li>
                      <li>原地排序：不需要额外空间</li>
                      <li>时间复杂度：O(n²)</li>
                      <li>空间复杂度：O(1)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>从第一个元素开始，该元素可以认为已经被排序</li>
                      <li>取出下一个元素，在已经排序的元素序列中从后向前扫描</li>
                      <li>如果该元素大于新元素，将该元素移到下一位置</li>
                      <li>重复步骤3，直到找到已排序的元素小于或者等于新元素的位置</li>
                      <li>将新元素插入到该位置后</li>
                      <li>重复步骤2~5</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>优化提示：</strong>插入排序对于小规模数据或基本有序的数据效率很高，
                        在实际应用中，它常被用作其他高级排序算法的子过程。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 控制面板 */}

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
                    数组大小: {arraySize}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    动画速度: {speed}ms
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">比较次数</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{comparisons}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">移动次数</span>
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{swaps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(n²)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">空间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(1)</span>
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
                  <div className="w-4 h-4 rounded bg-blue-400 dark:bg-blue-500 shadow-md shadow-blue-500/30"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">未处理的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在比较的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-orange-400 dark:bg-orange-500 shadow-lg shadow-orange-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在插入的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-green-400 dark:bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">已排序的元素</span>
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
