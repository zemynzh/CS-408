import { ref, watch } from 'vue'

const isDark = ref<boolean>(false)

// 初始化：读取 localStorage 或系统偏好
function initTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') {
    isDark.value = true
  } else if (stored === 'light') {
    isDark.value = false
  } else {
    // 跟随系统
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
}

// 监听变化自动持久化
watch(isDark, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light')
  applyTheme(val)
})

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setTheme(dark: boolean) {
    isDark.value = dark
  }

  return { isDark, toggleTheme, setTheme, initTheme }
}
