// 감정 분석 계산 함수
export const getSentimentAnalysis = (texts: string[]) => {
  const positive = ["좋", "만족", "우수", "훌륭", "친절", "빠른", "편리"];
  const negative = ["아쉬", "불만", "개선", "문제", "어려", "느린", "불편"];

  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  texts.forEach((text) => {
    const hasPositive = positive.some((word) => text.includes(word));
    const hasNegative = negative.some((word) => text.includes(word));

    if (hasPositive && !hasNegative) positiveCount++;
    else if (hasNegative && !hasPositive) negativeCount++;
    else neutralCount++;
  });

  return {
    positive: positiveCount,
    negative: negativeCount,
    neutral: neutralCount,
  };
};
