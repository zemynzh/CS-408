// 顶部导航模块配置
export type ModuleKey = 'data-structure' | 'computer-organization' | 'operating-system' | 'computer-network' | 'past-exams'

export interface Module {
  key: ModuleKey
  label: string
  type: 'knowledge' | 'exam'
}

export const MODULES: Module[] = [
  { key: 'data-structure', label: '数据结构', type: 'knowledge' },
  { key: 'computer-organization', label: '计算机组成原理', type: 'knowledge' },
  { key: 'operating-system', label: '操作系统', type: 'knowledge' },
  { key: 'computer-network', label: '计算机网络', type: 'knowledge' },
  { key: 'past-exams', label: '历年真题', type: 'exam' },
]
