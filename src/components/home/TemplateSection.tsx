import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import templateImage from "../../assets/template.png";

export default function TemplateSection() {
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
                src={templateImage}
                alt="설문 템플릿"
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
                설문 템플릿
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                설문 작성,
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent mb-6">
                이제는 쉽게!
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                다양한 템플릿으로 설문 만들기가 간단해집니다. 설문 조사 작성이 처음이신가요? Q+Rate의
                다양한 템플릿으로 몇 초만에 전문적인 설문지를 만들 수 있습니다. 고객 만족도, 제품
                피드백, 직원 설문 등 용도별 템플릿 제공으로 시간을 절약하고 품질 높은 설문을 작성할
                수 있습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">주요 특징</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                      즉시 사용 가능한 템플릿
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                      커스터마이징 용이
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">이점</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                      베스트 프랙티스 적용
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                      시간 절약
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                to="/templates"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                템플릿 살펴보기
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
