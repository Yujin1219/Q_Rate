import { Link } from 'react-router-dom';

interface RespondedSurvey {
  id: string;
  title: string;
  respondedAt: string;
}

interface RespondedSurveyListProps {
  surveys: RespondedSurvey[];
}

export default function RespondedSurveyList({ surveys }: RespondedSurveyListProps) {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-transparent"></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">응답한 설문</h3>

        {surveys.length === 0 ? (
          <div className="text-center py-12">
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 opacity-20"></div>
              <i className="ri-survey-line text-violet-600 text-4xl relative z-10"></i>
            </div>
            <p className="text-gray-600">아직 응답한 설문이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/20 overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                      <i className="ri-file-list-3-line text-white text-xl relative z-10"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors duration-300">
                        {survey.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <i className="ri-calendar-line mr-1"></i>
                        응답일: {survey.respondedAt}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/results/${survey.id}`}
                    className="relative inline-flex items-center px-5 py-2.5 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <i className="ri-bar-chart-line mr-2 relative z-10"></i>
                    <span className="relative z-10">결과보기</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
