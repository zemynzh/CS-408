"use client"

import Navbar from '@/components/Navbar'
import ComputerNetworkSidebar from '@/components/ComputerNetworkSidebar'
import { 
  Target, 
  Lightbulb, 
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
  CheckCircle,
  FileText,
  Code,
  Database,
  Cpu,
  Network,
  Settings,
  Play,
  Shield,
  Wifi,
  Server
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ComputerNetworkPracticePage() {
  const practiceTopics = [
    {
      id: 'network-architecture',
      title: '网络体系结构',
      icon: Network,
      description: 'OSI模型、TCP/IP协议栈等',
      questionCount: 8,
      difficulty: '基础',
      estimatedTime: '6分钟',
      color: 'from-indigo-400 to-purple-400'
    },
    {
      id: 'physical-layer',
      title: '物理层',
      icon: Wifi,
      description: '传输介质、编码方式、调制技术等',
      questionCount: 6,
      difficulty: '基础',
      estimatedTime: '5分钟',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'data-link-layer',
      title: '数据链路层',
      icon: Shield,
      description: '帧格式、差错控制、流量控制等',
      questionCount: 10,
      difficulty: '进阶',
      estimatedTime: '8分钟',
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'network-layer',
      title: '网络层',
      icon: Globe,
      description: 'IP协议、路由算法、拥塞控制等',
      questionCount: 12,
      difficulty: '进阶',
      estimatedTime: '10分钟',
      color: 'from-orange-400 to-red-400'
    },
    {
      id: 'transport-layer',
      title: '传输层',
      icon: Server,
      description: 'TCP/UDP协议、连接管理、可靠传输等',
      questionCount: 10,
      difficulty: '进阶',
      estimatedTime: '8分钟',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'application-layer',
      title: '应用层',
      icon: FileText,
      description: 'HTTP、DNS、FTP等应用协议',
      questionCount: 8,
      difficulty: '基础',
      estimatedTime: '6分钟',
      color: 'from-yellow-400 to-orange-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 */}
        <div className="flex-shrink-0">
          <ComputerNetworkSidebar />
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* 英雄区域 */}
          <section className="relative mb-8 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
                  计算机网络练习
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  通过系统性的练习巩固网络通信协议与体系结构的核心知识点
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计时间: 43分钟</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>题目数量: 54题</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 基础到进阶</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 练习主题选择 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
                选择练习主题
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceTopics.map((topic, index) => (
                  <div key={topic.id} className="glass-liquid bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200/30 dark:border-indigo-700/30 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <topic.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{topic.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{topic.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <BookOpen className="w-3 h-3" />
                              <span>{topic.questionCount}题</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{topic.estimatedTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{topic.difficulty}</span>
                            </div>
                          </div>
                          
                          <div className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm flex items-center group/link">
                            开始练习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 综合练习 */}
          <section className="mb-8">
            <div className="glass-liquid bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/10 dark:to-purple-400/10 backdrop-blur-2xl rounded-3xl p-8 border border-indigo-200/30 dark:border-indigo-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  综合练习测试
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  包含所有知识点的综合练习，全面检验计算机网络的掌握程度。
                  建议在完成各主题练习后进行。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">54</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">总题目数</div>
                  </div>
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">43分钟</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">预计用时</div>
                  </div>
                  <div className="glass-liquid bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">综合</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">难度等级</div>
                  </div>
                </div>
                
                <button className="glass-liquid bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto">
                  <Play className="w-5 h-5" />
                  <span>开始综合练习</span>
                </button>
              </div>
            </div>
          </section>

          {/* 学习建议 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
                学习建议
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">练习顺序建议</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>先完成基础主题：网络体系结构、物理层、应用层</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>再练习进阶主题：数据链路层、网络层、传输层</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>最后进行综合练习，检验整体掌握情况</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">重点知识点</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>理解OSI七层模型和TCP/IP协议栈</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>掌握IP协议和路由算法</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>熟悉TCP/UDP协议和可靠传输机制</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 导航按钮 */}
          <section className="flex justify-between items-center">
            <Link href="/practice">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>返回练习中心</span>
              </button>
            </Link>
            
            <Link href="/computer-network">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-400/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center space-x-2 shadow-lg">
                <span>返回学习</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
