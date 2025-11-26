// 워드 클라우드 생성 함수
export const generateWordCloud = (
  texts: string[]
): { word: string; count: number }[] => {
  const words: { [key: string]: number } = {};

  texts.forEach((text) => {
    const cleanText = text.replace(/[^\w\s가-힣]/g, " ");
    const wordList = cleanText.split(/\s+/).filter((word) => word.length > 1);

    wordList.forEach((word) => {
      words[word] = (words[word] || 0) + 1;
    });
  });

  return Object.entries(words)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
};
