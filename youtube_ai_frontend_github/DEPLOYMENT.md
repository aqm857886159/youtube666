# YouTube AI 前端部署指南

## 部署到 Vercel

### 步骤1：上传到 GitHub
1. 将此文件夹中的所有文件上传到你的 GitHub 仓库
2. 确保包含以下关键文件：
   - `package.json`
   - `next.config.js`
   - `vercel.json`
   - 所有 `pages/` 目录下的文件

### 步骤2：连接 Vercel
1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测到这是一个 Next.js 项目

### 步骤3：配置环境变量（可选）
如果需要设置环境变量，在 Vercel 项目设置中添加：
- 任何需要的 API 密钥
- 数据库连接字符串等

### 步骤4：部署
1. 点击 "Deploy" 按钮
2. 等待部署完成
3. 获取你的部署URL

## 项目功能
- 📝 YouTube 链接提交表单
- 🔐 管理员后台（密码：youtube2025）
- 📊 数据导出功能
- 📱 响应式设计
- 🛡️ 基础安全防护

## 管理员访问
访问 `/admin-youtube-2373` 路径进入管理后台

## 数据存储
项目使用 CSV 文件存储数据，部署后数据将存储在 Vercel 的文件系统中。

## 技术栈
- Next.js 14
- React 18
- Zod 验证
- CSS-in-JS 样式