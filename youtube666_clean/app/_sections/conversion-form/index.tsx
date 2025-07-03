"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Clock, Mail } from "lucide-react"
import { useState } from "react"

export function ConversionForm() {
  const [url, setUrl] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, email }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setUrl("");
        setEmail("");
      } else {
        alert(data.error || '提交失败，请重试');
      }
    } catch (error) {
      alert('网络错误，请重试');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">开始转换您的第一个视频</h2>
          <p className="text-xl text-blue-100 mb-12">让阅读替代观看，让中文承载英文的信息密度</p>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="youtube-url" className="text-left block">
                    YouTube视频链接
                  </Label>
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="h-12"
                  />
                  <p className="text-sm text-gray-500">支持任何有英文字幕的视频</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-left block">
                    接收邮箱
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                  <p className="text-sm text-gray-500">转换完成后将发送预览版到此邮箱</p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    处理中...
                  </>
                ) : (
                  <>
                    开始转换
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                24小时内发送预览版
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-green-500" />
                您看情况付费或者不付费
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
