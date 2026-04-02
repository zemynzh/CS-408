import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 当前滚动到视口内的题号，供右侧题号导航高亮使用
  const activeQuestionId = ref<number | null>(null)

  function setActiveQuestion(id: number | null) {
    activeQuestionId.value = id
  }

  return { activeQuestionId, setActiveQuestion }
})
