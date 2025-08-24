'use client'

import { GraduationCap, Mail, MessageSquare, Github } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="glass-liquid bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-white border-t border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
      {/* 背景液体效果 */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* CS-408考研助手 */}
          <div className="space-y-4 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">CS-408考研助手</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              专为计算机考研学生打造的知识点可视化学习平台，提供数据结构、算法、操作系统等核心科目的系统化学习。
            </p>
          </div>

          {/* 核心科目 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">核心科目</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/computer-organization" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  计算机组成原理
                </Link>
              </li>
              <li>
                <Link href="/operating-system" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  操作系统
                </Link>
              </li>
              <li>
                <Link href="/computer-network" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  计算机网络
                </Link>
              </li>
              <li>
                <Link href="/data-structure" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-orange-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  数据结构
                </Link>
              </li>
            </ul>
          </div>

          {/* 学习工具 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">学习工具</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/algorithm" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  算法可视化
                </Link>
              </li>
              <li>
                <Link href="/mindmap" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  思维导图
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  练习测试
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-white text-sm transition-all duration-300 hover:translate-x-1 flex items-center group/link">
                  <span className="w-1 h-1 bg-orange-400 rounded-full mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  学习进度
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">联系我们</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              为您的考研之路提供最专业的支持
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:zemynzh@gmail.com" 
                className="glass-liquid w-12 h-12 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                title="发送邮件"
              >
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="https://github.com/zemynzh" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-liquid w-12 h-12 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                title="GitHub主页"
              >
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </a>
              <a 
                href="/contact" 
                className="glass-liquid w-12 h-12 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 group"
                title="联系我们"
              >
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="border-t border-gray-200/50 dark:border-gray-700/50 relative z-10"></div>

      {/* 版权信息 */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
          © 2024 CS-408考研助手.专注计算机考研知识点可视化学习.
        </p>
      </div>
    </footer>
  )
} 