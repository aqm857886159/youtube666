import { BookOpen, Search, Smartphone, Brain, Archive } from "lucide-react"

export function ValueProposition() {
  const benefits = [
    {
      icon: BookOpen,
      title: "阅读速度是观看的3-5倍",
      description: "快速扫读，高效获取信息要点",
    },
    {
      icon: Search,
      title: "支持检索、标记、引用",
      description: "文字内容便于搜索和知识管理",
    },
    {
      icon: Smartphone,
      title: "随时随地，不需要网络和音频",
      description: "离线阅读，不受环境限制",
    },
    {
      icon: Brain,
      title: "更适合深度思考和记忆",
      description: "文字阅读有助于理解和记忆",
    },
    {
      icon: Archive,
      title: "永久保存，建立个人知识库",
      description: "收藏整理，构建专属知识体系",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择文字而非视频？</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们不只是翻译，而是将视频内容重构为适合阅读的文档格式
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-4">
                <benefit.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
