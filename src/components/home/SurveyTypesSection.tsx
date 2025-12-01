import Fade from "react-reveal/Fade";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import surveyImage from "../../assets/survey.png";

export default function SurveyTypesSection() {
  const features = [
    "객관식 & 주관식: 선택형부터 자유로운 의견 수집까지 다양하게",
    "조건부 분기: 응답에 따라 맞춤형 질문 제시",
    "필수/선택 설정: 각 문항별로 응답 필수 여부 지정 가능",
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-6xl mx-auto">
        {/* 이미지와 설명 텍스트 레이아웃 - 순서 역방향 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 설명 텍스트 */}
          <Fade left duration={800} delay={100}>
            <div>
              <div className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                다양한 질문 유형
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                객관식부터 주관식까지,
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent mb-6">
                모든 형태의 질문을 자유롭게!
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                당신의 조사 목적에 맞는 다양한 질문 유형 제공. 단순한 객관식 설문을 넘어, Q+Rate에서는
                객관식(라디오, 체크박스), 주관식(텍스트), 드롭다운, 매트릭스, 순위 매기기 등 다양한
                질문 유형을 지원합니다. 조건부 분기 기능으로 응답자의 답변에 따라 다른 질문을 보여주는
                스마트한 설문도 가능합니다.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-6 h-6 text-violet-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/create"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                설문 만들러 가기
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </Fade>

          {/* 오른쪽: 이미지 */}
          <Fade right duration={800} delay={100}>
            <div className="flex justify-center lg:justify-end">
              <img
                src={surveyImage}
                alt="다양한 설문 유형"
                className="w-full max-w-md rounded-3xl shadow-2xl"
              />
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
