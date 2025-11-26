import { generateWordCloud } from "../../utils/generateWordCloud";
import { getSentimentAnalysis } from "../../utils/calculateSentiment";

interface TextAnalysisProps {
  textResponses: string[];
}

// 주관식 컴포넌트 - 워드클라우드, 감정 분석, 최근 응답
export function WordCloud({ textResponses }: TextAnalysisProps) {
  const wordCloudData = generateWordCloud(textResponses);

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-cloud-line mr-2"></i>
        워드클라우드
      </h3>
      <div className="flex flex-wrap gap-2 justify-center min-h-[200px] items-center">
        {wordCloudData.map((item, idx) => (
          <span
            key={idx}
            className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm text-white rounded-full border border-white/20 hover:scale-110 transition-transform duration-300"
            style={{
              fontSize: `${Math.max(12, Math.min(20, item.count * 3 + 10))}px`,
            }}
          >
            {item.word} ({item.count})
          </span>
        ))}
      </div>
    </div>
  );
}

export function SentimentAnalysis({ textResponses }: TextAnalysisProps) {
  const sentiment = getSentimentAnalysis(textResponses);
  const total = sentiment.positive + sentiment.negative + sentiment.neutral;

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-emotion-line mr-2"></i>
        감정 분석
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">긍정적</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {sentiment.positive}개
            </div>
            <div className="text-sm text-gray-600">
              {total > 0 ? Math.round((sentiment.positive / total) * 100) : 0}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
            <span className="text-gray-700">중립적</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {sentiment.neutral}개
            </div>
            <div className="text-sm text-gray-600">
              {total > 0 ? Math.round((sentiment.neutral / total) * 100) : 0}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <span className="text-gray-700">부정적</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {sentiment.negative}개
            </div>
            <div className="text-sm text-gray-600">
              {total > 0 ? Math.round((sentiment.negative / total) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecentResponsesProps {
  textResponses: string[];
}

export function RecentResponses({ textResponses }: RecentResponsesProps) {
  return (
    <div className="lg:col-span-2 bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <i className="ri-chat-3-line mr-2"></i>
        최근 응답 ({textResponses.length}개)
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {textResponses.slice(0, 5).map((response, idx) => (
          <div
            key={idx}
            className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/50"
          >
            <p className="text-gray-700">{response}</p>
          </div>
        ))}
        {textResponses.length > 5 && (
          <div className="text-center text-sm text-gray-600 pt-2">
            +{textResponses.length - 5}개 응답 더 있음
          </div>
        )}
      </div>
    </div>
  );
}
