'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft, Search, Target, Binary } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface ArrayElement {
  value: number
  status: 'normal' | 'searching' | 'found' | 'not-found' | 'checked' | 'left-half' | 'right-half'
}

export default function BinarySearchVisualization() {
  const [array, setArray] = useState<ArrayElement[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [arraySize, setArraySize] = useState(15)
  const [comparisons, setComparisons] = useState(0)
  const [targetValue, setTargetValue] = useState(50)
  const [foundIndex, setFoundIndex] = useState(-1)
  const [showInfo, setShowInfo] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [mid, setMid] = useState(0)
  const isPausedRef = useRef(false)
  const shouldStopRef = useRef(false)
  const isResettingRef = useRef(false)

  // 生成有序随机数组
  const generateArray = useCallback(() => {
    const newArray: ArrayElement[] = []
    const values = new Set<number>()
    
    // 生成不重复的随机数
    while (values.size < arraySize) {
      values.add(Math.floor(Math.random() * 100) + 1)
    }
    
    // 转换为数组并排序
    const sortedValues = Array.from(values).sort((a, b) => a - b)
    
    for (let i = 0; i < sortedValues.length; i++) {
      newArray.push({
        value: sortedValues[i],
        status: 'normal'
      })
    }
    
    setArray(newArray)
    setCurrentStep(0)
    setComparisons(0)
    setFoundIndex(-1)
    setLeft(0)
    setRight(newArray.length - 1)
    setMid(0)
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

  // 二分查找算法
  const binarySearch = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    setFoundIndex(-1)
    const arr = [...array]
    let compCount = 0
    let stepCount = 0
    let leftIndex = 0
    let rightIndex = arr.length - 1

    // 重置所有元素状态
    arr.forEach(element => {
      element.status = 'normal'
    })
    setArray([...arr])
    setLeft(leftIndex)
    setRight(rightIndex)

    while (leftIndex <= rightIndex) {
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

      // 计算中间位置
      const midIndex = Math.floor((leftIndex + rightIndex) / 2)
      setMid(midIndex)
      stepCount++
      setCurrentStep(stepCount)
      
      await wait()

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

      // 标记当前正在搜索的元素
      arr[midIndex].status = 'searching'
      setArray([...arr])
      stepCount++
      setCurrentStep(stepCount)
      
      await wait()

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

      // 比较当前元素与目标值
      compCount++
      setComparisons(compCount)
      stepCount++
      setCurrentStep(stepCount)
      
      await wait()

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

      if (arr[midIndex].value === targetValue) {
        // 找到目标值
        arr[midIndex].status = 'found'
        setFoundIndex(midIndex)
        setArray([...arr])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
        
        setIsRunning(false)
        setIsPaused(false)
        return
      } else if (arr[midIndex].value < targetValue) {
        // 目标值在右半部分
        arr[midIndex].status = 'left-half'
        setArray([...arr])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()

        // 标记左半部分为已检查
        for (let i = leftIndex; i <= midIndex; i++) {
          if (arr[i].status === 'normal') {
            arr[i].status = 'checked'
          }
        }
        setArray([...arr])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()

        leftIndex = midIndex + 1
        setLeft(leftIndex)
      } else {
        // 目标值在左半部分
        arr[midIndex].status = 'right-half'
        setArray([...arr])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()

        // 标记右半部分为已检查
        for (let i = midIndex; i <= rightIndex; i++) {
          if (arr[i].status === 'normal') {
            arr[i].status = 'checked'
          }
        }
        setArray([...arr])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()

        rightIndex = midIndex - 1
        setRight(rightIndex)
      }
    }

    // 未找到目标值
    setFoundIndex(-1)
    setIsRunning(false)
    setIsPaused(false)
  }, [array, isRunning, speed, targetValue])

  // 暂停/恢复查找
  const togglePause = () => {
    if (isRunning) {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      isPausedRef.current = newPausedState
    }
  }

  // 重置查找
  const resetSearch = () => {
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
      case 'searching':
        return 'bg-yellow-400 dark:bg-yellow-500'
      case 'found':
        return 'bg-green-400 dark:bg-green-500'
      case 'checked':
        return 'bg-gray-400 dark:bg-gray-500'
      case 'left-half':
        return 'bg-orange-400 dark:bg-orange-500'
      case 'right-half':
        return 'bg-red-400 dark:bg-red-500'
      case 'not-found':
        return 'bg-red-400 dark:bg-red-500'
      default:
        return 'bg-blue-400 dark:bg-blue-500'
    }
  }

  // 获取元素阴影
  const getElementShadow = (status: string) => {
    switch (status) {
      case 'searching':
        return 'shadow-lg shadow-yellow-500/50'
      case 'found':
        return 'shadow-lg shadow-green-500/50'
      case 'checked':
        return 'shadow-md shadow-gray-500/30'
      case 'left-half':
        return 'shadow-lg shadow-orange-500/50'
      case 'right-half':
        return 'shadow-lg shadow-red-500/50'
      case 'not-found':
        return 'shadow-lg shadow-red-500/50'
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
                  二分查找
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解二分查找算法
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
                <Binary className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                查找可视化
              </h2>
              
              {/* 目标值显示 */}
              <div className="mb-6">
                <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="flex items-center justify-center space-x-4">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      查找目标值：
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {targetValue}
                    </span>
                    {foundIndex !== -1 && (
                      <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                        (找到于索引 {foundIndex})
                      </span>
                    )}
                    {foundIndex === -1 && !isRunning && currentStep > 0 && (
                      <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                        (未找到)
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 数组可视化 */}
              <div className="mb-8">
                <div className="flex items-end justify-center space-x-2 h-64 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                  {array.map((element, index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-300 ease-out ${getElementColor(element.status)} ${getElementShadow(element.status)} rounded-t-lg flex items-end justify-center`}
                      style={{
                        width: `${Math.max(25, 350 / arraySize)}px`,
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
                  onClick={isRunning ? togglePause : binarySearch}
                  disabled={foundIndex !== -1}
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
                        <Search className="w-5 h-5 mr-2" />
                        开始查找
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button
                  onClick={resetSearch}
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
                      二分查找是一种高效的查找算法，它要求数组必须是有序的。
                      通过不断将查找范围缩小一半，快速定位目标值。
                    </p>
                    <p className="leading-relaxed">
                      就像在字典中查找单词一样，先翻到中间页，根据字母顺序决定
                      向前还是向后查找，不断缩小范围直到找到目标。
                    </p>
                    <p>
                      <strong>特点：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>高效快速：时间复杂度为O(log n)</li>
                      <li>要求有序：数组必须预先排序</li>
                      <li>空间复杂度：O(1)</li>
                      <li>适用场景：大规模有序数据查找</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>确定查找范围的左右边界</li>
                      <li>计算中间位置 mid = (left + right) / 2</li>
                      <li>比较中间元素与目标值</li>
                      <li>如果相等，返回索引</li>
                      <li>如果目标值小于中间元素，在左半部分查找</li>
                      <li>如果目标值大于中间元素，在右半部分查找</li>
                      <li>重复步骤2-6直到找到或范围为空</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>优化提示：</strong>二分查找是查找有序数组的最优算法之一。
                        对于频繁查找的场景，可以考虑使用哈希表等数据结构。
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
                    目标值: {targetValue}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={targetValue}
                    onChange={(e) => setTargetValue(Number(e.target.value))}
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">查找结果</span>
                  <span className={`text-sm font-semibold ${foundIndex !== -1 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {foundIndex !== -1 ? `索引 ${foundIndex}` : '未找到'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(log n)</span>
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">未检查的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">正在检查的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-orange-400 dark:bg-orange-500 shadow-lg shadow-orange-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">目标值在右半部分</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-red-400 dark:bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">目标值在左半部分</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-gray-400 dark:bg-gray-500 shadow-md shadow-gray-500/30"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">已排除的元素</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-green-400 dark:bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">找到的目标元素</span>
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
