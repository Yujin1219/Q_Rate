export interface SurveyQuestion {
  id: string;
  type: "radio" | "checkbox" | "text";
  question: string;
  options: string[];
}

export interface SurveyData {
  id: string;
  title: string;
  questions: SurveyQuestion[];
  createdAt: string;
}

/** 전체 설문 목록 */
export const sampleSurveys = [
  {
    id: "1",
    title: "고객 만족도 조사",
    createdAt: "2024-01-15",
    responseCount: 24,
  },
  {
    id: "2",
    title: "제품 피드백 설문",
    createdAt: "2024-01-12",
    responseCount: 18,
  },
  {
    id: "3",
    title: "서비스 개선 의견 수집",
    createdAt: "2024-01-10",
    responseCount: 31,
  },
];

/** 설문 상세 데이터 */
export const sampleSurveyData1: SurveyData = {
  id: "1",
  title: "고객 만족도 조사",
  createdAt: "2024-01-15",
  questions: [
    {
      id: "1",
      type: "radio",
      question: "전반적인 서비스에 대해 얼마나 만족하십니까?",
      options: ["매우 만족", "만족", "보통", "불만족", "매우 불만족"],
    },
    {
      id: "2",
      type: "checkbox",
      question: "어떤 부분이 가장 좋았나요? (복수 선택 가능)",
      options: [
        "빠른 배송",
        "좋은 품질",
        "합리적 가격",
        "친절한 서비스",
        "사용 편의성",
      ],
    },
    {
      id: "3",
      type: "text",
      question: "추가 의견을 자유롭게 작성해주세요.",
      options: [],
    },
  ],
};

export const sampleSurveyData2: SurveyData = {
  id: "2",
  title: "제품 피드백 설문",
  createdAt: "2024-01-12",
  questions: [
    {
      id: "1",
      type: "radio",
      question: "제품의 품질은 어떤가요?",
      options: ["매우 좋음", "좋음", "보통", "나쁨", "매우 나쁨"],
    },
    {
      id: "2",
      type: "checkbox",
      question: "어떤 기능이 유용했나요?",
      options: ["사용 편의성", "디자인", "성능", "가격", "브랜드"],
    },
    {
      id: "3",
      type: "text",
      question: "제품에 대한 의견을 남겨주세요.",
      options: [],
    },
  ],
};

export const sampleSurveyData3: SurveyData = {
  id: "3",
  title: "서비스 개선 의견 수집",
  createdAt: "2024-01-10",
  questions: [
    {
      id: "1",
      type: "radio",
      question: "현재 서비스 이용 빈도는?",
      options: ["매일", "주 2-3회", "주 1회", "월 1-2회", "거의 사용 안함"],
    },
    {
      id: "2",
      type: "checkbox",
      question: "개선이 필요한 부분은? (복수 선택)",
      options: [
        "속도 개선",
        "UI/UX 개선",
        "기능 추가",
        "고객 지원",
        "가격 정책",
      ],
    },
    {
      id: "3",
      type: "text",
      question: "개선 제안사항을 작성해주세요.",
      options: [],
    },
  ],
};
