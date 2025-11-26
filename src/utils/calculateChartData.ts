import type { Question, ResponseData, ChartData } from "../types/survey";

// 객관식 차트 데이터 계산 함수
export const getChartData = (
  question: Question,
  responses: ResponseData[]
): ChartData[] => {
  if (question.type === "text") return [];

  const answerCounts: { [key: string]: number } = {};

  if (question.type === "radio") {
    question.options.forEach((option) => {
      answerCounts[option] = 0;
    });

    responses.forEach((response) => {
      const answer = response.responses.find(
        (r) => r.questionId === question.id
      );
      if (answer && typeof answer.answer === "string") {
        answerCounts[answer.answer] = (answerCounts[answer.answer] || 0) + 1;
      }
    });
  } else if (question.type === "checkbox") {
    question.options.forEach((option) => {
      answerCounts[option] = 0;
    });

    responses.forEach((response) => {
      const answer = response.responses.find(
        (r) => r.questionId === question.id
      );
      if (answer && Array.isArray(answer.answer)) {
        answer.answer.forEach((selectedOption) => {
          answerCounts[selectedOption] =
            (answerCounts[selectedOption] || 0) + 1;
        });
      }
    });
  }

  const total = Object.values(answerCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return Object.entries(answerCounts).map(([label, value]) => ({
    label,
    value,
    percentage: total > 0 ? Math.round((value / total) * 100) : 0,
  }));
};
