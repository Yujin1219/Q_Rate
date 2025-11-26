export interface Question {
  id: string;
  type: "radio" | "checkbox" | "text";
  question: string;
  options: string[];
}

export interface Survey {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

export interface ResponseData {
  surveyId: string;
  responses: Array<{
    questionId: string;
    answer: string | string[];
  }>;
  submittedAt: string;
}

export interface ChartData {
  label: string;
  value: number;
  percentage: number;
}
