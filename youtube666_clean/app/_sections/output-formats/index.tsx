import { FileText, Languages, BarChart3, CheckCircle } from "lucide-react"

export function OutputFormats() {
  const formats = [
    {
      icon: FileText,
      title: "深度长文版",
      description: "重新组织内容结构，提炼核心观点和方法论",
      features: ["重新组织内容结构", "提炼核心观点和方法论", "适合中文阅读习惯", "可直接收藏到笔记软件"],
    },
    {
      icon: Languages,
      title: "原味翻译版",
      description: "保持原文完整逻辑，专业术语准确翻译",
      features: ["保持原文完整逻辑", "专业术语准确翻译", "上下文连贯自然", "适合学习和引用"],
    },
    {
      icon: BarChart3,
      title: "中英对照版",
      description: "学习英语的最佳工具，对照验证翻译质量",
      features: ["学习英语的最佳工具", "对照验证翻译质量", "专业词汇双语标注", "提升英语阅读能力"],
    },
    {
      icon: CheckCircle,
      title: "质量报告",
      description: "翻译质量评分，处理过程记录",
      features: ["翻译质量评分", "处理过程记录", "智能重试统计", "确保内容准确性"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">你将得到4种格式</h2>
          <p className="text-xl text-gray-600">就像有了私人翻译+编辑团队</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {formats.map((format, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mr-4">
                  <format.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{format.title}</h3>
                  <p className="text-gray-600 mt-1">{format.description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {format.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
