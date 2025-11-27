import { Link } from "react-router-dom";
import type { Survey } from "../../pages/home/page";

// Props 타입 정의
interface Props {
  surveys: Survey[];
}

// 최근 생성된 설문 목록 표시 컴포넌트
export default function RecentSurveys({ surveys }: Props) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            최근 생성된 설문
          </h2>

          <Link
            to="/create"
            className="relative inline-flex items-center px-6 py-3 text-white font-medium rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <i className="ri-add-line mr-2 text-lg relative z-10"></i>
            <span className="relative z-10">새 설문 만들기</span>
          </Link>
        </div>

        {surveys.length === 0 ? (
          <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-16 text-center border border-white/40 shadow-xl overflow-hidden">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              아직 생성된 설문이 없습니다
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              첫 번째 설문을 만들어보세요!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md shadow-violet-500/20 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                      <i className="ri-file-list-3-line text-white text-xl relative z-10"></i>
                    </div>

                    <span className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-full border border-white/40">
                      {survey.createdAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-violet-600 transition">
                    {survey.title}
                  </h3>

                  <p className="text-sm text-gray-600 flex items-center">
                    <i className="ri-user-line mr-1"></i>
                    {survey.responseCount}명 응답
                  </p>

                  <div className="flex mt-4 gap-2">
                    <Link
                      to={`/survey/${survey.id}`}
                      className="flex-1 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg hover:bg-white/80 transition text-gray-700 text-center"
                    >
                      응답하기
                    </Link>

                    <Link
                      to={`/results/${survey.id}`}
                      className="relative flex-1 inline-flex items-center justify-center px-4 py-2 text-white rounded-lg text-center shadow-md hover:shadow-lg overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <i className="ri-bar-chart-line mr-2 text-lg relative z-10"></i>
                      <span className="relative z-10">결과보기</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
