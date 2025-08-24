'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface ArrayElement {
  value: number
  status: 'normal' | 'comparing' | 'heapifying' | 'extracting' | 'sorted'
}

export default function HeapSortVisualization() {
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

  // 获取父节点索引
  const getParentIndex = (index: number) => Math.floor((index - 1) / 2)

  // 获取左子节点索引
  const getLeftChildIndex = (index: number) => 2 * index + 1

  // 获取右子节点索引
  const getRightChildIndex = (index: number) => 2 * index + 2

  // 交换元素
  const swap = async (arr: ArrayElement[], i: number, j: number) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    setSwaps(prev => prev + 1)
    setCurrentStep(prev => prev + 1)
    await wait()
  }

  // 堆化函数（向下调整）
  const heapify = async (arr: ArrayElement[], n: number, i: number) => {
    let largest = i
    const left = getLeftChildIndex(i)
    const right = getRightChildIndex(i)

    // 检查左子节点
    if (left < n) {
      arr[left].status = 'comparing'
      arr[largest].status = 'comparing'
      setArray([...arr])
      setComparisons(prev => prev + 1)
      setCurrentStep(prev => prev + 1)
      await wait()

      if (arr[left].value > arr[largest].value) {
        largest = left
      }
      
      // 重置比较状态
      arr[left].status = 'normal'
      arr[i].status = 'normal'
      setArray([...arr])
    }

    // 检查右子节点
    if (right < n) {
      arr[right].status = 'comparing'
      arr[largest].status = 'comparing'
      setArray([...arr])
      setComparisons(prev => prev + 1)
      setCurrentStep(prev => prev + 1)
      await wait()

      if (arr[right].value > arr[largest].value) {
        largest = right
      }
      
      // 重置比较状态
      arr[right].status = 'normal'
      arr[largest].status = 'normal'
      setArray([...arr])
    }

    // 如果最大值不是根节点，则交换并继续堆化
    if (largest !== i) {
      arr[i].status = 'heapifying'
      arr[largest].status = 'heapifying'
      setArray([...arr])
      await wait()

      await swap(arr, i, largest)
      
      // 重置状态
      arr[i].status = 'normal'
      arr[largest].status = 'normal'
      setArray([...arr])

      // 递归堆化受影响的子树
      await heapify(arr, n, largest)
    }
  }

  // 构建最大堆
  const buildMaxHeap = async (arr: ArrayElement[]) => {
    const n = arr.length
    
    // 从最后一个非叶子节点开始，自底向上构建堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      arr[i].status = 'heapifying'
      setArray([...arr])
      setCurrentStep(prev => prev + 1)
      await wait()
      
      await heapify(arr, n, i)
      
      arr[i].status = 'normal'
      setArray([...arr])
    }
  }

  // 堆排序算法
  const heapSort = async (arr: ArrayElement[]) => {
    const n = arr.length

    // 构建最大堆
    await buildMaxHeap(arr)

    // 逐个提取堆顶元素
    for (let i = n - 1; i > 0; i--) {
      // 将堆顶元素（最大值）移到数组末尾
      arr[0].status = 'extracting'
      arr[i].status = 'extracting'
      setArray([...arr])
      setCurrentStep(prev => prev + 1)
      await wait()

      await swap(arr, 0, i)
      
      // 标记已排序的元素
      arr[i].status = 'sorted'
      setArray([...arr])
      setCurrentStep(prev => prev + 1)
      await wait()

      // 对剩余元素重新堆化
      if (i > 1) {
        arr[0].status = 'heapifying'
        setArray([...arr])
        await wait()
        
        await heapify(arr, i, 0)
        
        arr[0].status = 'normal'
        setArray([...arr])
      }
    }

    // 标记第一个元素为已排序
    arr[0].status = 'sorted'
    setArray([...arr])
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
      await heapSort(arr)
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
      case 'heapifying':
        return 'bg-orange-400 dark:bg-orange-500'
      case 'extracting':
        return 'bg-red-400 dark:bg-red-500'
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
      case 'heapifying':
        return 'shadow-lg shadow-orange-500/50'
      case 'extracting':
        return 'shadow-lg shadow-red-500/50'
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
                  堆排序
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解堆排序算法
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
                      堆排序是一种基于堆数据结构的排序算法，它利用堆的特性来排序数组。
                      首先构建最大堆，然后逐个提取堆顶元素（最大值）到数组末尾。
                    </p>
                    <p className="leading-relaxed">
                      堆是一种特殊的完全二叉树，其中每个节点的值都大于或等于其子节点的值（最大堆），
                      或者每个节点的值都小于或等于其子节点的值（最小堆）。
                    </p>
                    <p>
                      <strong>特点：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>原地排序：不需要额外空间</li>
                      <li>不稳定排序：相同元素的相对位置可能改变</li>
                      <li>时间复杂度：O(n log n)</li>
                      <li>空间复杂度：O(1)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>构建最大堆（Build-Max-Heap）</li>
                      <li>重复以下步骤直到堆为空：</li>
                      <li>提取堆顶元素（最大值）</li>
                      <li>将堆顶元素移到数组末尾</li>
                      <li>对剩余元素重新堆化</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>优化提示：</strong>堆排序的时间复杂度稳定在O(n log n)，
                        对于大数据集表现良好，但常数因子较大。
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">交换次数</span>
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{swaps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(n log n)</span>
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在堆化的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-red-400 dark:bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在提取的元素</span>
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
