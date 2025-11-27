// 주요 기능 소개 섹션
export default function FeaturesSection() {
  // 기능 항목 배열
  const features = [
    {
      title: "빠른 설문 생성",
      description: "직관적인 인터페이스로 몇 분 만에 전문적인 설문 생성.",
      icon: "ri-flashlight-fill",
      shadow: "shadow-violet-500/20",
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    },
    {
      title: "실시간 분석",
      description: "응답 데이터를 실시간 시각화하여 즉각적인 인사이트 제공.",
      icon: "ri-line-chart-fill",
      shadow: "shadow-purple-500/20",
      gradient: "from-purple-400 via-fuchsia-500 to-pink-500",
    },
    {
      title: "협업 기능",
      description: "팀원들과 함께 설문을 관리하고 결과를 쉽게 공유.",
      icon: "ri-team-fill",
      shadow: "shadow-fuchsia-500/20",
      gradient: "from-fuchsia-400 via-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
          왜 Q+rate를 선택해야 할까요?
        </h2>
        <p className="text-xl text-gray-600">
          전문적인 설문 조사를 위한 완벽한 솔루션
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div
              className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${f.shadow} overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${f.gradient}`}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
              <i className={`${f.icon} text-white text-3xl relative z-10`}></i>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {f.title}
            </h3>
            <p className="text-gray-600 text-lg">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
