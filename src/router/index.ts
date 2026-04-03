import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import KnowledgeView from '@/views/KnowledgeView.vue'
import ExamView from '@/views/ExamView.vue'
import AlgorithmsView from '@/views/AlgorithmsView.vue'

const router = createRouter({
  // 使用 hash 模式，兼容 Cloudflare Pages 静态部署
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // 知识点模块：/knowledge/:module/:chapterId?
      path: '/knowledge/:module/:chapterId?',
      name: 'knowledge',
      component: KnowledgeView,
    },
    {
      // 历年真题：/exam/:year?
      path: '/exam/:year?',
      name: 'exam',
      component: ExamView,
    },
    {
      path: '/algorithms/:subject?/:algoId?',
      name: 'algorithms',
      component: AlgorithmsView,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
