import { Link } from "react-router-dom";

// 메인 히어로 섹션 (소개 영역)
export default function HeroSection() {
  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 배경: 그라디언트 및 패턴 */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
        }}
      ></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* 제목: 그라디언트 텍스트 */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
            데이터 기반 의사결정을 위한
          </span>
          <br />
          <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
            스마트 설문 플랫폼
          </span>
        </h1>

        {/* 설명 문구 */}
        <p className="text-xl md:text-2xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Q+rate로 설문을 생성하고 실시간으로 인사이트를 얻으세요.
        </p>

        {/* CTA 버튼 영역 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* 주요 CTA 버튼 - 무료로 시작하기 */}
          <Link
            to="/create"
            className="relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105 transition-all overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>

            <i className="ri-add-circle-line mr-3 text-xl relative z-10"></i>
            <span className="relative z-10">무료로 시작하기</span>
          </Link>

          {/* 보조 CTA 버튼 - 템플릿 둘러보기 */}
          <Link
            to="/templates"
            className="relative inline-flex items-center px-8 py-4 border border-white/40 bg-white/60 backdrop-blur-xl rounded-2xl font-semibold text-violet-600 hover:bg-white/80 transition shadow-lg hover:shadow-xl hover:scale-105"
          >
            <i className="ri-file-list-3-line mr-3 text-xl"></i>
            템플릿 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
