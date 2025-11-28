interface ProgressBarProps {
  current: number;
  total: number;
  title: string;
}

export default function ProgressBar({ current, total, title }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600">설문에 참여해 주셔서 감사합니다</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>진행률</span>
          <span>{current + 1} / {total}</span>
        </div>
        <div className="w-full bg-white/40 backdrop-blur-sm rounded-full h-3 border border-white/50">
          <div
            className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}