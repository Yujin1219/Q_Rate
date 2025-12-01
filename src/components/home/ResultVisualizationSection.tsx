import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import resultImage from "../../assets/result.jpeg";

export default function ResultVisualizationSection() {
  const features = [
    "다양한 차트 제공: 원형 그래프, 막대 그래프, 라인 차트, 워드클라우드 등",
    "실시간 집계: 응답이 들어올 때마다 즉시 업데이트되는 대시보드",
    "쉬운 공유: 생성된 차트와 리포트를 한 번에 공유",
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 이미지와 설명 텍스트 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex justify-center lg:justify-start">
              <img
                src={resultImage}
                alt="설문 결과 시각화"
                className="w-full max-w-md rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* 오른쪽: 설명 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <div className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                데이터 시각화
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                100개 이상의 데이터를
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent mb-6">
                한눈에!
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                복잡한 데이터를 직관적인 차트로 분석하기. 설문 응답 결과를 단순한 텍스트로만 보면
                패턴을 파악하기 어렵습니다. Q+Rate는 응답 데이터를 다양한 차트(원형 그래프, 막대
                그래프, 라인 차트, 워드클라우드 등)로 즉시 시각화하여 핵심 인사이트를 빠르게 발견할 수
                있습니다. 또한 감정 분석 기술로 주관식 답변의 긍정/부정 감정을 자동으로 분류합니다.
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
                to="/results/1"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                결과 분석 예시 보기
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
