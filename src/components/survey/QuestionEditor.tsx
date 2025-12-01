import type { Question } from "../../pages/create/page";

// components/survey/QuestionEditor.tsx
interface QuestionEditorProps {
  question: Question;
  index: number;
  totalQuestions: number;
  onUpdate: (id: string, field: keyof Question, value: any) => void;
  onDelete: (id: string) => void;
  onAddOption: (questionId: string) => void;
  onUpdateOption: (questionId: string, optionIndex: number, value: string) => void;
  onRemoveOption: (questionId: string, optionIndex: number) => void;
}

export default function QuestionEditor({
  question,
  index,
  totalQuestions,
  onUpdate,
  onDelete,
  onAddOption,
  onUpdateOption,
  onRemoveOption
}: QuestionEditorProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      {/* 문항 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">문항 {index + 1}</h3>
        <button
          onClick={() => onDelete(question.id)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
        >
          <i className="ri-delete-bin-line text-lg"></i>
        </button>
      </div>

      {/* 질문 내용 입력 */}
      <div className="mb-4">
        <input
          type="text"
          value={question.question}
          onChange={(e) => onUpdate(question.id, 'question', e.target.value)}
          placeholder="질문을 입력하세요"
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
        />
      </div>

      {/* 문항 유형 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">문항 유형</label>
        <select
          value={question.type}
          onChange={(e) => onUpdate(question.id, 'type', e.target.value)}
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 pr-8"
        >
          <option value="radio">객관식 (단일 선택)</option>
          <option value="checkbox">복수 선택</option>
          <option value="text">주관식</option>
        </select>
      </div>

      {/* 필수 여부 선택 */}
      <div className="mb-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => onUpdate(question.id, 'required', e.target.checked)}
            className="w-4 h-4 text-purple-600 border border-white/40 rounded focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">필수 응답</span>
        </label>
      </div>

      {/* 선택지 입력 */}
      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div className="space-y-2 mb-4">
          <label className="block text-sm font-medium text-gray-700">선택지</label>
          
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
              <input
                type="text"
                value={option}
                onChange={(e) => onUpdateOption(question.id, optionIndex, e.target.value)}
                placeholder={`선택지 ${optionIndex + 1}`}
                className="flex-1 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
              />
              
              {question.options.length > 1 && (
                <button
                  onClick={() => onRemoveOption(question.id, optionIndex)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <i className="ri-close-line"></i>
                </button>
              )}
            </div>
          ))}
          
          <button
            onClick={() => onAddOption(question.id)}
            className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105"
          >
            <i className="ri-add-line mr-2"></i>
            선택지 추가
          </button>
        </div>
      )}

      {/* 건너뛰기 설정 */}
      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div className="bg-blue-50/50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center mb-3">
            <i className="ri-skip-forward-line text-purple-600 mr-2"></i>
            <label className="text-sm font-medium text-purple-900">조건부 건너뛰기</label>
          </div>
          
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 flex-1">
                  선택지 {optionIndex + 1}: {option || '(선택지 입력 필요)'}
                </span>
                <select
                  value={question.skipRules?.[optionIndex] ?? ''}
                  onChange={(e) => {
                    const skipRules = question.skipRules ? { ...question.skipRules } : {};
                    if (e.target.value === '') {
                      delete skipRules[optionIndex];
                    } else {
                      skipRules[optionIndex] = parseInt(e.target.value);
                    }
                    onUpdate(question.id, 'skipRules', Object.keys(skipRules).length > 0 ? skipRules : undefined);
                  }}
                  className="px-3 py-1 text-xs bg-white border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {index < totalQuestions - 1 ? (
                    <>
                      <option value={index + 2}>질문 {index + 2}으로 이동</option>
                      {Array.from({ length: totalQuestions - index - 2 }).map((_, i) => {
                        const targetQuestion = index + i + 3;
                        return (
                          <option key={i} value={targetQuestion}>
                            질문 {targetQuestion}으로 이동
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    <option value="">건너뛰기 없음 (마지막 질문)</option>
                  )}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}