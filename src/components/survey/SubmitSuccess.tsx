interface SubmitSuccessProps {
  onNavigateHome: () => void;
  onViewResults: () => void;
}

export default function SubmitSuccess({ onNavigateHome, onViewResults }: SubmitSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <i className="ri-check-line text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">응답이 제출되었습니다!</h2>
          <p className="text-gray-600 mb-6">
            소중한 의견을 주셔서 감사합니다. 
            응답 결과는 설문 관리자가 확인할 수 있습니다.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onNavigateHome}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105"
            >
              <i className="ri-home-line mr-2"></i>
              홈으로
            </button>
            <button
              onClick={onViewResults}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
            >
              <i className="ri-bar-chart-line mr-2"></i>
              결과 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}