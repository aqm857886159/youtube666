import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">开发者友好定价</h2>
          <p className="text-xl text-gray-600">平均每分钟视频内容成本不到0.1元，比买一杯咖啡便宜，比看视频高效10倍</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* 预览版 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">预览版</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">免费</div>
              <p className="text-gray-600">完整体验所有功能</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>体验所有4种输出格式</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>评估转换效果和质量</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>24小时内邮件发送</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>自由选择是否付费</span>
              </li>
            </ul>

            <Button className="w-full bg-transparent" variant="outline">
              免费体验
            </Button>
          </div>

          {/* 完整版 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-1" />
                推荐
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">完整版</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">¥6.66</div>
              <p className="text-gray-600">获得所有格式文件</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>下载所有4种格式文件</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>高质量PDF和Markdown</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>永久保存和收藏</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>技术支持和售后</span>
              </li>
            </ul>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">立即购买</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
