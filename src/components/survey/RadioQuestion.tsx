interface Question {
  id: string;
  question: string;
  options: string[];
}

interface RadioQuestionProps {
  question: Question;
  selectedAnswer: string;
  onChange: (questionId: string, value: string) => void;
}

export default function RadioQuestion({ question, selectedAnswer, onChange }: RadioQuestionProps) {
  return (
    <div className="space-y-3">
      {question.options.map((option, idx) => (
        <label
          key={idx}
          className="flex items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
        >
          <input
            type="radio"
            name={`question_${question.id}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="w-5 h-5 text-purple-600 mr-4"
          />
          <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-300">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}