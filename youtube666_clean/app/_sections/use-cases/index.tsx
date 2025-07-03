import { GraduationCap, Briefcase, TrendingUp, Wrench } from "lucide-react"

export function UseCases() {
  const useCases = [
    {
      icon: GraduationCap,
      title: "学术研究",
      description: "快速获取英文论文讲解",
      example: "TED演讲、学术会议、研究分享",
    },
    {
      icon: Briefcase,
      title: "职场学习",
      description: "吸收英文商业课程精华",
      example: "商业案例、管理培训、行业分析",
    },
    {
      icon: TrendingUp,
      title: "个人成长",
      description: "收藏英文播客和演讲",
      example: "个人发展、心理学、哲学思考",
    },
    {
      icon: Wrench,
      title: "技术学习",
      description: "理解英文技术分享内容",
      example: "编程教程、技术会议、开源项目",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">适用场景</h2>
          <p className="text-xl text-gray-600">已为1000+位用户处理5000+个视频，节省20000+小时观看时间</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <useCase.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              <p className="text-sm text-gray-500">{useCase.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
