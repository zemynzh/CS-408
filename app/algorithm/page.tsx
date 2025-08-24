import Navbar from '@/components/Navbar'
import AlgorithmSidebar from '@/components/AlgorithmSidebar'
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
  Brain,
  TrendingUp,
  Eye,
  MousePointer,
  Settings,
  Download,
  Network
} from 'lucide-react'
import Link from 'next/link'

export default function AlgorithmPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 - 固定 */}
        <div className="flex-shrink-0">
          <AlgorithmSidebar />
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
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  算法可视化
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  通过动态演示深入理解算法原理，让抽象的算法变得直观易懂
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 60小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>算法数量: 50+</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 中等</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 功能特色 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                可视化特色
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    算法可视化平台提供直观的动态演示，让您能够清晰地看到算法的每一步执行过程。
                    通过交互式的可视化界面，深入理解算法的核心思想和实现细节。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    支持多种算法类型，包括排序、查找、图论、动态规划等，每个算法都配有详细的
                    步骤说明和复杂度分析，帮助您掌握算法的精髓。
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">动态演示</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">实时展示算法执行过程，步骤清晰可见</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">交互控制</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">支持暂停、加速、回放等交互操作</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">参数调整</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">可自定义输入数据，观察不同情况下的表现</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 算法分类 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Cpu className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                算法分类
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 基础算法 */}
                <div className="glass-liquid bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">基础算法</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    排序、查找、递归等基础算法，掌握算法设计的基本思想
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>排序算法：冒泡、选择、插入、快排等</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>查找算法：线性查找、二分查找</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>递归算法：阶乘、斐波那契、汉诺塔</span>
                    </div>
                  </div>
                </div>
                
                {/* 图论算法 */}
                <div className="glass-liquid bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Network className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">图论算法</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    图的基本操作、最短路径、最小生成树等经典图论算法
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>最短路径：Dijkstra、Bellman-Ford、Floyd</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>最小生成树：Prim、Kruskal算法</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>网络流：Ford-Fulkerson、Edmonds-Karp</span>
                    </div>
                  </div>
                </div>
                
                {/* 动态规划 */}
                <div className="glass-liquid bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">动态规划</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    经典DP问题，通过状态转移方程解决复杂优化问题
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>经典问题：LCS、LIS、背包、编辑距离</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>优化问题：矩阵链乘法、最优BST</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>高级应用：旅行商问题、状态压缩</span>
                    </div>
                  </div>
                </div>
                
                {/* 贪心算法 */}
                <div className="glass-liquid bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">贪心算法</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    局部最优选择策略，适用于多种优化问题
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span>调度问题：活动选择、作业调度</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span>优化问题：哈夫曼编码、分数背包</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span>应用场景：硬币找零、区间调度</span>
                    </div>
                  </div>
                </div>
                
                {/* 高级算法 */}
                <div className="glass-liquid bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-200/30 dark:border-indigo-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">高级算法</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    字符串算法、几何算法、数值算法等高级应用
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      <span>字符串：KMP、Boyer-Moore、后缀数组</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      <span>几何算法：凸包、最近点对、线段相交</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      <span>数值算法：FFT、模幂运算、素数测试</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 可视化演示区域 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <MousePointer className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                可视化演示
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 演示区域 */}
                <div className="glass-liquid bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 rounded-2xl p-6 border border-gray-200/30 dark:border-gray-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">算法演示</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200">
                        <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-colors duration-200">
                        <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="h-64 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        选择左侧算法开始可视化演示
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 控制面板 */}
                <div className="space-y-6">
                  <div className="glass-liquid bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      执行控制
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">执行速度</span>
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">步骤显示</span>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">开启</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">数据大小</span>
                        <select className="px-3 py-1 text-xs bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-600/30 rounded-lg">
                          <option>小 (10)</option>
                          <option>中 (50)</option>
                          <option>大 (100)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-liquid bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                      性能分析
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">时间复杂度</span>
                        <span className="text-xs text-green-600 dark:text-green-400">O(n²)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">空间复杂度</span>
                        <span className="text-xs text-green-600 dark:text-green-400">O(1)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">执行时间</span>
                        <span className="text-xs text-green-600 dark:text-green-400">0.5ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 开始学习按钮 */}
          <section className="text-center">
            <div className="glass-liquid bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/30 dark:border-blue-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                开始算法可视化学习
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                通过交互式的可视化演示，深入理解算法的执行过程和核心思想，
                让抽象的算法概念变得直观易懂。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                    <Play className="w-5 h-5 mr-2" />
                    开始演示
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                    <Download className="w-5 h-5 mr-2" />
                    下载代码
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 