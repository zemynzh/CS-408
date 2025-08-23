# 部署指南

本文档将指导您如何将 CS-408 可视化平台部署到不同的平台。

## 🚀 部署选项

### 1. Vercel (推荐)

Vercel 是 Next.js 官方推荐的部署平台，提供最佳的 Next.js 支持。

#### 步骤：

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel
```

4. **自动部署**
- 连接 GitHub 仓库
- 每次 push 到 main 分支时自动部署
- 支持预览部署 (PR)

#### 环境变量配置：
```bash
# 在 Vercel 控制台设置
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 2. Netlify

Netlify 提供静态网站托管服务。

#### 步骤：

1. **构建项目**
```bash
npm run build
```

2. **配置 netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

3. **部署**
- 拖拽 `.next` 文件夹到 Netlify
- 或连接 GitHub 仓库自动部署

### 3. 传统服务器

#### 使用 PM2 部署：

1. **安装 PM2**
```bash
npm install -g pm2
```

2. **构建项目**
```bash
npm run build
```

3. **启动应用**
```bash
pm2 start npm --name "cs408-app" -- start
```

4. **PM2 管理命令**
```bash
pm2 list                    # 查看进程
pm2 restart cs408-app       # 重启应用
pm2 stop cs408-app          # 停止应用
pm2 logs cs408-app          # 查看日志
```

#### 使用 Docker 部署：

1. **创建 Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **构建镜像**
```bash
docker build -t cs408-app .
```

3. **运行容器**
```bash
docker run -p 3000:3000 cs408-app
```

### 4. 静态导出 (可选)

如果需要静态网站托管：

1. **修改 next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

2. **构建静态文件**
```bash
npm run build
```

3. **部署到静态托管服务**
- GitHub Pages
- Surge.sh
- Firebase Hosting

## 🔧 环境配置

### 生产环境变量

创建 `.env.production` 文件：

```env
# 应用配置
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=CS-408 Visualization Platform

# 分析工具 (可选)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_UMAMI_ID=your-umami-id

# 性能监控 (可选)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### 性能优化

1. **启用压缩**
```javascript
// next.config.js
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false
}
```

2. **CDN 配置**
- 配置静态资源 CDN
- 启用 gzip 压缩
- 设置缓存策略

## 📊 监控和分析

### 1. 性能监控

#### 使用 Vercel Analytics：
```bash
npm install @vercel/analytics
```

```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### 使用 Google Analytics：
```javascript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 2. 错误监控

#### 使用 Sentry：
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## 🔒 安全配置

### 1. 安全头设置

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### 2. CSP 配置

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              connect-src 'self' https://www.google-analytics.com;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ]
  },
}
```

## 📈 性能优化

### 1. 图片优化

```javascript
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### 2. 代码分割

```javascript
// 动态导入组件
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
```

### 3. 缓存策略

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 🚨 故障排除

### 常见问题

1. **构建失败**
```bash
# 清理缓存
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

2. **内存不足**
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

3. **端口冲突**
```bash
# 指定端口
npm run dev -- -p 3001
```

### 日志查看

```bash
# Vercel
vercel logs

# PM2
pm2 logs cs408-app

# Docker
docker logs container-name
```

## 📞 支持

如果在部署过程中遇到问题，请：

1. 查看 [Next.js 部署文档](https://nextjs.org/docs/deployment)
2. 检查 [Vercel 文档](https://vercel.com/docs)
3. 提交 [GitHub Issue](https://github.com/your-username/cs408-visualization/issues)

---

**祝您部署顺利！** 🎉
