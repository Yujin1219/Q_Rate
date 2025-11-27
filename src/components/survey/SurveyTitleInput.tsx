// components/survey/SurveyTitleInput.tsx
interface SurveyTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SurveyTitleInput({ value, onChange }: SurveyTitleInputProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        설문 제목
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="설문 제목을 입력하세요"
        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
      />
    </div>
  );
}