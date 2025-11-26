import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/feature/Header";
import OverviewSection from "../../components/results/OverviewSection";
import QuestionResultCard from "../../components/results/QuestionResultCard";
import type { Survey, ResponseData } from "../../types/survey";

// 결과 페이지
export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<ResponseData[]>([]);

  useEffect(() => {
    if (id) {
      // 설문 데이터 로드
      const savedSurvey = localStorage.getItem(`survey_${id}`);
      if (savedSurvey) {
        setSurvey(JSON.parse(savedSurvey));
      }

      // 응답 데이터 로드 또는 샘플 데이터 생성
      const savedResponses = localStorage.getItem(`responses_${id}`);
      if (savedResponses) {
        setResponses(JSON.parse(savedResponses));
      } else {
        // 샘플 응답 데이터 생성
        const sampleResponses: ResponseData[] = Array.from(
          { length: 25 },
          () => ({
            surveyId: id,
            responses: [
              {
                questionId: "1",
                answer: ["매우 만족", "만족", "보통", "불만족", "매우 불만족"][
                  Math.floor(Math.random() * 5)
                ],
              },
              {
                questionId: "2",
                answer: [
                  ["빠른 배송", "좋은 품질"],
                  ["좋은 품질", "합리적 가격"],
                  ["빠른 배송"],
                  ["친절한 서비스", "사용 편의성"],
                  ["좋은 품질"],
                ][Math.floor(Math.random() * 5)],
              },
              {
                questionId: "3",
                answer: [
                  "전반적으로 만족스러운 서비스였습니다.",
                  "품질이 좋아서 재구매 의향이 있습니다.",
                  "배송은 빨랐지만 포장이 아쉬웠습니다.",
                  "가격 대비 품질이 우수합니다.",
                  "고객 서비스가 매우 친절했습니다.",
                  "다음에도 이용하고 싶습니다.",
                  "개선이 필요한 부분이 있지만 전체적으로 좋습니다.",
                ][Math.floor(Math.random() * 7)],
              },
            ],
            submittedAt: new Date(
              Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          })
        );
        setResponses(sampleResponses);
        localStorage.setItem(
          `responses_${id}`,
          JSON.stringify(sampleResponses)
        );
      }
    }
  }, [id]);

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <i className="ri-error-warning-line text-white text-2xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              설문을 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 mb-4">
              요청하신 설문이 존재하지 않습니다.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
            >
              <i className="ri-home-line mr-2"></i>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <OverviewSection survey={survey} responses={responses} />

          {/* Results */}
          <div className="space-y-8">
            {survey.questions.map((question, index) => (
              <QuestionResultCard
                key={question.id}
                question={question}
                responses={responses}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
