"use client"

import Navbar from '@/components/Navbar'
import { 
  Target, 
  Lightbulb, 
  Database,
  Cpu,
  Globe,
  Zap,
  BookOpen,
  ArrowRight,
  Clock,
  Award,
  Trophy,
  Star,
  BarChart3,
  Users,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function PracticePage() {
  const practiceData = {
    center: {
      id: 'practice-center',
      title: '练习测试中心',
      icon: Target,
      color: 'from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500'
    },
    branches: [
      {
        id: 'computer-organization',
        title: '计算机组成原理',
        icon: Cpu,
        color: 'from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500',
        description: 'CPU、内存、I/O系统等硬件组成与工作原理',
        topics: [
          '数据表示与运算',
          '存储系统',
          '指令系统',
          'CPU结构',
          '总线系统',
          '输入输出系统'
        ],
        link: '/computer-organization/practice',
        questionCount: 50,
        difficulty: '基础到进阶',
        estimatedTime: '20分钟'
      },
      {
        id: 'operating-system',
        title: '操作系统',
        icon: BookOpen,
        color: 'from-green-400 to-emerald-400 dark:from-green-500 dark:to-emerald-500',
        description: '进程管理、内存管理、文件系统等核心概念',
        topics: [
          '进程管理',
          '内存管理',
          '文件系统',
          '设备管理',
          '死锁处理',
          '系统安全'
        ],
        link: '/operating-system/practice',
        questionCount: 45,
        difficulty: '基础到进阶',
        estimatedTime: '18分钟'
      },
      {
        id: 'computer-network',
        title: '计算机网络',
        icon: Globe,
        color: 'from-indigo-400 to-purple-400 dark:from-indigo-500 dark:to-purple-500',
        description: '网络协议、TCP/IP、网络安全等知识点',
        topics: [
          '网络体系结构',
          '物理层',
          '数据链路层',
          '网络层',
          '传输层',
          '应用层'
        ],
        link: '/computer-network/practice',
        questionCount: 40,
        difficulty: '基础到进阶',
        estimatedTime: '15分钟'
      },
      {
        id: 'data-structure',
        title: '数据结构',
        icon: Database,
        color: 'from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500',
        description: '线性表、树、图、排序算法等核心内容',
        topics: [
          '线性结构',
          '树形结构',
          '图形结构',
          '查找算法',
          '排序算法',
          '算法分析'
        ],
        link: '/data-structure/practice',
        questionCount: 60,
        difficulty: '基础到进阶',
        estimatedTime: '25分钟'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="pt-16 p-6 lg:p-8">
        {/* 页面标题区域 */}
        <section className="mb-8 mt-8 lg:mt-12">
          <div className="relative overflow-hidden">
            {/* 背景液体效果 */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/6 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-500 dark:to-red-600 rounded-3xl mb-6 shadow-2xl">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                  练习测试中心
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  CS-408 计算机考研知识点练习测试平台
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>4个核心科目</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>195道精选题目</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span>实时反馈</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 四个科目练习卡片 - 类似思维导图样式 */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceData.branches.map((branch, index) => (
              <Link href={branch.link} key={branch.id}>
                <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 border-l-4 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 relative overflow-hidden group cursor-pointer"
                     style={{
                       borderLeftColor: branch.color.includes('blue') ? '#60a5fa' : 
                                       branch.color.includes('green') ? '#4ade80' : 
                                       branch.color.includes('purple') ? '#a78bfa' : '#fb923c'
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{
                         background: branch.color.includes('blue') ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), transparent)' : 
                                    branch.color.includes('green') ? 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.05), transparent)' : 
                                    branch.color.includes('purple') ? 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.05), transparent)' : 
                                    'linear-gradient(to bottom right, rgba(249, 115, 22, 0.05), transparent)'
                       }}></div>
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                         style={{
                           backgroundColor: branch.color.includes('blue') ? '#dbeafe' : 
                                           branch.color.includes('green') ? '#dcfce7' : 
                                           branch.color.includes('purple') ? '#f3e8ff' : '#fed7aa'
                         }}>
                      <branch.icon className="w-5 h-5" 
                                  style={{
                                    color: branch.color.includes('blue') ? '#2563eb' : 
                                           branch.color.includes('green') ? '#16a34a' : 
                                           branch.color.includes('purple') ? '#9333ea' : '#ea580c'
                                  }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{branch.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{branch.description}</p>
                      
                      {/* 练习信息 */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <BookOpen className="w-3 h-3" />
                          <span>{branch.questionCount}道题目</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>预计{branch.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Star className="w-3 h-3" />
                          <span>{branch.difficulty}</span>
                        </div>
                      </div>
                      
                      <div className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center group/link">
                        开始练习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 练习特色功能 */}
        <section className="mb-8">
          <div className="glass-liquid bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">练习特色功能</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 实时反馈 */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">实时反馈</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  答题后立即获得正确答案和详细解析，帮助快速理解知识点
                </p>
              </div>

              {/* 进度跟踪 */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                  <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">进度跟踪</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  记录练习进度和成绩，帮助了解学习效果和薄弱环节
                </p>
              </div>

              {/* 智能推荐 */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                  <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">智能推荐</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  根据答题情况智能推荐相关知识点，针对性强化学习
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 练习统计 */}
        <section className="mb-8">
          <div className="glass-liquid bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">练习统计</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">195</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">总题目数</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">1.2k</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">练习人数</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">平均正确率</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">78</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">满分人数</div>
              </div>
            </div>
          </div>
        </section>

        {/* 操作提示 */}
        <section className="text-center">
          <div className="glass-liquid bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-400/10 dark:to-red-400/10 backdrop-blur-2xl rounded-3xl p-8 border border-orange-200/30 dark:border-orange-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              开始你的练习之旅
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              点击任意科目卡片进入对应的练习测试页面，通过做题巩固知识点，实时获得反馈和解析。
              每个科目都配备了不同难度的题目，帮助你全面提升学习效果。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    返回首页
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </Link>
              <Link href="/mindmap">
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    思维导图
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
