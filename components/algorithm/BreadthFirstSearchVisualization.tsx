'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings, BarChart3, Info, ChevronLeft, Search, Target, GitBranch } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface GraphNode {
  id: number
  x: number
  y: number
  status: 'unvisited' | 'visited' | 'current' | 'path' | 'target' | 'in-queue'
  neighbors: number[]
  distance: number
  parent: number | null
}

interface Edge {
  from: number
  to: number
  status: 'normal' | 'visited' | 'current'
}

export default function BreadthFirstSearchVisualization() {
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [nodeCount, setNodeCount] = useState(8)
  const [visitedCount, setVisitedCount] = useState(0)
  const [targetNode, setTargetNode] = useState(5)
  const [startNode, setStartNode] = useState(0)
  const [foundPath, setFoundPath] = useState<number[]>([])
  const [showInfo, setShowInfo] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [queue, setQueue] = useState<number[]>([])
  const isPausedRef = useRef(false)
  const shouldStopRef = useRef(false)
  const isResettingRef = useRef(false)

  // 生成图结构
  const generateGraph = useCallback(() => {
    const newNodes: GraphNode[] = []
    const newEdges: Edge[] = []
    
    // 生成节点
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * 2 * Math.PI
      const radius = 120
      const x = 200 + radius * Math.cos(angle)
      const y = 200 + radius * Math.sin(angle)
      
      newNodes.push({
        id: i,
        x,
        y,
        status: 'unvisited',
        neighbors: [],
        distance: Infinity,
        parent: null
      })
    }
    
    // 生成边（每个节点连接到2-3个其他节点）
    for (let i = 0; i < nodeCount; i++) {
      const neighborCount = Math.floor(Math.random() * 2) + 2 // 2-3个邻居
      const availableNeighbors = newNodes.filter(node => 
        node.id !== i && 
        !newNodes[i].neighbors.includes(node.id) &&
        !node.neighbors.includes(i)
      )
      
      for (let j = 0; j < neighborCount && availableNeighbors.length > 0; j++) {
        const randomIndex = Math.floor(Math.random() * availableNeighbors.length)
        const neighbor = availableNeighbors[randomIndex]
        
        newNodes[i].neighbors.push(neighbor.id)
        newNodes[neighbor.id].neighbors.push(i)
        
        newEdges.push({
          from: i,
          to: neighbor.id,
          status: 'normal'
        })
        
        availableNeighbors.splice(randomIndex, 1)
      }
    }
    
    setNodes(newNodes)
    setEdges(newEdges)
    setCurrentStep(0)
    setVisitedCount(0)
    setFoundPath([])
    setQueue([])
    setIsRunning(false)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    isResettingRef.current = false
  }, [nodeCount])

  // 初始化图
  useEffect(() => {
    generateGraph()
  }, [generateGraph])

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

  // 广度优先搜索算法
  const breadthFirstSearch = useCallback(async () => {
    if (isRunning || isResettingRef.current) return
    
    setIsRunning(true)
    setShouldStop(false)
    setIsPaused(false)
    shouldStopRef.current = false
    isPausedRef.current = false
    setFoundPath([])
    const nodesCopy = [...nodes]
    const edgesCopy = [...edges]
    let stepCount = 0
    let visitedNodes = 0
    const visited = new Set<number>()
    const nodeQueue: number[] = [startNode]
    
    // 重置所有节点和边状态
    nodesCopy.forEach(node => {
      node.status = 'unvisited'
      node.distance = Infinity
      node.parent = null
    })
    edgesCopy.forEach(edge => {
      edge.status = 'normal'
    })
    
    // 设置起始节点
    nodesCopy[startNode].distance = 0
    nodesCopy[startNode].status = 'current'
    setNodes([...nodesCopy])
    setEdges([...edgesCopy])
    setQueue([startNode])

    while (nodeQueue.length > 0) {
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

      const currentNode = nodeQueue.shift()!
      
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

      // 标记当前节点
      nodesCopy[currentNode].status = 'current'
      setNodes([...nodesCopy])
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

      if (!visited.has(currentNode)) {
        visited.add(currentNode)
        visitedNodes++
        setVisitedCount(visitedNodes)
        
        // 检查是否找到目标节点
        if (currentNode === targetNode) {
          nodesCopy[currentNode].status = 'target'
          
          // 构建路径
          const path: number[] = []
          let current = currentNode
          while (current !== null) {
            path.unshift(current)
            current = nodesCopy[current].parent!
          }
          setFoundPath(path)
          
          setNodes([...nodesCopy])
          stepCount++
          setCurrentStep(stepCount)
          
          await wait()
          
          setIsRunning(false)
          setIsPaused(false)
          return
        }
        
        // 标记为已访问
        nodesCopy[currentNode].status = 'visited'
        setNodes([...nodesCopy])
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

        // 将未访问的邻居节点加入队列中
        const unvisitedNeighbors = nodesCopy[currentNode].neighbors.filter(
          neighborId => !visited.has(neighborId)
        )
        
        for (const neighborId of unvisitedNeighbors) {
          if (nodesCopy[neighborId].distance === Infinity) {
            nodesCopy[neighborId].distance = nodesCopy[currentNode].distance + 1
            nodesCopy[neighborId].parent = currentNode
            nodesCopy[neighborId].status = 'in-queue'
            nodeQueue.push(neighborId)
            
            // 标记边为当前访问
            const edge = edgesCopy.find(e => 
              (e.from === currentNode && e.to === neighborId) ||
              (e.from === neighborId && e.to === currentNode)
            )
            if (edge) {
              edge.status = 'current'
            }
          }
        }
        
        setEdges([...edgesCopy])
        setQueue([...nodeQueue])
        stepCount++
        setCurrentStep(stepCount)
        
        await wait()
      }
    }

    // 未找到目标节点
    setIsRunning(false)
    setIsPaused(false)
  }, [nodes, edges, isRunning, speed, targetNode, startNode])

  // 暂停/恢复搜索
  const togglePause = () => {
    if (isRunning) {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      isPausedRef.current = newPausedState
    }
  }

  // 重置搜索
  const resetSearch = () => {
    // 标记正在重置
    isResettingRef.current = true
    
    // 设置停止标志
    setShouldStop(true)
    shouldStopRef.current = true
    
    // 延迟重置，确保算法完全停止
    setTimeout(() => {
      if (isResettingRef.current) {
        generateGraph()
      }
    }, 300)
  }

  // 获取节点颜色
  const getNodeColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-yellow-400 dark:bg-yellow-500'
      case 'visited':
        return 'bg-blue-400 dark:bg-blue-500'
      case 'target':
        return 'bg-green-400 dark:bg-green-500'
      case 'path':
        return 'bg-purple-400 dark:bg-purple-500'
      case 'in-queue':
        return 'bg-orange-400 dark:bg-orange-500'
      default:
        return 'bg-gray-400 dark:bg-gray-500'
    }
  }

  // 获取节点阴影
  const getNodeShadow = (status: string) => {
    switch (status) {
      case 'current':
        return 'shadow-lg shadow-yellow-500/50'
      case 'visited':
        return 'shadow-lg shadow-blue-500/50'
      case 'target':
        return 'shadow-lg shadow-green-500/50'
      case 'path':
        return 'shadow-lg shadow-purple-500/50'
      case 'in-queue':
        return 'shadow-lg shadow-orange-500/50'
      default:
        return 'shadow-md shadow-gray-500/30'
    }
  }

  // 获取边颜色
  const getEdgeColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'stroke-yellow-500 dark:stroke-yellow-400'
      case 'visited':
        return 'stroke-blue-500 dark:stroke-blue-400'
      default:
        return 'stroke-gray-300 dark:stroke-gray-600'
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
                  广度优先搜索
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  通过动画演示理解广度优先搜索算法
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
                <GitBranch className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                图搜索可视化
              </h2>
              
              {/* 搜索信息显示 */}
              <div className="mb-6">
                <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        起始节点: {startNode}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        目标节点: {targetNode}
                      </span>
                    </div>
                    {foundPath.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-green-400 dark:bg-green-500"></div>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          最短路径: {foundPath.join(' → ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 图可视化 */}
              <div className="mb-8">
                <div className="relative h-96 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                  <svg className="w-full h-full absolute inset-0">
                    {/* 绘制边 */}
                    {edges.map((edge, index) => {
                      const fromNode = nodes.find(n => n.id === edge.from)
                      const toNode = nodes.find(n => n.id === edge.to)
                      if (!fromNode || !toNode) return null
                      
                      return (
                        <line
                          key={index}
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          strokeWidth="2"
                          className={`transition-all duration-300 ${getEdgeColor(edge.status)}`}
                        />
                      )
                    })}
                    
                    {/* 绘制节点 */}
                    {nodes.map((node) => (
                      <g key={node.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="20"
                          className={`transition-all duration-300 ${getNodeColor(node.status)} ${getNodeShadow(node.status)}`}
                        />
                        <text
                          x={node.x}
                          y={node.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-bold text-white dark:text-white pointer-events-none"
                        >
                          {node.id}
                        </text>
                        {/* 显示距离信息 */}
                        {node.distance !== Infinity && (
                          <text
                            x={node.x}
                            y={node.y + 35}
                            textAnchor="middle"
                            className="text-xs text-gray-600 dark:text-gray-400 pointer-events-none"
                          >
                            d={node.distance}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={isRunning ? togglePause : breadthFirstSearch}
                  disabled={foundPath.length > 0}
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
                        开始搜索
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
                      广度优先搜索(BFS)是一种图遍历算法，它从起始节点开始，
                      逐层探索图中的节点，先访问所有相邻节点，再访问下一层节点。
                    </p>
                    <p className="leading-relaxed">
                      就像水波纹扩散一样，BFS会先探索距离起始节点最近的节点，
                      然后逐渐向外扩展，确保找到的是最短路径。
                    </p>
                    <p>
                      <strong>特点：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>广度优先：优先探索近邻节点</li>
                      <li>使用队列：先进先出的数据结构</li>
                      <li>最短路径：保证找到最短路径</li>
                      <li>时间复杂度：O(V + E)</li>
                      <li>空间复杂度：O(V)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      <strong>算法步骤：</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-600 dark:text-gray-400">
                      <li>从起始节点开始，将其加入队列</li>
                      <li>当队列不为空时，取出队首节点</li>
                      <li>检查当前节点是否为目标节点</li>
                      <li>将当前节点的所有未访问邻居加入队列</li>
                      <li>标记当前节点为已访问</li>
                      <li>重复步骤2-5直到找到目标或队列为空</li>
                    </ol>
                    
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>应用场景：</strong>广度优先搜索常用于最短路径查找、网络爬虫、
                        社交网络分析、游戏AI寻路等场景。
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
                    节点数量: {nodeCount}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="12"
                    value={nodeCount}
                    onChange={(e) => setNodeCount(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    起始节点: {startNode}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={nodeCount - 1}
                    value={startNode}
                    onChange={(e) => setStartNode(Number(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    目标节点: {targetNode}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={nodeCount - 1}
                    value={targetNode}
                    onChange={(e) => setTargetNode(Number(e.target.value))}
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">已访问节点</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{visitedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">队列大小</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{queue.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">查找结果</span>
                  <span className={`text-sm font-semibold ${foundPath.length > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {foundPath.length > 0 ? '找到路径' : '未找到'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(V + E)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">空间复杂度</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">O(V)</span>
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
                  <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 shadow-md shadow-gray-500/30"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">未访问的节点</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">当前访问的节点</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-400 dark:bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">已访问的节点</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-orange-400 dark:bg-orange-500 shadow-lg shadow-orange-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">队列中的节点</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-400 dark:bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">目标节点</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-purple-400 dark:bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">路径节点</span>
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
