interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function NavigationButtons({
  currentQuestion,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      {/* 이전 버튼 */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`inline-flex items-center px-6 py-3 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border ${
          isFirst
            ? 'bg-gray-200/50 text-gray-400 border-gray-200/50 cursor-not-allowed'
            : 'bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 border-white/30 hover:scale-105'
        }`}
      >
        <i className="ri-arrow-left-line mr-2"></i>
        이전
      </button>

      {/* 마지막 질문이면 제출 버튼, 아니면 다음 버튼 */}
      {isLast ? (
        <button
          onClick={onSubmit}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-semibold rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
        >
          <i className="ri-send-plane-line mr-2"></i>
          응답 제출하기
        </button>
      ) : (
        <button
          onClick={onNext}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
        >
          다음
          <i className="ri-arrow-right-line ml-2"></i>
        </button>
      )}
    </div>
  );
}