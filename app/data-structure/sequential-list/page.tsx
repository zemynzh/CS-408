'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import DataStructureSidebar from '@/components/DataStructureSidebar'
import { 
  BookOpen, 
  Target, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  FileText,
  BarChart3,
  Lightbulb,
  Zap,
  Code,
  Cpu,
  Database,
  Layers,
  Move,
  Plus,
  Minus,
  Search,
  Edit3,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'

interface SequentialListData {
  data: (number | null)[]
  length: number
  capacity: number
}

export default function SequentialListPage() {
  const [listData, setListData] = useState<SequentialListData>({
    data: [1, 2, 3, 4, 5, null, null, null, null, null],
    length: 5,
    capacity: 10
  })
  const [operation, setOperation] = useState<string>('')
  const [operationValue, setOperationValue] = useState<string>('')
  const [operationIndex, setOperationIndex] = useState<string>('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchResult, setSearchResult] = useState<string>('')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('insert')

  // 重置列表
  const resetList = () => {
    setListData({
      data: [1, 2, 3, 4, 5, null, null, null, null, null],
      length: 5,
      capacity: 10
    })
    setOperation('')
    setOperationValue('')
    setOperationIndex('')
    setSearchResult('')
  }

  // 插入操作
  const insertElement = (value: number, index: number) => {
    if (index < 0 || index > listData.length || listData.length >= listData.capacity) {
      return false
    }

    const newData = [...listData.data]
    // 从后往前移动元素
    for (let i = listData.length; i > index; i--) {
      newData[i] = newData[i - 1]
    }
    newData[index] = value

    setListData({
      data: newData,
      length: listData.length + 1,
      capacity: listData.capacity
    })
    return true
  }

  // 删除操作
  const deleteElement = (index: number) => {
    if (index < 0 || index >= listData.length) {
      return false
    }

    const newData = [...listData.data]
    // 从前往后移动元素
    for (let i = index; i < listData.length - 1; i++) {
      newData[i] = newData[i + 1]
    }
    newData[listData.length - 1] = null

    setListData({
      data: newData,
      length: listData.length - 1,
      capacity: listData.capacity
    })
    return true
  }

  // 查找操作
  const searchElement = (value: number) => {
    for (let i = 0; i < listData.length; i++) {
      if (listData.data[i] === value) {
        return i
      }
    }
    return -1
  }

  // 执行操作
  const executeOperation = () => {
    if (!operation) return

    switch (operation) {
      case 'insert':
        if (operationValue && operationIndex !== '') {
          const value = parseInt(operationValue)
          const index = parseInt(operationIndex)
          if (!isNaN(value) && !isNaN(index)) {
            insertElement(value, index)
          }
        }
        break
      case 'delete':
        if (operationIndex !== '') {
          const index = parseInt(operationIndex)
          if (!isNaN(index)) {
            deleteElement(index)
          }
        }
        break
      case 'search':
        if (operationValue) {
          const value = parseInt(operationValue)
          if (!isNaN(value)) {
            const result = searchElement(value)
            setSearchResult(result >= 0 ? `元素 ${value} 在索引 ${result} 位置` : `元素 ${value} 未找到`)
          }
        }
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 - 固定 */}
        <div className="flex-shrink-0">
          <DataStructureSidebar />
        </div>
        
        {/* 主内容区域 - 可滚动 */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* 英雄区域 */}
          <section className="relative mb-8 overflow-hidden">
            {/* 背景液体效果 */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  顺序表
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  线性表的一种存储结构，用一组地址连续的存储单元依次存储线性表中的数据元素
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 2小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>知识点: 8个</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 基础</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 基本概念 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                基本概念
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="glass-liquid bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      存储结构
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      顺序表采用顺序存储结构，用一组地址连续的存储单元依次存储线性表中的数据元素。
                      通过数组实现，支持随机访问，但插入删除需要移动元素。
                    </p>
                  </div>
                  
                  <div className="glass-liquid bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <Cpu className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                      基本操作
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        插入操作：O(n) 时间复杂度
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        删除操作：O(n) 时间复杂度
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        查找操作：O(n) 时间复杂度
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        随机访问：O(1) 时间复杂度
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="glass-liquid bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      数据结构定义
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm">
                      <pre className="text-green-400">
{`typedef struct {
    ElemType *data;    // 存储空间基地址
    int length;        // 当前长度
    int capacity;      // 最大容量
} SequentialList;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="glass-liquid bg-orange-50/50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" />
                      优缺点分析
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">优点</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• 随机访问效率高</li>
                          <li>• 存储密度高</li>
                          <li>• 实现简单</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">缺点</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• 插入删除需要移动元素</li>
                          <li>• 需要预先分配存储空间</li>
                          <li>• 可能造成存储空间浪费</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 可视化演示 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                可视化演示
              </h2>
              
              {/* 顺序表可视化 */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">当前顺序表状态</h3>
                  <button
                    onClick={resetList}
                    className="glass-liquid bg-white/80 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>重置</span>
                  </button>
                </div>
                
                {/* 顺序表显示 */}
                <div className="glass-liquid bg-white/80 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300/50 dark:border-gray-700/30 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-sm text-gray-800 dark:text-gray-400 font-medium">长度: {listData.length}</span>
                    <span className="text-sm text-gray-800 dark:text-gray-400 font-medium">容量: {listData.capacity}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-sm text-gray-800 dark:text-gray-400 font-medium">索引:</span>
                    {listData.data.map((_, index) => (
                      <div key={index} className="w-8 h-6 flex items-center justify-center text-xs text-gray-700 dark:text-gray-400 font-medium">
                        {index}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-800 dark:text-gray-400 font-medium">数据:</span>
                    {listData.data.map((item, index) => (
                      <div
                        key={index}
                        className={`
                          w-12 h-12 rounded-xl border-2 flex items-center justify-center font-semibold transition-all duration-300 shadow-sm
                          ${index < listData.length 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-300' 
                            : 'bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                          }
                        `}
                      >
                        {item !== null ? item : 'null'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 操作控制面板 */}
              <div className="glass-liquid bg-white/80 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300/50 dark:border-gray-700/30 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">操作控制</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">操作类型</label>
                    <select
                      value={operation}
                      onChange={(e) => setOperation(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200"
                    >
                      <option value="">选择操作</option>
                      <option value="insert">插入</option>
                      <option value="delete">删除</option>
                      <option value="search">查找</option>
                    </select>
                  </div>
                  
                  {(operation === 'insert' || operation === 'search') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                        {operation === 'insert' ? '插入元素值' : '查找元素值'}
                      </label>
                      <input
                        type="number"
                        value={operationValue}
                        onChange={(e) => setOperationValue(e.target.value)}
                        placeholder={operation === 'insert' ? '输入要插入的元素值' : '输入要查找的元素值'}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                  )}
                  
                  {(operation === 'insert' || operation === 'delete') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                        {operation === 'insert' ? '插入位置' : '删除位置'}
                      </label>
                      <input
                        type="number"
                        value={operationIndex}
                        onChange={(e) => setOperationIndex(e.target.value)}
                        placeholder={operation === 'insert' ? '输入插入位置(1-6)' : '输入删除位置(1-5)'}
                        min={operation === 'insert' ? 1 : 1}
                        max={operation === 'insert' ? listData.length + 1 : listData.length}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                  )}
                  
                  {operation === 'search' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">操作说明</label>
                      <div className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-300 text-sm">
                        查找操作只需要输入要查找的元素值
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 查找结果显示 */}
                {searchResult && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-800 dark:text-blue-300 font-medium">查找结果:</span>
                    </div>
                    <p className="mt-2 text-blue-700 dark:text-blue-200">{searchResult}</p>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button
                    onClick={executeOperation}
                    disabled={!operation}
                    className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white disabled:text-gray-400 dark:disabled:text-gray-500 px-8 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 disabled:border-gray-300/50 dark:disabled:border-gray-500/50 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg disabled:shadow-none"
                  >
                    <Play className="w-5 h-5" />
                    <span>执行操作</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 算法实现 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                算法实现
              </h2>
              
              {/* 算法选择器 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">选择算法类型</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                  <button
                    onClick={() => setSelectedAlgorithm('insert')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'insert'
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">插入</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('delete')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'delete'
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                    <span className="hidden sm:inline">删除</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('search')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'search'
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">查找</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('traverse')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'traverse'
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">遍历</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('merge')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'merge'
                        ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Move className="w-4 h-4" />
                    <span className="hidden sm:inline">合并</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('sort')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'sort'
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">排序</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('deduplicate')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'deduplicate'
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">去重</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedAlgorithm('reverse')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      selectedAlgorithm === 'reverse'
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">反转</span>
                  </button>
                </div>
              </div>
              
              {/* 算法实现内容 */}
              <div>
                {selectedAlgorithm === 'insert' && (
                  <div className="glass-liquid bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Plus className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      插入算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`bool Insert(SequentialList &L, int i, ElemType e) {
    if (i < 1 || i > L.length + 1) return false;
    if (L.length >= L.capacity) return false;
    
    for (int j = L.length; j >= i; j--) {
        L.data[j] = L.data[j-1];
    }
    L.data[i-1] = e;
    L.length++;
    return true;
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>时间复杂度:</strong> O(n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}
                
                {selectedAlgorithm === 'delete' && (
                  <div className="glass-liquid bg-red-50/50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200/30 dark:border-red-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Minus className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
                      删除算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`bool Delete(SequentialList &L, int i, ElemType &e) {
    if (i < 1 || i > L.length) return false;
    
    e = L.data[i-1];
    for (int j = i; j < L.length; j++) {
        L.data[j-1] = L.data[j];
    }
    L.length--;
    return true;
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>时间复杂度:</strong> O(n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === 'search' && (
                  <div className="glass-liquid bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Search className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                      查找算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`// 顺序查找
int SequentialSearch(SequentialList &L, ElemType e) {
    for (int i = 0; i < L.length; i++) {
        if (L.data[i] == e) return i + 1;
    }
    return 0; // 未找到
}

// 二分查找（要求有序）
int BinarySearch(SequentialList &L, ElemType e) {
    int left = 0, right = L.length - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (L.data[mid] == e) return mid + 1;
        else if (L.data[mid] > e) right = mid - 1;
        else left = mid + 1;
    }
    return 0; // 未找到
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>顺序查找:</strong> O(n)</p>
                      <p><strong>二分查找:</strong> O(log n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === 'traverse' && (
                  <div className="glass-liquid bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      遍历算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`// 正向遍历
void Traverse(SequentialList &L) {
    for (int i = 0; i < L.length; i++) {
        printf("%d ", L.data[i]);
    }
    printf("\\n");
}

// 反向遍历
void ReverseTraverse(SequentialList &L) {
    for (int i = L.length - 1; i >= 0; i--) {
        printf("%d ", L.data[i]);
    }
    printf("\\n");
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>时间复杂度:</strong> O(n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === 'merge' && (
                  <div className="glass-liquid bg-yellow-50/50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200/30 dark:border-yellow-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Move className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                      合并算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`// 合并两个有序顺序表
bool Merge(SequentialList &L1, SequentialList &L2, 
           SequentialList &L3) {
    if (L1.length + L2.length > L3.capacity) 
        return false;
    
    int i = 0, j = 0, k = 0;
    while (i < L1.length && j < L2.length) {
        if (L1.data[i] <= L2.data[j]) {
            L3.data[k++] = L1.data[i++];
        } else {
            L3.data[k++] = L2.data[j++];
        }
    }
    
    while (i < L1.length) L3.data[k++] = L1.data[i++];
    while (j < L2.length) L3.data[k++] = L2.data[j++];
    
    L3.length = k;
    return true;
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>时间复杂度:</strong> O(n+m)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === 'sort' && (
                  <div className="glass-liquid bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200/30 dark:border-indigo-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                      排序算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`// 冒泡排序
void BubbleSort(SequentialList &L) {
    for (int i = 0; i < L.length - 1; i++) {
        for (int j = 0; j < L.length - 1 - i; j++) {
            if (L.data[j] > L.data[j + 1]) {
                ElemType temp = L.data[j];
                L.data[j] = L.data[j + 1];
                L.data[j + 1] = temp;
            }
        }
    }
}

// 快速排序
void QuickSort(SequentialList &L, int left, int right) {
    if (left >= right) return;
    
    ElemType pivot = L.data[left];
    int i = left, j = right;
    
    while (i < j) {
        while (i < j && L.data[j] >= pivot) j--;
        L.data[i] = L.data[j];
        while (i < j && L.data[i] <= pivot) i++;
        L.data[j] = L.data[i];
    }
    L.data[i] = pivot;
    
    QuickSort(L, left, i - 1);
    QuickSort(L, i + 1, right);
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>冒泡排序:</strong> O(n²)</p>
                      <p><strong>快速排序:</strong> O(n log n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === 'deduplicate' && (
                  <div className="glass-liquid bg-pink-50/50 dark:bg-pink-900/20 rounded-2xl p-6 border border-pink-200/30 dark:border-pink-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400" />
                      去重算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`// 去除重复元素
int RemoveDuplicates(SequentialList &L) {
    if (L.length <= 1) return L.length;
    
    int k = 0;
    for (int i = 1; i < L.length; i++) {
        if (L.data[i] != L.data[k]) {
            L.data[++k] = L.data[i];
        }
    }
    L.length = k + 1;
    return L.length;
}

// 去除指定元素
int RemoveElement(SequentialList &L, ElemType e) {
    int k = 0;
    for (int i = 0; i < L.length; i++) {
        if (L.data[i] != e) {
            L.data[k++] = L.data[i];
        }
    }
    L.length = k;
    return L.length;
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>时间复杂度:</strong> O(n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === 'reverse' && (
                  <div className="glass-liquid bg-cyan-50/50 dark:bg-cyan-900/20 rounded-2xl p-6 border border-cyan-200/30 dark:border-cyan-700/30">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <RotateCcw className="w-5 h-5 mr-2 text-cyan-600 dark:text-cyan-400" />
                      反转算法
                    </h3>
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <pre className="text-green-400 whitespace-pre-wrap break-words">
{`// 反转顺序表
void Reverse(SequentialList &L) {
    int left = 0, right = L.length - 1;
    while (left < right) {
        ElemType temp = L.data[left];
        L.data[left] = L.data[right];
        L.data[right] = temp;
        left++;
        right--;
    }
}

// 循环左移k位
void RotateLeft(SequentialList &L, int k) {
    k = k % L.length;
    if (k == 0) return;
    
    Reverse(L, 0, k - 1);
    Reverse(L, k, L.length - 1);
    Reverse(L, 0, L.length - 1);
}

void Reverse(SequentialList &L, int start, int end) {
    while (start < end) {
        ElemType temp = L.data[start];
        L.data[start] = L.data[end];
        L.data[end] = temp;
        start++;
        end--;
    }
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>反转:</strong> O(n)</p>
                      <p><strong>循环左移:</strong> O(n)</p>
                      <p><strong>空间复杂度:</strong> O(1)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 练习测试 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
                练习测试
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">基础练习</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      顺序表的插入操作
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      顺序表的删除操作
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      顺序表的查找操作
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      顺序表的遍历操作
                    </li>
                  </ul>
                </div>
                
                <div className="glass-liquid bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">进阶练习</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      顺序表的合并操作
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      顺序表的排序操作
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      顺序表的去重操作
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      顺序表的反转操作
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/data-structure/sequential-list/practice">
                  <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 mx-auto shadow-lg">
                    <Target className="w-5 h-5" />
                    <span>开始练习</span>
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* 导航按钮 */}
          <section className="flex justify-between items-center">
            <Link href="/data-structure/linear-structure">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <ChevronLeft className="w-5 h-5" />
                <span>返回线性结构</span>
              </button>
            </Link>
            
            <Link href="/data-structure/linked-list">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <span>链表</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
