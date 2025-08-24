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
  Stethoscope,
  Laptop,
  Tablet,
  Smartphone as Phone,
  Server as Mainframe,
  Cloud,
  Database as Supercomputer
} from 'lucide-react'
import Link from 'next/link'

export default function ComputerByScalePage() {
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
              <span className="text-blue-600 dark:text-blue-400 font-medium">按规模分类</span>
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
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  计算机按规模分类
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  从微型计算机到超级计算机，探索不同规模计算机的特点和应用
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 2小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>分类: 6大类</span>
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
                    计算机按规模分类是根据其处理能力、存储容量、价格等因素进行的分类方式。不同规模的计算机
                    适用于不同的应用场景，从个人使用到大型科学计算都有相应的解决方案。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    这种分类方式有助于理解计算机系统的层次结构，以及如何根据实际需求选择合适的计算机规模。
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">处理能力</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CPU性能、内存容量</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">存储容量</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">硬盘、内存大小</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">价格成本</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">购置和维护成本</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 微型计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Laptop className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">微型计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Microcomputer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">单用户系统</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">一次只能供一个用户使用</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">价格低廉</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">个人用户可承受的价格</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">体积小巧</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">占用空间小，便于携带</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">典型产品</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">个人电脑</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">台式机、笔记本电脑</p>
                    </div>
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">平板电脑</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">iPad、Android平板</p>
                    </div>
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">智能手机</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">iPhone、Android手机</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 小型计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">小型计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Minicomputer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">多用户系统</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持多个用户同时使用</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">中等性能</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">介于微型机和大型机之间</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">部门级应用</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">适合中小型企业使用</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用场景</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">企业服务器</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">文件服务器、应用服务器</p>
                    </div>
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">数据库服务器</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">中小型数据库管理</p>
                    </div>
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">网络设备</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">路由器、交换机控制</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 中型计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">中型计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Midrange Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高性能处理</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">多核处理器，大内存</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高可靠性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">冗余设计，故障恢复</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">企业级应用</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">适合中型企业核心业务</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用场景</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">ERP系统</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">企业资源规划系统</p>
                    </div>
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">CRM系统</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">客户关系管理系统</p>
                    </div>
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">数据中心</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">云计算基础设施</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 大型计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Mainframe className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">大型计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Mainframe Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">极高可靠性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">99.999%可用性</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">大规模处理</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">支持数千个并发用户</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高安全性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">企业级安全防护</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用场景</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">银行系统</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">核心交易处理系统</p>
                    </div>
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">航空公司</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">订票、调度系统</p>
                    </div>
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">政府机构</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">大型数据处理中心</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 超级计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Supercomputer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">超级计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Supercomputer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">极高性能</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">每秒万亿次浮点运算</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">并行处理</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">数万个处理器核心</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">专用计算</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">针对特定科学计算优化</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用场景</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">气象预报</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">数值天气预报模型</p>
                    </div>
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">药物研发</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">分子动力学模拟</p>
                    </div>
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">核物理研究</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">粒子物理模拟</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 集群计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Cloud className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">集群计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">Cluster Computer</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">特点</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">分布式处理</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">多台计算机协同工作</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">高可用性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">单点故障不影响整体</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">可扩展性</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">可根据需求增减节点</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">应用场景</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-cyan-50/30 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">云计算平台</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AWS、Azure、Google Cloud</p>
                    </div>
                    <div className="glass-liquid bg-cyan-50/30 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">大数据处理</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hadoop、Spark集群</p>
                    </div>
                    <div className="glass-liquid bg-cyan-50/30 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-200/30 dark:border-cyan-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Web服务</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">负载均衡、高并发处理</p>
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
            
            <Link href="/computer-organization/computer-development/generations">
              <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                  下一章：计算机发展代际
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
