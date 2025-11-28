interface Question {
  id: string;
  question: string;
}

interface TextQuestionProps {
  question: Question;
  answer: string;
  onChange: (questionId: string, value: string) => void;
}

export default function TextQuestion({ question, answer, onChange }: TextQuestionProps) {
  return (
    <div>
      <textarea
        value={answer}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder="답변을 입력하세요..."
        rows={6}
        className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
      />
      {/* 글자 수 카운터 */}
      <div className="text-right text-sm text-gray-500 mt-2">
        {answer.length} / 500자
      </div>
    </div>
  );
}