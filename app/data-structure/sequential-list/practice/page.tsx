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
  ChevronLeft,
  X,
  Check,
  AlertCircle,
  Star,
  Trophy,
  Timer,
  RefreshCw,
  Home
} from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: number
  type: 'insert' | 'delete' | 'search' | 'traverse' | 'merge' | 'sort' | 'deduplicate' | 'reverse'
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  options?: string[]
  correctAnswer: string | number | number[]
  explanation: string
  code?: string
  listData?: (number | null)[]
  listLength?: number
  listCapacity?: number
}

interface PracticeSession {
  currentQuestion: number
  score: number
  totalQuestions: number
  answers: Record<number, any>
  timeSpent: number
  isCompleted: boolean
}

export default function SequentialListPracticePage() {
  const [practiceSession, setPracticeSession] = useState<PracticeSession>({
    currentQuestion: 0,
    score: 0,
    totalQuestions: 0,
    answers: {},
    timeSpent: 0,
    isCompleted: false
  })
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [practiceType, setPracticeType] = useState<string>('')
  const [isStarted, setIsStarted] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)

  // 练习题目数据
  const allQuestions: Question[] = [
    {
      id: 1,
      type: 'insert',
      title: '顺序表插入操作',
      description: '在顺序表 [1, 3, 5, 7, 9] 的第3个位置插入元素6，插入后的顺序表是？',
      difficulty: 'easy',
      options: [
        '[1, 3, 6, 5, 7, 9]',
        '[1, 3, 5, 6, 7, 9]',
        '[1, 6, 3, 5, 7, 9]',
        '[6, 1, 3, 5, 7, 9]'
      ],
      correctAnswer: '[1, 3, 6, 5, 7, 9]',
      explanation: '在顺序表中插入元素需要将插入位置后的所有元素向后移动一位，然后在指定位置插入新元素。第3个位置（索引为2，即元素5的位置）插入6后，原位置及之后的元素都要后移。',
      listData: [1, 3, 5, 7, 9, null, null, null, null, null],
      listLength: 5,
      listCapacity: 10
    },
    {
      id: 2,
      type: 'delete',
      title: '顺序表删除操作',
      description: '从顺序表 [2, 4, 6, 8, 10] 中删除第2个位置的元素，删除后的顺序表是？',
      difficulty: 'easy',
      options: [
        '[2, 6, 8, 10]',
        '[4, 6, 8, 10]',
        '[2, 4, 8, 10]',
        '[2, 4, 6, 10]'
      ],
      correctAnswer: '[2, 6, 8, 10]',
      explanation: '删除顺序表中的元素需要将删除位置后的所有元素向前移动一位。删除第2个位置（索引为1）的元素4后，后面的元素6、8、10都要前移。',
      listData: [2, 4, 6, 8, 10, null, null, null, null, null],
      listLength: 5,
      listCapacity: 10
    },
    {
      id: 3,
      type: 'search',
      title: '顺序查找',
      description: '在顺序表 [3, 7, 11, 15, 19, 23] 中查找元素15，该元素的位置是？',
      difficulty: 'easy',
      options: ['第1个位置', '第2个位置', '第3个位置', '第4个位置'],
      correctAnswer: '第4个位置',
      explanation: '顺序查找从第一个元素开始逐个比较，直到找到目标元素。元素15在顺序表中的第4个位置（索引为3）。',
      listData: [3, 7, 11, 15, 19, 23, null, null, null, null],
      listLength: 6,
      listCapacity: 10
    },
    {
      id: 4,
      type: 'traverse',
      title: '顺序表遍历',
      description: '对顺序表 [5, 10, 15, 20, 25] 进行正向遍历，遍历顺序是？',
      difficulty: 'easy',
      options: [
        '5, 10, 15, 20, 25',
        '25, 20, 15, 10, 5',
        '5, 15, 25, 10, 20',
        '10, 20, 5, 15, 25'
      ],
      correctAnswer: '5, 10, 15, 20, 25',
      explanation: '正向遍历按照数组的索引顺序从前往后访问每个元素，即从索引0开始到最后一个元素。',
      listData: [5, 10, 15, 20, 25, null, null, null, null, null],
      listLength: 5,
      listCapacity: 10
    },
    {
      id: 5,
      type: 'merge',
      title: '顺序表合并',
      description: '合并两个有序顺序表 [1, 3, 5] 和 [2, 4, 6]，合并后的结果是？',
      difficulty: 'medium',
      options: [
        '[1, 2, 3, 4, 5, 6]',
        '[1, 3, 5, 2, 4, 6]',
        '[2, 4, 6, 1, 3, 5]',
        '[1, 2, 3, 5, 4, 6]'
      ],
      correctAnswer: '[1, 2, 3, 4, 5, 6]',
      explanation: '合并两个有序顺序表时，需要比较两个表的元素，将较小的元素先放入结果表中，保持有序性。',
      listData: [1, 3, 5, 2, 4, 6, null, null, null, null],
      listLength: 6,
      listCapacity: 10
    },
    {
      id: 6,
      type: 'sort',
      title: '冒泡排序',
      description: '对顺序表 [4, 2, 7, 1, 5] 进行冒泡排序，第一轮排序后的结果是？',
      difficulty: 'medium',
      options: [
        '[2, 4, 1, 5, 7]',
        '[4, 2, 7, 1, 5]',
        '[1, 2, 4, 5, 7]',
        '[2, 4, 7, 1, 5]'
      ],
      correctAnswer: '[2, 4, 1, 5, 7]',
      explanation: '冒泡排序第一轮会将最大的元素7"冒泡"到最后位置，同时相邻元素比较交换，得到 [2, 4, 1, 5, 7]。',
      listData: [4, 2, 7, 1, 5, null, null, null, null, null],
      listLength: 5,
      listCapacity: 10
    },
    {
      id: 7,
      type: 'deduplicate',
      title: '顺序表去重',
      description: '对顺序表 [1, 2, 2, 3, 3, 3, 4] 进行去重操作，去重后的结果是？',
      difficulty: 'medium',
      options: [
        '[1, 2, 3, 4]',
        '[1, 2, 2, 3, 4]',
        '[1, 2, 3, 3, 4]',
        '[1, 2, 3, 3, 3, 4]'
      ],
      correctAnswer: '[1, 2, 3, 4]',
      explanation: '去重操作会移除所有重复的元素，只保留每个元素的第一次出现。',
      listData: [1, 2, 2, 3, 3, 3, 4, null, null, null],
      listLength: 7,
      listCapacity: 10
    },
    {
      id: 8,
      type: 'reverse',
      title: '顺序表反转',
      description: '反转顺序表 [1, 2, 3, 4, 5]，反转后的结果是？',
      difficulty: 'easy',
      options: [
        '[5, 4, 3, 2, 1]',
        '[1, 2, 3, 4, 5]',
        '[5, 1, 2, 3, 4]',
        '[2, 3, 4, 5, 1]'
      ],
      correctAnswer: '[5, 4, 3, 2, 1]',
      explanation: '反转操作将顺序表的元素顺序完全颠倒，第一个元素变成最后一个，最后一个元素变成第一个。',
      listData: [1, 2, 3, 4, 5, null, null, null, null, null],
      listLength: 5,
      listCapacity: 10
    },
    {
      id: 9,
      type: 'insert',
      title: '复杂插入操作',
      description: '在容量为8的顺序表 [1, 2, 3, 4, 5] 的第1个位置插入元素0，插入后的顺序表是？',
      difficulty: 'medium',
      options: [
        '[0, 1, 2, 3, 4, 5]',
        '[1, 0, 2, 3, 4, 5]',
        '[1, 2, 0, 3, 4, 5]',
        '[0, 2, 3, 4, 5, 1]'
      ],
      correctAnswer: '[0, 1, 2, 3, 4, 5]',
      explanation: '在第1个位置（索引为0）插入元素需要将所有元素向后移动一位，然后在开头插入新元素。',
      listData: [1, 2, 3, 4, 5, null, null, null],
      listLength: 5,
      listCapacity: 8
    },
    {
      id: 10,
      type: 'search',
      title: '二分查找',
      description: '在有序顺序表 [1, 3, 5, 7, 9, 11, 13, 15] 中查找元素7，需要比较几次？',
      difficulty: 'medium',
      options: ['1次', '2次', '3次', '4次'],
      correctAnswer: '3次',
      explanation: '二分查找在有序表中查找元素7，第一次比较中间元素9，第二次比较中间元素5，第三次比较中间元素7，找到目标。',
      listData: [1, 3, 5, 7, 9, 11, 13, 15, null, null],
      listLength: 8,
      listCapacity: 10
    },
    {
      id: 11,
      type: 'sort',
      title: '快速排序',
      description: '对顺序表 [6, 2, 8, 1, 9, 3] 进行快速排序，以第一个元素为基准，第一轮分区后的结果是？',
      difficulty: 'hard',
      options: [
        '[3, 2, 1, 6, 9, 8]',
        '[2, 1, 3, 6, 8, 9]',
        '[1, 2, 3, 6, 8, 9]',
        '[3, 2, 1, 6, 8, 9]'
      ],
      correctAnswer: '[3, 2, 1, 6, 9, 8]',
      explanation: '以6为基准进行分区，小于6的元素放在左边，大于6的元素放在右边，得到 [3, 2, 1, 6, 9, 8]。',
      listData: [6, 2, 8, 1, 9, 3, null, null, null, null],
      listLength: 6,
      listCapacity: 10
    },
    {
      id: 12,
      type: 'merge',
      title: '多路归并',
      description: '合并三个有序顺序表 [1, 4, 7], [2, 5, 8], [3, 6, 9]，合并后的结果是？',
      difficulty: 'hard',
      options: [
        '[1, 2, 3, 4, 5, 6, 7, 8, 9]',
        '[1, 4, 7, 2, 5, 8, 3, 6, 9]',
        '[1, 2, 3, 7, 8, 9, 4, 5, 6]',
        '[3, 6, 9, 2, 5, 8, 1, 4, 7]'
      ],
      correctAnswer: '[1, 2, 3, 4, 5, 6, 7, 8, 9]',
      explanation: '多路归并需要同时比较三个表的当前元素，选择最小的放入结果表，保持有序性。',
      listData: [1, 4, 7, 2, 5, 8, 3, 6, 9, null],
      listLength: 9,
      listCapacity: 10
    }
  ]

  // 根据练习类型获取题目
  const getQuestionsByType = (type: string): Question[] => {
    switch (type) {
      case 'basic':
        // 基础练习：只包含简单题目
        return allQuestions.filter(q => q.difficulty === 'easy')
      case 'advanced':
        // 进阶练习：包含中等和困难题目
        return allQuestions.filter(q => q.difficulty === 'medium' || q.difficulty === 'hard')
      case 'comprehensive':
        // 综合练习：包含所有题目
        return [...allQuestions]
      case 'random':
        // 随机练习：随机选择6道题目
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, 6)
      default:
        return allQuestions
    }
  }

  // 当前练习的题目
  const [questions, setQuestions] = useState<Question[]>(allQuestions)
  const [currentTotalQuestions, setCurrentTotalQuestions] = useState<number>(allQuestions.length)

  // 开始练习
  const startPractice = (type: string) => {
    const selectedQuestions = getQuestionsByType(type)
    setQuestions(selectedQuestions)
    setCurrentTotalQuestions(selectedQuestions.length)
    setPracticeType(type)
    setPracticeSession({
      currentQuestion: 0,
      score: 0,
      totalQuestions: selectedQuestions.length,
      answers: {},
      timeSpent: 0,
      isCompleted: false
    })
    setIsStarted(true)
    setStartTime(Date.now())
  }

  // 提交答案
  const submitAnswer = () => {
    if (selectedAnswer === null) return

    const currentQ = questions[practiceSession.currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer
    
    const newAnswers = { ...practiceSession.answers }
    newAnswers[practiceSession.currentQuestion] = {
      answer: selectedAnswer,
      correct: isCorrect
    }

    const newScore = isCorrect ? practiceSession.score + 1 : practiceSession.score

    setPracticeSession(prev => ({
      ...prev,
      score: newScore,
      answers: newAnswers
    }))

    setShowExplanation(true)
  }

  // 下一题
  const nextQuestion = () => {
    if (practiceSession.currentQuestion < questions.length - 1) {
      setPracticeSession(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }))
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // 练习完成
      const endTime = Date.now()
      const timeSpent = Math.round((endTime - startTime) / 1000)
      
      setPracticeSession(prev => ({
        ...prev,
        timeSpent,
        isCompleted: true
      }))
    }
  }

  // 重新开始
  const restartPractice = () => {
    setPracticeSession({
      currentQuestion: 0,
      score: 0,
      totalQuestions: allQuestions.length,
      answers: {},
      timeSpent: 0,
      isCompleted: false
    })
    setSelectedAnswer(null)
    setShowExplanation(false)
    setIsStarted(false)
    setPracticeType('')
    setQuestions(allQuestions)
    setCurrentTotalQuestions(allQuestions.length)
  }

  // 获取难度颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400'
      case 'hard': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  // 获取难度文本
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单'
      case 'medium': return '中等'
      case 'hard': return '困难'
      default: return '未知'
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                  顺序表练习测试
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  通过互动式练习巩固顺序表的核心概念和算法实现
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计时间: 15分钟</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>题目数量: {currentTotalQuestions}题</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 基础到进阶</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {!isStarted ? (
            /* 练习选择界面 */
            <section className="mb-8">
              <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Play className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                  选择练习类型
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* 基础练习 */}
                  <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
                       onClick={() => startPractice('basic')}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mb-4 shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">基础练习</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">插入、删除、查找等基本操作</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Star className="w-3 h-3" />
                        <span>4题简单题目</span>
                      </div>
                    </div>
                  </div>

                  {/* 进阶练习 */}
                  <div className="glass-liquid bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer"
                       onClick={() => startPractice('advanced')}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-4 shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">进阶练习</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">合并、排序、去重等复杂操作</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Star className="w-3 h-3" />
                        <span>8题中等+困难</span>
                      </div>
                    </div>
                  </div>

                  {/* 综合练习 */}
                  <div className="glass-liquid bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
                       onClick={() => startPractice('comprehensive')}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl mb-4 shadow-lg">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">综合练习</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">所有知识点的综合应用</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Star className="w-3 h-3" />
                        <span>12题全部题目</span>
                      </div>
                    </div>
                  </div>

                  {/* 随机练习 */}
                  <div className="glass-liquid bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
                       onClick={() => startPractice('random')}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl mb-4 shadow-lg">
                        <RefreshCw className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">随机练习</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">随机题目组合练习</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Star className="w-3 h-3" />
                        <span>6题随机选择</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : !practiceSession.isCompleted ? (
            /* 练习进行中界面 */
            <section className="mb-8">
              <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
                {/* 进度条 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      题目 {practiceSession.currentQuestion + 1} / {questions.length}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      得分: {practiceSession.score} / {practiceSession.currentQuestion + 1}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((practiceSession.currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* 当前题目 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[practiceSession.currentQuestion].difficulty)} bg-opacity-10`}>
                        {getDifficultyText(questions[practiceSession.currentQuestion].difficulty)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {questions[practiceSession.currentQuestion].type.toUpperCase()}
                      </span>
                    </div>
                    <Timer className="w-5 h-5 text-gray-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    {questions[practiceSession.currentQuestion].title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {questions[practiceSession.currentQuestion].description}
                  </p>

                  {/* 选项 */}
                  {!showExplanation && (
                    <div className="space-y-3 mb-6">
                      {questions[practiceSession.currentQuestion].options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAnswer(option)}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            selectedAnswer === option
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                              : 'border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedAnswer === option
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-400 dark:border-gray-500'
                            }`}>
                              {selectedAnswer === option && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                            <span>{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 解释 */}
                  {showExplanation && (
                    <div className="mb-6">
                      <div className={`p-4 rounded-xl border-2 ${
                        practiceSession.answers[practiceSession.currentQuestion]?.correct
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {practiceSession.answers[practiceSession.currentQuestion]?.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                          <span className={`font-medium ${
                            practiceSession.answers[practiceSession.currentQuestion]?.correct
                              ? 'text-green-800 dark:text-green-200'
                              : 'text-red-800 dark:text-red-200'
                          }`}>
                            {practiceSession.answers[practiceSession.currentQuestion]?.correct ? '回答正确' : '回答错误'}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {questions[practiceSession.currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex justify-between">
                    <button
                      onClick={restartPractice}
                      className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>返回</span>
                    </button>

                                         {!showExplanation ? (
                       <button
                         onClick={submitAnswer}
                         disabled={selectedAnswer === null}
                         className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white disabled:text-gray-400 dark:disabled:text-gray-500 px-8 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 disabled:border-gray-300/50 dark:disabled:border-gray-500/50 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
                       >
                         <Check className="w-5 h-5" />
                         <span>提交答案</span>
                       </button>
                                          ) : (
                       <button
                         onClick={nextQuestion}
                         className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                       >
                         <ArrowRight className="w-5 h-5" />
                         <span>{practiceSession.currentQuestion < questions.length - 1 ? '下一题' : '完成练习'}</span>
                       </button>
                     )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            /* 练习完成界面 */
            <section className="mb-8">
              <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    练习完成！
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-liquid bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {practiceSession.score}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">正确题数</div>
                    </div>
                    
                    <div className="glass-liquid bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {Math.round((practiceSession.score / questions.length) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">正确率</div>
                    </div>
                    
                    <div className="glass-liquid bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {practiceSession.timeSpent}s
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">用时</div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={restartPractice}
                      className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      <span>重新练习</span>
                    </button>
                    
                    <Link href="/data-structure/sequential-list">
                      <button className="glass-liquid bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                        <ArrowRight className="w-5 h-5" />
                        <span>返回学习</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 导航按钮 */}
          <section className="flex justify-between items-center">
            <Link href="/data-structure/sequential-list">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <ChevronLeft className="w-5 h-5" />
                <span>返回顺序表</span>
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
