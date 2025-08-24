# CS-408 计算机考研知识点可视化平台

<div align="center">

![CS-408 Logo](https://img.shields.io/badge/CS--408-计算机考研-blue?style=for-the-badge&logo=graduation-cap)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**🎓 系统性学习计算机考研408四大核心科目的可视化平台**

[在线预览](#) • [功能特性](#功能特性) • [技术栈](#技术栈) • [快速开始](#快速开始)

</div>

---

<div align="center">

## 📖 项目简介

</div>

CS-408 计算机考研知识点可视化平台是一个专为计算机考研408科目设计的现代化学习平台。通过直观的可视化界面、交互式算法演示和系统性的知识点组织，帮助考生更好地理解和掌握计算机组成原理、操作系统、计算机网络、数据结构四大核心科目。

<div align="center">

### 🎯 核心价值

</div>

- **可视化学习** - 通过动态演示让抽象概念变得直观易懂
- **系统性组织** - 完整的知识点体系，覆盖408考试大纲
- **交互式体验** - 支持实时操作和个性化学习路径
- **现代化设计** - 采用最新的UI/UX设计理念，提供优秀的学习体验

<div align="center">

## ✨ 功能特性

</div>

<div align="center">

### 🧠 思维导图

</div>

- **交互式思维导图** - 可视化展示知识点之间的关联关系
- **动态缩放** - 支持多级缩放和视图切换
- **详细说明** - 每个节点都包含详细的知识点说明
- **实时交互** - 点击节点查看详细信息，支持展开/收起

<div align="center">

### 📊 算法可视化

</div>

- **动态演示** - 实时展示算法执行过程
- **多种算法** - 包含排序、查找、图论等经典算法
- **交互控制** - 支持播放、暂停、重置、调速等操作
- **性能分析** - 实时显示算法复杂度、比较次数、交换次数等指标

<div align="center">

### 📚 科目学习

</div>

- **四大核心科目**
  - 🖥️ **计算机组成原理** - CPU、内存、I/O系统等硬件组成
  - 💻 **操作系统** - 进程管理、内存管理、文件系统等
  - 🌐 **计算机网络** - 网络协议、体系结构、通信原理
  - 📊 **数据结构** - 线性结构、树形结构、图形结构等

<div align="center">

### 🎨 用户体验

</div>

- **响应式设计** - 完美适配桌面端和移动端
- **深色模式** - 支持明暗主题切换，保护视力
- **液体动画** - 独特的玻璃液态UI效果
- **流畅交互** - 60fps动画，丝滑的用户体验

<div align="center">

## 🛠️ 技术栈

</div>

<div align="center">

### 前端框架

</div>

- **Next.js 14.0.0** - React全栈框架，支持SSR和SSG
- **React 18.2.0** - 现代化的用户界面库
- **TypeScript 5.0.0** - 类型安全的JavaScript超集

<div align="center">

### 样式与UI

</div>

- **Tailwind CSS 3.3.0** - 原子化CSS框架
- **Lucide React** - 现代化的图标库
- **Framer Motion** - 强大的动画库

<div align="center">

### 数据处理

</div>

- **D3.js 7.8.0** - 数据可视化库
- **Zustand 4.4.0** - 轻量级状态管理
- **React Markdown** - Markdown渲染组件

<div align="center">

### 开发工具

</div>

- **ESLint** - 代码质量检查
- **PostCSS** - CSS后处理器
- **Autoprefixer** - CSS前缀自动添加

<div align="center">

## 🚀 快速开始

</div>

<div align="center">

### 环境要求

</div>

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

<div align="center">

### 安装步骤

</div>

1. **克隆项目**
```bash
git clone https://github.com/your-username/cs408-visualization.git
cd cs408-visualization
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

4. **打开浏览器**
访问 [http://localhost:3000](http://localhost:3000) 查看应用

<div align="center">

### 构建生产版本

</div>

```bash
npm run build
npm start
```

<div align="center">

## 📁 项目结构

</div>

```
CS-408/
├── app/                          # Next.js App Router 页面
│   ├── algorithm/                # 算法可视化页面
│   │   ├── page.tsx             # 算法主页
│   │   └── visualizations/      # 具体算法可视化页面
│   │       ├── bubble-sort/     # 冒泡排序
│   │       ├── insertion-sort/  # 插入排序
│   │       └── selection-sort/  # 选择排序
│   ├── computer-network/        # 计算机网络页面
│   ├── computer-organization/   # 计算机组成原理页面
│   ├── data-structure/          # 数据结构页面
│   ├── mindmap/                 # 思维导图页面
│   ├── operating-system/        # 操作系统页面
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
├── components/                   # React组件
│   ├── algorithm/               # 算法相关组件
│   │   ├── BubbleSortVisualization.tsx
│   │   ├── InsertionSortVisualization.tsx
│   │   └── SelectionSortVisualization.tsx
│   ├── AlgorithmSidebar.tsx     # 算法侧边栏
│   ├── ComputerNetworkSidebar.tsx
│   ├── ComputerOrganizationSidebar.tsx
│   ├── DataStructureSidebar.tsx
│   ├── OperatingSystemSidebar.tsx
│   ├── Navbar.tsx               # 导航栏
│   ├── Footer.tsx               # 页脚
│   └── ThemeToggle.tsx          # 主题切换
├── lib/                         # 工具库
│   └── utils.ts                 # 工具函数
├── public/                      # 静态资源
├── package.json                 # 项目配置
├── tailwind.config.js           # Tailwind配置
├── tsconfig.json                # TypeScript配置
└── README.md                    # 项目说明
```

<div align="center">

## 🎨 设计特色

</div>

<div align="center">

### 液体动画效果

</div>

项目采用独特的玻璃液态UI设计，包含：
- **液体波纹** - 点击时的波纹扩散效果
- **液体流动** - 悬停时的流动动画
- **玻璃模糊** - 毛玻璃背景效果
- **渐变色彩** - 丰富的色彩渐变

<div align="center">

### 响应式布局

</div>

- **移动优先** - 优先适配移动设备
- **断点设计** - 支持多种屏幕尺寸
- **弹性布局** - 使用Flexbox和Grid布局
- **自适应内容** - 内容根据屏幕大小自动调整

<div align="center">

## 📱 浏览器支持

</div>

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

<div align="center">

## 🤝 贡献指南

</div>

我们欢迎所有形式的贡献！

<div align="center">

### 如何贡献

</div>

1. **Fork 项目**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

<div align="center">

### 开发规范

</div>

- 使用 TypeScript 进行开发
- 遵循 ESLint 代码规范
- 编写清晰的组件文档
- 保持代码简洁和可维护性

<div align="center">

## 📄 许可证

</div>

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

<div align="center">

## 🙏 致谢

</div>

- [Next.js](https://nextjs.org/) - 优秀的React框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化CSS框架
- [Lucide](https://lucide.dev/) - 现代化图标库
- [Framer Motion](https://www.framer.com/motion/) - 动画库

<div align="center">

## 📞 联系我们

</div>

- **项目主页**: [GitHub Repository](#)
- **问题反馈**: [Issues](#)
- **邮箱**: zemynzh@gmail.com

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个星标！**

Made with ❤️ for CS-408 students

</div>
