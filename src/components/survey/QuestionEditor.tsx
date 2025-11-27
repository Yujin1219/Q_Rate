// components/survey/QuestionEditor.tsx
interface QuestionEditorProps {
  question: Question;
  index: number;
  onUpdate: (id: string, field: keyof Question, value: any) => void;
  onDelete: (id: string) => void;
  onAddOption: (questionId: string) => void;
  onUpdateOption: (questionId: string, optionIndex: number, value: string) => void;
  onRemoveOption: (questionId: string, optionIndex: number) => void;
}

export default function QuestionEditor({
  question,
  index,
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

      {/* 선택지 입력 */}
      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div className="space-y-2">
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
    </div>
  );
}