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
  const getTextResponses = (question: Question): string[] => {
    if (question.type !== "text") return [];

    return responses
      .map((response) => {
        const answer = response.responses.find(
          (r) => r.questionId === question.id
        );
        return typeof answer?.answer === "string" ? answer.answer : "";
      })
      .filter((answer) => answer.trim() !== "");
  };

  const chartData = getChartData(question, responses);
  const textResponses = getTextResponses(question);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {index + 1}. {question.question}
        </h2>
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
            {question.type === "text" ? textResponses.length : responses.length}
            명 응답
          </span>
        </div>
      </div>

      {question.type === "text" ? (
        <div className="grid lg:grid-cols-2 gap-6">
          <WordCloud textResponses={textResponses} />
          <SentimentAnalysis textResponses={textResponses} />
          <RecentResponses textResponses={textResponses} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <BarChart chartData={chartData} />
          <PieChart chartData={chartData} responses={responses} />
          <Statistics chartData={chartData} responses={responses} />
        </div>
      )}
    </div>
  );
}
