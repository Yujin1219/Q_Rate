interface EmptyStateProps {
  onNavigateHome: () => void;
}

export default function EmptyState({ onNavigateHome }: EmptyStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <i className="ri-error-warning-line text-white text-2xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">설문을 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">요청하신 설문이 존재하지 않습니다.</p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
          >
            <i className="ri-home-line mr-2"></i>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}