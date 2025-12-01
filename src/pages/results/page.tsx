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
    if (!id) return;

    // 설문 정보 불러오기
    const savedSurvey = localStorage.getItem(`survey_${id}`);
    if (savedSurvey) {
      setSurvey(JSON.parse(savedSurvey));
    }

    // 응답 정보 불러오기
    const savedResponses = localStorage.getItem(`responses_${id}`);
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    } else {
      // 저장된 응답 없으면 빈 배열로
      setResponses([]);
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

      <div id="results-content" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <OverviewSection survey={survey} responses={responses} />

          {/* 문항별 결과 */}
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
