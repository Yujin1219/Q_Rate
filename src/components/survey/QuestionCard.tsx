import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import TextQuestion from './TextQuestion';

interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  options: string[];
  required: boolean;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  answer: string | string[];
  onRadioChange: (questionId: string, value: string) => void;
  onCheckboxChange: (questionId: string, value: string, checked: boolean) => void;
  onTextChange: (questionId: string, value: string) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  answer,
  onRadioChange,
  onCheckboxChange,
  onTextChange,
}: QuestionCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl mb-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          {/* 질문 번호 뱃지 */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 border border-white/20">
            <span className="text-white font-semibold">{questionNumber}</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 flex-1">
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {question.type === 'radio' && (
          <RadioQuestion
            question={question}
            selectedAnswer={typeof answer === 'string' ? answer : ''}
            onChange={onRadioChange}
          />
        )}

        {question.type === 'checkbox' && (
          <CheckboxQuestion
            question={question}
            selectedAnswers={Array.isArray(answer) ? answer : []}
            onChange={onCheckboxChange}
          />
        )}

        {question.type === 'text' && (
          <TextQuestion
            question={question}
            answer={typeof answer === 'string' ? answer : ''}
            onChange={onTextChange}
          />
        )}
      </div>
    </div>
  );
}