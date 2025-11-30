import type { Question } from "../../pages/create/page";

// components/survey/SurveyPreview.tsx
interface SurveyPreviewProps {
  surveyTitle: string;
  questions: Question[];
}

export default function SurveyPreview({ surveyTitle, questions }: SurveyPreviewProps) {
  if (!surveyTitle) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
          <i className="ri-file-list-3-line text-white text-2xl"></i>
        </div>
        <p className="text-gray-600">설문 제목을 입력하면 미리보기가 표시됩니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 설문 제목 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{surveyTitle}</h1>
        <p className="text-gray-600">설문에 참여해 주셔서 감사합니다</p>
      </div>

      {/* 문항 미리보기 */}
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-medium text-gray-800">
              {index + 1}. {question.question || '질문을 입력하세요'}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
          </div>

          {question.type === 'radio' && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name={`question_${question.id}`} className="text-purple-600" />
                  <span className="text-gray-700">{option || `선택지 ${optionIndex + 1}`}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'checkbox' && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="text-purple-600 rounded" />
                  <span className="text-gray-700">{option || `선택지 ${optionIndex + 1}`}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <textarea
              placeholder="답변을 입력하세요"
              rows={3}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
            />
          )}
        </div>
      ))}

      {/* 제출 버튼 */}
      {questions.length > 0 && (
        <button className="w-full py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg border border-white/20">
          응답 제출하기
        </button>
      )}
    </div>
  );
}