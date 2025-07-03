"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Play, FileText, Clock, Zap } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <Zap className="mr-2 h-4 w-4" />
              信息获取效率工具
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
                <span className="block leading-relaxed">YouTube英文视频</span>
                <span className="block text-blue-600 leading-relaxed">→ 高质量中文长文</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">英语是世界最好的信息源，阅读是最快的吸收信息方式</p>

              <p className="text-lg text-gray-500">一行命令，将YouTube英文视频转换为可收藏的中文深度内容</p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                阅读速度是观看的3-5倍
              </div>
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-green-500" />
                支持检索、标记、引用
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="粘贴YouTube视频链接..." className="flex-1 h-12 text-base" />
                <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  开始转换
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">支持TED、播客、技术分享、纪录片等所有类型的英文视频</p>
            </div>
          </div>

          {/* Right Column - Visual Demo */}
          <div className="relative">
            <div className="space-y-6">
              {/* YouTube Video Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Play className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-gray-900">YouTube视频 (60分钟)</span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image src="/tech-video-thumbnail.png" alt="React 18 技术分享视频" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-red-600 p-3">
                      <Play className="h-6 w-6 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">React 18 新特性深度解析 - 并发渲染与Suspense</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              {/* Article Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-gray-900">中文深度长文 (5分钟阅读)</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">React 18 并发特性完全指南</h3>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="pt-2 text-sm text-gray-600">
                    <p className="font-medium">核心要点：</p>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• 并发渲染机制与时间切片原理</li>
                      <li>• Suspense边界的最佳实践</li>
                      <li>• useTransition与useDeferredValue应用</li>
                      <li>• 性能优化策略与实际案例</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
