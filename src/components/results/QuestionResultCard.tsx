import type { Question, ResponseData } from "../../types/survey";
import { getChartData } from "../../utils/calculateChartData";
import { BarChart, PieChart, Statistics } from "./Charts";
import { WordCloud, SentimentAnalysis, RecentResponses } from "./TextAnalysis";

interface QuestionResultCardProps {
  question: Question;
  responses: ResponseData[];
  index: number;
}

// 개별 질문 결과 카드 컴포넌트
export default function QuestionResultCard({
  question,
  responses,
  index,
}: QuestionResultCardProps) {
  // 주관식 응답만 추출하는 함수
  const getTextResponses = (question: Question): string[] => {
    if (question.type !== "text") return [];

    return responses
      .map((response) => {
        // 이 질문(question.id)에 해당하는 응답 찾기
        const answer = response.responses.find(
          (r) => r.questionId === question.id
        );
        // 문자열인 경우만 반환
        return typeof answer?.answer === "string" ? answer.answer : "";
      })
      .filter((answer) => answer.trim() !== ""); // 공백 제거
  };

  // 객관식/복수선택용 차트 데이터 계산
  const chartData = getChartData(question, responses);

  // 주관식 텍스트 응답 배열
  const textResponses = getTextResponses(question);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      {/* 상단: 질문 제목 + 유형 + 응답 수 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {index + 1}. {question.question}
        </h2>

        {/* 질문 유형 및 응답 수 표시 */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <i className="ri-file-list-line mr-1"></i>
            {question.type === "radio"
              ? "객관식"
              : question.type === "checkbox"
              ? "복수선택"
              : "주관식"}
          </span>

          <span className="flex items-center">
            <i className="ri-user-line mr-1"></i>
            {/* 주관식은 실제 텍스트 응답 개수 사용 */}
            {question.type === "text" ? textResponses.length : responses.length}
            명 응답
          </span>
        </div>
      </div>

      {/* 하단: 질문 유형별 결과 표시 */}
      {question.type === "text" ? (
        // 주관식: 워드클라우드 + 감성 분석 + 최신 응답
        <div className="grid lg:grid-cols-2 gap-6">
          <WordCloud textResponses={textResponses} />
          <SentimentAnalysis textResponses={textResponses} />
          <RecentResponses textResponses={textResponses} />
        </div>
      ) : (
        // 객관식/복수선택: 막대 + 파이 + 통계
        <div className="grid lg:grid-cols-3 gap-6">
          <BarChart chartData={chartData} />
          <PieChart chartData={chartData} responses={responses} />
          <Statistics chartData={chartData} responses={responses} />
        </div>
      )}
    </div>
  );
}
