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
  Smartphone,
  Zap as Lightning,
  Database,
  Network,
  HardDrive,
  ArrowLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  Globe,
  Server,
  Calculator,
  Building,
  Home,
  Gamepad2,
  Car,
  Plane,
  Rocket,
  Microscope,
  Factory,
  ShoppingCart,
  CreditCard,
  Shield,
  Camera,
  Music,
  Video,
  Book,
  GraduationCap,
  Briefcase,
  Heart,
  Stethoscope
} from 'lucide-react'
import Link from 'next/link'

export default function ComputerByPurposePage() {
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
          {/* 面包屑导航 */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/computer-organization" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                计算机组成原理
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/computer-organization/computer-development" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                计算机发展历程
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">按用途分类</span>
            </div>
          </nav>

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
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  计算机按用途分类
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  从科学计算到个人娱乐，探索不同用途计算机的特点和应用
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 1.5小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>分类: 8大类</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>难度: 基础</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 概述 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                概述
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    计算机按用途分类是根据其应用领域和功能特点进行的分类方式。不同的应用场景对计算机的性能、
                    可靠性、成本等要求各不相同，因此产生了各种专用计算机。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    这种分类方式有助于理解计算机在不同领域的应用特点，以及如何选择合适的计算机系统来满足特定需求。
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">应用导向</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">根据实际应用需求进行分类</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">功能特点</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">突出各类计算机的独特功能</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">选择指导</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">帮助选择合适的计算机系统</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 科学计算计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">科学计算计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Scientific Computing Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高精度计算</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持双精度、四精度浮点运算</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">并行处理</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">多核CPU、GPU加速计算</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">大内存容量</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持大规模数据处理</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用领域</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">科学研究</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">物理、化学、生物等学科计算</p>
                    </div>
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">工程仿真</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">有限元分析、流体力学计算</p>
                    </div>
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">天气预报</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">数值天气预报、气候模拟</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 商业数据处理计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">商业数据处理计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Business Data Processing Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高可靠性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">7×24小时连续运行</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">大容量存储</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持TB级数据存储</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">多用户支持</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持数百个并发用户</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用领域</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">银行系统</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">交易处理、账户管理</p>
                    </div>
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">企业ERP</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">资源规划、供应链管理</p>
                    </div>
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">政府机构</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">行政管理、公共服务</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 个人计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Home className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">个人计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Personal Computer (PC)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">通用性强</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持多种应用软件</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">价格适中</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">个人用户可承受</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">易于使用</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">图形用户界面友好</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用领域</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">办公应用</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">文档处理、表格计算</p>
                    </div>
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">网络浏览</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">网页浏览、在线交流</p>
                    </div>
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">多媒体</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">音视频播放、图像处理</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 游戏计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Gamepad2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">游戏计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Gaming Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高性能显卡</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持3D图形渲染</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高刷新率</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">144Hz以上显示器</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">散热系统</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">高效散热设计</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用领域</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">电子游戏</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3D游戏、VR游戏</p>
                    </div>
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">电竞比赛</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">职业电竞、直播</p>
                    </div>
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">内容创作</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">游戏录制、视频编辑</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 嵌入式计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Cpu className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">嵌入式计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Embedded Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">体积小巧</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">集成度高，功耗低</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">实时性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">响应速度快，可靠性高</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">专用性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">针对特定应用优化</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用领域</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">汽车电子</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">发动机控制、导航系统</p>
                    </div>
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">家电控制</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">智能家电、物联网设备</p>
                    </div>
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">工业控制</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">PLC、机器人控制</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 移动计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Smartphone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">移动计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Mobile Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">便携性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">体积小，重量轻</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">电池续航</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">长时间使用，低功耗</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">无线连接</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">WiFi、蓝牙、移动网络</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用领域</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-cyan-50/30 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">智能手机</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">通讯、娱乐、办公</p>
                    </div>
                    <div className="glass-liquid bg-cyan-50/30 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">平板电脑</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">阅读、绘画、视频</p>
                    </div>
                    <div className="glass-liquid bg-cyan-50/30 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">笔记本电脑</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">移动办公、学习</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 导航按钮 */}
          <section className="flex justify-between items-center">
            <Link href="/computer-organization/computer-development">
              <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  返回上级
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </Link>
            
            <Link href="/computer-organization/computer-development/by-scale">
              <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                  下一章：按规模分类
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
