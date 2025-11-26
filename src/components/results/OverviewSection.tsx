import type { Survey, ResponseData } from "../../types/survey";

interface OverviewSectionProps {
  survey: Survey;
  responses: ResponseData[];
}

// 설문 개요 섹션 컴포넌트
export default function OverviewSection({
  survey,
  responses,
}: OverviewSectionProps) {
  const daysElapsed = Math.ceil(
    (Date.now() - new Date(survey.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {survey.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <span className="flex items-center">
                <i className="ri-user-line mr-2"></i>총 {responses.length}명
                응답
              </span>
              <span className="flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                생성일: {survey.createdAt}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105">
              <i className="ri-share-line mr-2"></i>
              공유하기
            </button>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20">
              <i className="ri-download-line mr-2"></i>
              PDF 저장
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-user-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {responses.length}
          </div>
          <div className="text-sm text-gray-600">총 응답 수</div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-question-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {survey.questions.length}
          </div>
          <div className="text-sm text-gray-600">총 문항 수</div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/80 to-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-time-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {Math.round((responses.length / Math.max(1, daysElapsed)) * 10) /
              10}
          </div>
          <div className="text-sm text-gray-600">일평균 응답</div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-bar-chart-line text-white text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {responses.length > 0 ? "100%" : "0%"}
          </div>
          <div className="text-sm text-gray-600">완료율</div>
        </div>
      </div>
    </>
  );
}
