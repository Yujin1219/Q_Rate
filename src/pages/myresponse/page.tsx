import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  options: string[];
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

interface Response {
  questionId: string;
  answer: string | string[];
}

interface ResponseData {
  surveyId: string;
  responses: Response[];
  responderId: string;
  submittedAt: string;
}

export default function MyResponsePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [myResponse, setMyResponse] = useState<ResponseData | null>(null);

  useEffect(() => {
    if (id) {
      // 설문 데이터 로드
      const savedSurvey = localStorage.getItem(`survey_${id}`);
      if (savedSurvey) {
        setSurvey(JSON.parse(savedSurvey));
      }

      // 현재 사용자 정보 가져오기
      const userInfo = localStorage.getItem('userInfo');
      const userEmail = userInfo ? JSON.parse(userInfo).email : null;

      // 응답한 설문 목록에서 찾기
      const myResponsesString = localStorage.getItem('myResponses');
      if (myResponsesString && userEmail) {
        const myResponses = JSON.parse(myResponsesString);
        const responsedSurvey = myResponses.find((r: any) => r.id === id);

        if (responsedSurvey) {
      // 실제 응답 데이터 가져오기
          const savedResponses = localStorage.getItem(`responses_${id}`);
          if (savedResponses) {
            const allResponses: ResponseData[] = JSON.parse(savedResponses);
            // 현재 로그인한 사용자의 응답만 찾기
            const userResponse = allResponses.find(r => r.responderId === userEmail);
            if (userResponse) {
              setMyResponse(userResponse);
            }
          }
        }
      }
    }
  }, [id]);

  const getMyAnswer = (questionId: string): string | string[] | null => {
    if (!myResponse) return null;
    const response = myResponse.responses.find(r => r.questionId === questionId);
    return response?.answer || null;
  };

  if (!survey || !myResponse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <i className="ri-error-warning-line text-white text-2xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">응답을 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">요청하신 응답이 존재하지 않습니다.</p>
            <button
              onClick={() => navigate('/mypage')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              마이페이지로 돌아가기
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{survey.title}</h1>
                <p className="text-gray-600">내가 응답한 설문 내용입니다</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                응답 시간: {new Date(myResponse.submittedAt).toLocaleString('ko-KR')}
              </span>
            </div>
          </div>

          {/* Survey Content */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <div className="space-y-8">
              {survey.questions.map((question, index) => {
                const myAnswer = getMyAnswer(question.id);

                return (
                  <div key={question.id} className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      {index + 1}. {question.question}
                    </h2>

                    {question.type === 'radio' && (
                      <div className="space-y-3">
                        {question.options.map((option, idx) => {
                          const isSelected = myAnswer === option;
                          return (
                            <div
                              key={idx}
                              className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? 'bg-purple-50 border-purple-500'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                                isSelected ? 'border-purple-500' : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                )}
                              </div>
                              <span className={`font-medium ${
                                isSelected ? 'text-purple-700' : 'text-gray-700'
                              }`}>
                                {option}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'checkbox' && (
                      <div className="space-y-3">
                        {question.options.map((option, idx) => {
                          const isSelected = Array.isArray(myAnswer) && myAnswer.includes(option);
                          return (
                            <div
                              key={idx}
                              className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? 'bg-purple-50 border-purple-500'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-4 ${
                                isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <i className="ri-check-line text-white text-sm"></i>
                                )}
                              </div>
                              <span className={`font-medium ${
                                isSelected ? 'text-purple-700' : 'text-gray-700'
                              }`}>
                                {option}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'text' && (
                      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {typeof myAnswer === 'string' ? myAnswer : ''}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/mypage')}
              className="inline-flex items-center px-8 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              마이페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
