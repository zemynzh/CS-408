'use client'

import Link from 'next/link'
import { Home, ArrowLeft, AlertCircle, Construction } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      {/* 背景液体效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-16 border border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/30">
          {/* 404图标 */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl mb-8 shadow-2xl">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>

          {/* 标题 */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 dark:from-orange-400 dark:via-red-400 dark:to-orange-400 bg-clip-text text-transparent mb-4">
            404
          </h1>

          {/* 副标题 */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            页面暂未开发
          </h2>

          {/* 描述 */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            抱歉，您访问的页面正在开发中。<br />
            由于个人开发时间有限，部分功能仍在完善中。
          </p>

          {/* 开发状态指示 */}
          <div className="flex items-center justify-center space-x-2 mb-8 text-orange-600 dark:text-orange-400">
            <Construction className="w-5 h-5" />
            <span className="text-sm font-medium">个人开发中</span>
          </div>

          {/* 开发说明 */}
          <div className="mb-8 p-4 bg-orange-50/50 dark:bg-orange-900/20 rounded-xl border border-orange-200/30 dark:border-orange-700/30">
            <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
              这是一个个人项目，开发进度受限于个人时间。<br />
              我会持续完善功能，感谢您的理解与支持！
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <Link href="/" className="flex-1">
              <button className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-4 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center justify-center space-x-2 w-full min-w-[140px]">
                <Home className="w-5 h-5" />
                <span>返回首页</span>
              </button>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="glass-liquid bg-white/90 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-4 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 flex items-center justify-center space-x-2 flex-1 min-w-[140px]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回上页</span>
            </button>
          </div>

          {/* 可用功能提示 */}
          <div className="mt-10 p-8 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/30 dark:border-blue-700/30">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              您可以尝试以下功能
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/data-structure" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">DS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">数据结构学习</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">完整的知识体系</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/algorithm" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold">AL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">算法可视化</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">动态演示过程</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/mindmap" className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">MM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">思维导图</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">可视化导航</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
