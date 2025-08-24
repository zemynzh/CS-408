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
  Server
} from 'lucide-react'
import Link from 'next/link'

export default function ComputerGenerationsPage() {
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
              <span className="text-blue-600 dark:text-blue-400 font-medium">计算机代际</span>
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
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  计算机代际
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  从电子管到大规模集成电路，探索计算机技术的四代演进历程
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 2小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>知识点: 4代</span>
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
                    计算机代际是根据计算机所使用的主要电子器件来划分的。从1946年第一台电子计算机ENIAC诞生至今，
                    计算机技术已经经历了四代的发展，每一代都有其标志性的技术特征和代表性产品。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    代际的划分主要基于：核心器件、制造工艺、性能指标、应用领域等方面的重大变革。
                    每一代计算机都在性能、体积、功耗、可靠性等方面有显著提升。
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">技术演进清晰</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">从电子管到大规模集成电路的技术发展脉络</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">性能提升显著</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">每一代都在速度、容量、可靠性方面有突破</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">应用领域扩展</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">从科学计算到个人计算机的普及应用</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 第一代计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Lightning className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">第一代计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">电子管时代 (1946-1958)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">技术特征</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">核心器件</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">电子管（真空管）</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">存储方式</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">磁鼓、磁芯存储器</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">编程语言</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">机器语言、汇编语言</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">应用领域</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">科学计算、军事应用</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">代表机型</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">ENIAC (1946)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">世界上第一台通用电子计算机</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 18000个电子管</span>
                        <span>• 150kW功耗</span>
                        <span>• 5000次/秒运算</span>
                      </div>
                    </div>
                    <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-xl p-4 border border-red-200/30 dark:border-red-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">UNIVAC I (1951)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">第一台商用电子计算机</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 5200个电子管</span>
                        <span>• 磁鼓存储</span>
                        <span>• 商业数据处理</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl border border-red-200/30 dark:border-red-700/30">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">特点总结</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p><strong>优点：</strong>计算速度快，可靠性高</p>
                    <p><strong>缺点：</strong>体积庞大，功耗极高，价格昂贵</p>
                  </div>
                  <div>
                    <p><strong>影响：</strong>奠定了电子计算机的基础</p>
                    <p><strong>意义：</strong>开启了计算机时代</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 第二代计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Cpu className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">第二代计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">晶体管时代 (1958-1964)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">技术特征</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">核心器件</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">晶体管</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">存储方式</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">磁芯存储器、磁带</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">编程语言</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">高级语言（FORTRAN、COBOL）</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">应用领域</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">科学计算、商业数据处理</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">代表机型</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">IBM 7090 (1959)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">大型科学计算计算机</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 50000个晶体管</span>
                        <span>• 磁芯存储</span>
                        <span>• 229000次/秒运算</span>
                      </div>
                    </div>
                    <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">DEC PDP-1 (1960)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">第一台小型计算机</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 2700个晶体管</span>
                        <span>• 交互式计算</span>
                        <span>• 图形显示</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50/50 dark:bg-orange-900/20 rounded-xl border border-orange-200/30 dark:border-orange-700/30">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">特点总结</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p><strong>优点：</strong>体积小，功耗低，可靠性高</p>
                    <p><strong>缺点：</strong>仍较昂贵，维护复杂</p>
                  </div>
                  <div>
                    <p><strong>影响：</strong>推动了计算机的普及应用</p>
                    <p><strong>意义：</strong>开启了小型计算机时代</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 第三代计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">第三代计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">集成电路时代 (1964-1971)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">技术特征</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">核心器件</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">中小规模集成电路</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">存储方式</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">半导体存储器</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">操作系统</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">分时操作系统</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">应用领域</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">多用户、多任务处理</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">代表机型</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">IBM System/360 (1964)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">大型机系列的开端</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 兼容性设计</span>
                        <span>• 虚拟存储</span>
                        <span>• 多道程序</span>
                      </div>
                    </div>
                    <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">DEC PDP-8 (1965)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">第一台成功的微型计算机</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 12000美元</span>
                        <span>• 12位架构</span>
                        <span>• 实验室应用</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-200/30 dark:border-green-700/30">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">特点总结</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p><strong>优点：</strong>性能大幅提升，成本降低</p>
                    <p><strong>缺点：</strong>仍主要用于机构</p>
                  </div>
                  <div>
                    <p><strong>影响：</strong>推动了软件产业的发展</p>
                    <p><strong>意义：</strong>为个人计算机奠定基础</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 第四代计算机 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">第四代计算机</h2>
                  <p className="text-gray-600 dark:text-gray-400">大规模集成电路时代 (1971-至今)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">技术特征</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">核心器件</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">大规模、超大规模集成电路</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">存储方式</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">半导体存储器、硬盘</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">操作系统</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">图形用户界面、网络操作系统</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">应用领域</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">个人计算机、网络、移动设备</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">代表机型</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Intel 4004 (1971)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">第一颗微处理器</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• 2300个晶体管</span>
                        <span>• 10μm工艺</span>
                        <span>• 740kHz主频</span>
                      </div>
                    </div>
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">IBM PC (1981)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">个人计算机标准</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>• Intel 8088</span>
                        <span>• MS-DOS</span>
                        <span>• 开放架构</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">特点总结</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p><strong>优点：</strong>性能极高，体积小，价格低</p>
                    <p><strong>缺点：</strong>散热问题，功耗管理</p>
                  </div>
                  <div>
                    <p><strong>影响：</strong>推动了信息革命</p>
                    <p><strong>意义：</strong>计算机进入千家万户</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 发展趋势 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                发展趋势
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-liquid bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">人工智能</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    专用AI芯片、神经网络处理器、量子计算等新技术的发展
                  </p>
                </div>
                
                <div className="glass-liquid bg-cyan-50/50 dark:bg-cyan-900/20 rounded-2xl p-6 border border-cyan-200/30 dark:border-cyan-700/30">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Network className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">云计算</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    分布式计算、边缘计算、5G网络等基础设施的完善
                  </p>
                </div>
                
                <div className="glass-liquid bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">移动计算</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    智能手机、平板电脑、可穿戴设备等移动终端的普及
                  </p>
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
            
            <Link href="/computer-organization/computer-development/von-neumann">
              <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                  下一章：冯·诺依曼体系结构
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
