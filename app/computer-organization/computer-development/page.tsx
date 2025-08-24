import Navbar from '@/components/Navbar'
import ComputerOrganizationSidebar from '@/components/ComputerOrganizationSidebar'
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
  History,
  Cpu,
  Monitor,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'

export default function ComputerDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* 左侧边栏 - 固定 */}
        <div className="flex-shrink-0">
          <ComputerOrganizationSidebar />
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
                  <History className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  计算机发展历程
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  探索计算机技术的演进历程，从机械计算到人工智能时代的跨越
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 4小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>知识点: 8+</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 基础</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 课程概述 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                课程概述
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    计算机发展历程是理解现代计算机技术的重要基础。从早期的机械计算设备到现代的超级计算机，
                    计算机技术经历了翻天覆地的变化，每一次技术突破都为人类文明带来了巨大的进步。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    通过学习计算机的发展历程，我们可以更好地理解计算机技术的演进规律，
                    为学习现代计算机系统奠定坚实的理论基础。
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">历史脉络清晰</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">系统梳理计算机发展的重要节点和里程碑</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">技术演进分析</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">深入分析技术发展的内在逻辑和推动因素</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">未来趋势展望</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">基于历史发展规律预测未来技术发展方向</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 学习目标 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                学习目标
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-liquid bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                    <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">掌握发展脉络</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    系统了解计算机从机械时代到电子时代的完整发展历程
                  </p>
                </div>
                
                <div className="glass-liquid bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">理解技术演进</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    深入理解计算机技术发展的内在逻辑和关键技术突破
                  </p>
                </div>
                
                <div className="glass-liquid bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">预测发展趋势</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    基于历史发展规律，预测未来计算机技术的发展方向
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 课程大纲 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                课程大纲
              </h2>
              <div className="space-y-6">
                {/* 计算机代际 */}
                <Link href="/computer-organization/computer-development/generations">
                  <div className="glass-liquid bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">计算机代际</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">基础篇</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">第一代：电子管计算机</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">第二代：晶体管计算机</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">第三代：集成电路计算机</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">第四代：大规模集成电路</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 冯·诺依曼体系结构 */}
                <Link href="/computer-organization/computer-development/von-neumann">
                  <div className="glass-liquid bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">冯·诺依曼体系结构</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">理论篇</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">存储程序原理</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">五大功能部件</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">二进制编码</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">顺序执行原理</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* 开始学习按钮 */}
          <section className="text-center">
            <div className="glass-liquid bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/30 dark:border-blue-700/30 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                准备好开始学习了吗？
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                通过系统性的学习，了解计算机技术的发展历程，为深入理解现代计算机系统奠定基础。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/computer-organization/computer-development/generations">
                  <button className="glass-liquid bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center text-gray-900 dark:text-white">
                      <Play className="w-5 h-5 mr-2" />
                      开始学习
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </Link>
                <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-8 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    查看进度
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
