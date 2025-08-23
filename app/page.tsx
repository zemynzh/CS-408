import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Cpu, 
  FileText, 
  Network, 
  GitBranch, 
  Share2, 
  Play, 
  MessageSquare,
  ArrowRight,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-6 mt-16 overflow-hidden">
        {/* 液体背景效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* 背景图案 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            CS-408考研计算机科目<br />知识点可视化平台
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            系统性学习计算机组成原理、操作系统、计算机网络、数据结构四大核心科目<br />
            提供完整的知识点导航、思维导图和互动式学习体验
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glass-liquid ripple-effect bg-blue-600/80 hover:bg-blue-700/90 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group will-change-transform">
              <span className="relative z-10">开始学习</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button className="glass-liquid ripple-effect bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300/90 dark:hover:bg-gray-600/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group will-change-transform">
              <span className="relative z-10">算法可视化</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>

      {/* 四个科目卡片 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 计算机组成原理 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 border-l-4 border-blue-400 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 hover:border-blue-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">计算机组成原理</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">CPU、内存、I/O系统等硬件组成与工作原理</p>
                  <Link href="/computer-organization" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center group/link">
                    进入学习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 操作系统 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 border-l-4 border-green-400 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 hover:border-green-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">操作系统</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">进程管理、内存管理、文件系统等核心概念</p>
                  <Link href="/operating-system" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center group/link">
                    进入学习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 计算机网络 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 border-l-4 border-purple-400 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 hover:border-purple-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">计算机网络</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">网络协议、TCP/IP、网络安全等知识点</p>
                  <Link href="/computer-network" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center group/link">
                    进入学习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 数据结构 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 border-l-4 border-orange-400 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 hover:border-orange-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <GitBranch className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">数据结构</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">线性表、树、图、排序算法等核心内容</p>
                  <Link href="/data-structure" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center group/link">
                    进入学习 <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 平台特色功能 */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* 背景液体效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-green-400/8 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">平台特色功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 知识点思维导图 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <Share2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">知识点思维导图</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                每个章节配备完整的思维导图,帮助理解知识点之间的逻辑关系
              </p>
            </div>

            {/* 算法可视化 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <Play className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">算法可视化</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                动态演示各种算法的执行过程,让抽象概念变得直观易懂
              </p>
            </div>

            {/* 互动式测试 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">互动式测试</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                针对每个知识点的练习题,实时反馈,巩固学习效果
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 快速导航 */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* 背景液体效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-purple-400/8 rounded-full blur-2xl animate-pulse delay-300"></div>
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-orange-400/6 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">快速导航</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* 算法演示 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 text-center hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-800 dark:text-white font-medium">算法演示</p>
            </div>

            {/* 练习题库 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 text-center hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-gray-800 dark:text-white font-medium">练习题库</p>
            </div>

            {/* 思维导图 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 text-center hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Share2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-gray-800 dark:text-white font-medium">思维导图</p>
            </div>

            {/* 学习进度 */}
            <div className="glass-liquid bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 text-center hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-gray-800 dark:text-white font-medium">学习进度</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}