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
  Brain,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function VonNeumannPage() {
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
              <span className="text-blue-600 dark:text-blue-400 font-medium">冯·诺依曼体系结构</span>
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
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                  冯·诺依曼体系结构
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  现代计算机的理论基础，存储程序原理的经典架构
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>预计学习时间: 3小时</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>知识点: 5个</span>
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
                    冯·诺依曼体系结构是由美籍匈牙利数学家约翰·冯·诺依曼在1945年提出的计算机设计理论。
                    这一理论为现代计算机的设计奠定了理论基础，至今仍是计算机系统设计的核心思想。
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    该体系结构的主要特点是采用存储程序原理，将程序和数据存储在同一个存储器中，
                    通过指令的自动执行来实现计算机的功能。
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">存储程序原理</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">程序和数据统一存储，自动执行</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">五大功能部件</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">运算器、控制器、存储器、输入设备、输出设备</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">二进制编码</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">采用二进制表示数据和指令</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 存储程序原理 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">存储程序原理</h2>
                  <p className="text-gray-600 dark:text-gray-400">计算机设计的核心思想</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">基本原理</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">程序存储</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">程序以二进制形式存储在存储器中</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">数据存储</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">数据也以二进制形式存储在存储器中</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">统一存储</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">程序和数据共享同一个存储空间</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">自动执行</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">计算机自动逐条执行存储的程序指令</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">历史意义</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">革命性突破</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">改变了计算机的设计理念</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        从专用计算器到通用计算机的转变
                      </div>
                    </div>
                    <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">标准化设计</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">为计算机标准化奠定了基础</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        所有现代计算机都遵循这一架构
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">优势总结</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p><strong>灵活性：</strong>通过改变程序实现不同功能</p>
                    <p><strong>通用性：</strong>一台计算机可以执行各种任务</p>
                  </div>
                  <div>
                    <p><strong>可编程性：</strong>程序可以修改和升级</p>
                    <p><strong>效率性：</strong>自动执行，无需人工干预</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 五大功能部件 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">五大功能部件</h2>
                  <p className="text-gray-600 dark:text-gray-400">计算机系统的核心组成部分</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 运算器 */}
                <div className="glass-liquid bg-green-50/30 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">运算器 (ALU)</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    执行算术运算和逻辑运算的核心部件
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <div>• 算术运算：加、减、乘、除</div>
                    <div>• 逻辑运算：与、或、非、异或</div>
                    <div>• 移位操作：左移、右移</div>
                  </div>
                </div>
                
                {/* 控制器 */}
                <div className="glass-liquid bg-blue-50/30 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">控制器 (CU)</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    控制计算机各部件协调工作的指挥中心
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <div>• 指令译码：解析指令含义</div>
                    <div>• 时序控制：产生控制信号</div>
                    <div>• 协调工作：控制各部件同步</div>
                  </div>
                </div>
                
                {/* 存储器 */}
                <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30">
                                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                     <HardDrive className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                   </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">存储器 (Memory)</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    存储程序、数据和中间结果
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <div>• 主存储器：RAM、ROM</div>
                    <div>• 高速缓存：Cache</div>
                    <div>• 辅助存储器：硬盘、SSD</div>
                  </div>
                </div>
                
                {/* 输入设备 */}
                <div className="glass-liquid bg-orange-50/30 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Monitor className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">输入设备</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    将外部信息输入到计算机中
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <div>• 键盘：文字输入</div>
                    <div>• 鼠标：图形界面操作</div>
                    <div>• 扫描仪：图像输入</div>
                  </div>
                </div>
                
                {/* 输出设备 */}
                <div className="glass-liquid bg-red-50/30 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200/30 dark:border-red-700/30">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Monitor className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">输出设备</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    将计算机处理结果输出给用户
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <div>• 显示器：图形显示</div>
                    <div>• 打印机：文档输出</div>
                    <div>• 音箱：音频输出</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 工作流程 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                工作流程
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">指令执行周期</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">取指 (Fetch)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">从存储器中取出下一条指令</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">译码 (Decode)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">解析指令的操作码和操作数</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">执行 (Execute)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">执行指令规定的操作</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">写回 (Write Back)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">将执行结果写回存储器</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">数据流动</h3>
                  <div className="space-y-3">
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">指令流</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">程序指令在存储器中的存储和读取</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        存储器 → 控制器 → 运算器
                      </div>
                    </div>
                    <div className="glass-liquid bg-purple-50/30 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">数据流</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">数据在各部件之间的传输和处理</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        输入设备 → 存储器 → 运算器 → 输出设备
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 现代发展 */}
          <section className="mb-8">
            <div className="glass-liquid bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/10 dark:shadow-black/30">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
                现代发展
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-liquid bg-yellow-50/50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200/30 dark:border-yellow-700/30">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">流水线技术</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    将指令执行过程分解为多个阶段，提高并行度
                  </p>
                </div>
                
                <div className="glass-liquid bg-cyan-50/50 dark:bg-cyan-900/20 rounded-2xl p-6 border border-cyan-200/30 dark:border-cyan-700/30">
                                     <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                     <HardDrive className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                   </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">缓存技术</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    多级缓存系统，平衡速度和容量
                  </p>
                </div>
                
                <div className="glass-liquid bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-700/30">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Network className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">多核技术</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    多个处理器核心并行工作，提高性能
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
            
            <Link href="/computer-organization/data-representation">
              <button className="glass-liquid bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center text-gray-800 dark:text-white">
                  下一章：数据的表示和运算
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
