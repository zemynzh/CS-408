'use client'

import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState, useRef } from 'react'

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number, link: string}>>([])
  const rippleId = useRef(0)

  const handleLinkClick = (linkName: string, event: React.MouseEvent) => {
    setActiveLink(linkName)
    
    // 创建液体波纹效果
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const newRipple = {
      id: rippleId.current++,
      x,
      y,
      link: linkName
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // 清理波纹和重置状态
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      setActiveLink(null)
    }, 600)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-black/20">
      {/* 玻璃液态背景层 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5"></div>
      
      {/* 顶部高光效果 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-gray-400/40 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 左侧 Logo 和标题 */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <GraduationCap className="relative w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            CS-408考研助手
          </span>
        </div>
        
        {/* 右侧导航链接和主题切换 */}
        <div className="flex items-center space-x-8">
          <Link 
            href="/algorithm" 
            onClick={(e) => handleLinkClick('algorithm', e)}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-xl px-4 py-2 select-none"
          >
            {/* 液体背景层 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* 液体波纹效果 */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/30 to-blue-400/20 rounded-xl transform scale-0 transition-transform duration-600 ease-out ${
              activeLink === 'algorithm' ? 'scale-100' : ''
            }`}></div>
            
            {/* 液体流动动画 */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl transform -translate-x-full transition-transform duration-600 ease-out ${
              activeLink === 'algorithm' ? 'translate-x-full' : ''
            }`}></div>
            
            {/* 动态波纹效果 */}
            {ripples.filter(r => r.link === 'algorithm').map(ripple => (
              <div
                key={ripple.id}
                className="absolute w-2 h-2 bg-blue-400/60 rounded-full liquid-ripple pointer-events-none"
                style={{
                  left: ripple.x - 4,
                  top: ripple.y - 4,
                }}
              />
            ))}
            
            <span className="relative z-10 font-medium">算法可视化</span>
          </Link>
          
          <Link 
            href="/practice" 
            onClick={(e) => handleLinkClick('practice', e)}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-xl px-4 py-2 select-none"
          >
            {/* 液体背景层 */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* 液体波纹效果 */}
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-400/20 via-purple-500/30 to-purple-400/20 rounded-xl transform scale-0 transition-transform duration-600 ease-out ${
              activeLink === 'practice' ? 'scale-100' : ''
            }`}></div>
            
            {/* 液体流动动画 */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl transform -translate-x-full transition-transform duration-600 ease-out ${
              activeLink === 'practice' ? 'translate-x-full' : ''
            }`}></div>
            
            {/* 动态波纹效果 */}
            {ripples.filter(r => r.link === 'practice').map(ripple => (
              <div
                key={ripple.id}
                className="absolute w-2 h-2 bg-purple-400/60 rounded-full liquid-ripple pointer-events-none"
                style={{
                  left: ripple.x - 4,
                  top: ripple.y - 4,
                }}
              />
            ))}
            
            <span className="relative z-10 font-medium">练习测试</span>
          </Link>
          
          <Link 
            href="/mindmap" 
            onClick={(e) => handleLinkClick('mindmap', e)}
            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-xl px-4 py-2 select-none"
          >
            {/* 液体背景层 */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* 液体波纹效果 */}
            <div className={`absolute inset-0 bg-gradient-to-r from-pink-400/20 via-pink-500/30 to-pink-400/20 rounded-xl transform scale-0 transition-transform duration-600 ease-out ${
              activeLink === 'mindmap' ? 'scale-100' : ''
            }`}></div>
            
            {/* 液体流动动画 */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl transform -translate-x-full transition-transform duration-600 ease-out ${
              activeLink === 'mindmap' ? 'translate-x-full' : ''
            }`}></div>
            
            {/* 动态波纹效果 */}
            {ripples.filter(r => r.link === 'mindmap').map(ripple => (
              <div
                key={ripple.id}
                className="absolute w-2 h-2 bg-pink-400/60 rounded-full liquid-ripple pointer-events-none"
                style={{
                  left: ripple.x - 4,
                  top: ripple.y - 4,
                }}
              />
            ))}
            
            <span className="relative z-10 font-medium">思维导图</span>
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg blur-sm"></div>
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}