'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface ArrayElement {
  value: number
  status: 'normal' | 'comparing' | 'merging' | 'sorted' | 'left' | 'right'
}

export default function MergeSortVisualization() {
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

  // 合并函数
  const merge = async (arr: ArrayElement[], left: number, mid: number, right: number) => {
    const leftArray = arr.slice(left, mid + 1)
    const rightArray = arr.slice(mid + 1, right + 1)
    
    let i = 0, j = 0, k = left

    // 标记左右两个子数组
    for (let idx = left; idx <= right; idx++) {
      if (idx <= mid) {
        arr[idx].status = 'left'
      } else {
        arr[idx].status = 'right'
      }
    }
    setArray([...arr])
    setCurrentStep(prev => prev + 1)
    await wait()

    while (i < leftArray.length && j < rightArray.length) {
      // 标记正在比较的元素
      arr[left + i].status = 'comparing'
      arr[mid + 1 + j].status = 'comparing'
      setArray([...arr])
      setComparisons(prev => prev + 1)
      setCurrentStep(prev => prev + 1)
      await wait()

      if (leftArray[i].value <= rightArray[j].value) {
        arr[k] = { ...leftArray[i], status: 'merging' }
        i++
      } else {
        arr[k] = { ...rightArray[j], status: 'merging' }
        j++
      }
      
      setSwaps(prev => prev + 1)
      setCurrentStep(prev => prev + 1)
      await wait()
      
      k++
    }

    // 处理剩余元素
    while (i < leftArray.length) {
      arr[k] = { ...leftArray[i], status: 'merging' }
      setSwaps(prev => prev + 1)
      setCurrentStep(prev => prev + 1)
      await wait()
      i++
      k++
    }

    while (j < rightArray.length) {
      arr[k] = { ...rightArray[j], status: 'merging' }
      setSwaps(prev => prev + 1)
      setCurrentStep(prev => prev + 1)
      await wait()
      j++
      k++
    }

    // 标记合并后的数组为已排序
    for (let idx = left; idx <= right; idx++) {
      arr[idx].status = 'sorted'
    }
    setArray([...arr])
    setCurrentStep(prev => prev + 1)
    await wait()
  }

  // 归并排序算法
  const mergeSort = async (arr: ArrayElement[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      
      // 递归排序左半部分
      await mergeSort(arr, left, mid)
      
      // 递归排序右半部分
      await mergeSort(arr, mid + 1, right)
      
      // 合并两个有序子数组
      await merge(arr, left, mid, right)
    } else if (left === right) {
      // 单个元素标记为已排序
      arr[left].status = 'sorted'
      setArray([...arr])
      setCurrentStep(prev => prev + 1)
      await wait()
    }
  }

  // 开始排序
  const startSort = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    const arr = [...array]

    try {
      await mergeSort(arr, 0, arr.length - 1)
    } catch (error) {
      if (error instanceof Error && error.message === 'stopped') {
        // 排序被停止，重置状态
        return
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
      case 'merging':
        return 'bg-orange-400 dark:bg-orange-500'
      case 'left':
        return 'bg-indigo-400 dark:bg-indigo-500'
      case 'right':
        return 'bg-purple-400 dark:bg-purple-500'
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
      case 'merging':
        return 'shadow-lg shadow-orange-500/50'
      case 'left':
        return 'shadow-lg shadow-indigo-500/50'
      case 'right':
        return 'shadow-lg shadow-purple-500/50'
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
                  归并排序
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解归并排序算法
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
                  onClick={isRunning ? togglePause : startSort}
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
                      归并排序是一种分治算法，它将数组分成两半，递归地对两半进行排序，
                      然后将两个有序的子数组合并成一个有序的数组。
                    </p>
                    <p className="leading-relaxed">
                      就像整理两堆已经排序好的扑克牌，我们需要将这两堆牌合并成一堆有序的牌。
                      归并排序的核心思想就是"分而治之"。
                    </p>
                    <p>
                      <strong>特点：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>稳定排序：相同元素的相对位置不变</li>
                      <li>时间复杂度稳定：O(n log n)</li>
                      <li>空间复杂度：O(n)</li>
                      <li>适合外部排序</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>将数组分成两半</li>
                      <li>递归地对左半部分进行排序</li>
                      <li>递归地对右半部分进行排序</li>
                      <li>合并两个有序的子数组</li>
                      <li>重复直到所有元素都排序完成</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>优化提示：</strong>归并排序的时间复杂度稳定在O(n log n)，
                        特别适合处理大规模数据和外部排序场景。
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
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(n log n)</span>
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
                  <div className="w-4 h-4 rounded bg-blue-400 dark:bg-blue-500 shadow-md shadow-blue-500/30"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">未处理的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-indigo-400 dark:bg-indigo-500 shadow-lg shadow-indigo-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">左半部分元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-purple-400 dark:bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">右半部分元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在比较的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-orange-400 dark:bg-orange-500 shadow-lg shadow-orange-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在合并的元素</span>
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
