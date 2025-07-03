import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "YouTube 英文视频 → 中文深度长文 | 信息获取效率工具",
  description:
    "英语是世界最好的信息源，阅读是最快的吸收信息方式。一行命令，将 YouTube 英文视频转换为可收藏的中文深度内容。",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased font-sans">
        {/* ----  主题切换 (浅/深色) ---- */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* ---------- HEADER ---------- */}
          <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-sm font-bold text-white">YT</span>
                </div>
                <span className="text-xl font-bold">视频转文章</span>
              </Link>

              <nav className="hidden gap-8 md:flex">
                <Link className="text-gray-600 transition-colors hover:text-gray-900" href="#features">
                  功能特点
                </Link>
                <Link className="text-gray-600 transition-colors hover:text-gray-900" href="#pricing">
                  价格
                </Link>
                <Link className="text-gray-600 transition-colors hover:text-gray-900" href="#contact">
                  联系我们
                </Link>
              </nav>
            </div>
          </header>

          {/* ---------- MAIN ---------- */}
          <main className="min-h-[calc(100svh-4rem)]">{children}</main>

          {/* ---------- FOOTER ---------- */}
          <footer className="border-t border-gray-200 py-12">
            <div className="container mx-auto flex flex-col items-center justify-between space-y-6 px-6 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
                  <span className="text-xs font-bold text-white">YT</span>
                </div>
                <span className="text-lg font-semibold">视频转文章</span>
              </div>

              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} 视频转文章工具 · 让阅读替代观看，让中文承载英文的信息密度
              </p>

              <div className="flex gap-6 text-sm">
                <Link href="#privacy" className="text-gray-600 hover:text-gray-900">
                  隐私政策
                </Link>
                <Link href="#terms" className="text-gray-600 hover:text-gray-900">
                  服务条款
                </Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
