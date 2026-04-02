// Markdown 加载与解析（待实现）
export function useMarkdown() {
  async function loadMarkdown(_path: string): Promise<string> {
    // TODO: 使用 import.meta.glob 或 fetch 加载 MD 文件并用 marked 解析
    return ''
  }

  return { loadMarkdown }
}
