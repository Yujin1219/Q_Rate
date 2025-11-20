import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';

interface Survey {
  id: string;
  title: string;
  createdAt: string;
  responseCount: number;
}

export default function HomePage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    // LocalStorage에서 설문 목록 불러오기
    const savedSurveys = localStorage.getItem('surveys');
    if (savedSurveys) {
      setSurveys(JSON.parse(savedSurveys));
    } else {
      // 샘플 데이터
      const sampleSurveys: Survey[] = [
        {
          id: '1',
          title: '고객 만족도 조사',
          createdAt: '2024-01-15',
          responseCount: 24
        },
        {
          id: '2',
          title: '제품 피드백 설문',
          createdAt: '2024-01-12',
          responseCount: 18
        },
        {
          id: '3',
          title: '서비스 개선 의견 수집',
          createdAt: '2024-01-10',
          responseCount: 31
        }
      ];
      setSurveys(sampleSurveys);
      localStorage.setItem('surveys', JSON.stringify(sampleSurveys));
      
      // 예시 설문 데이터 생성
      const sampleSurveyData = {
        id: '1',
        title: '고객 만족도 조사',
        questions: [
          {
            id: '1',
            type: 'radio' as const,
            question: '전반적인 서비스에 대해 얼마나 만족하십니까?',
            options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']
          },
          {
            id: '2',
            type: 'checkbox' as const,
            question: '어떤 부분이 가장 좋았나요? (복수 선택 가능)',
            options: ['빠른 배송', '좋은 품질', '합리적 가격', '친절한 서비스', '사용 편의성']
          },
          {
            id: '3',
            type: 'text' as const,
            question: '추가로 개선되었으면 하는 점이나 의견을 자유롭게 작성해주세요.',
            options: []
          }
        ],
        createdAt: '2024-01-15'
      };
      
      localStorage.setItem('survey_1', JSON.stringify(sampleSurveyData));
      
      // 다른 예시 설문들도 생성
      const sampleSurveyData2 = {
        id: '2',
        title: '제품 피드백 설문',
        questions: [
          {
            id: '1',
            type: 'radio' as const,
            question: '제품의 품질에 대해 어떻게 생각하시나요?',
            options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']
          },
          {
            id: '2',
            type: 'checkbox' as const,
            question: '제품의 어떤 기능이 유용했나요?',
            options: ['사용 편의성', '디자인', '성능', '가격', '브랜드']
          },
          {
            id: '3',
            type: 'text' as const,
            question: '제품에 대한 전반적인 의견을 남겨주세요.',
            options: []
          }
        ],
        createdAt: '2024-01-12'
      };
      
      const sampleSurveyData3 = {
        id: '3',
        title: '서비스 개선 의견 수집',
        questions: [
          {
            id: '1',
            type: 'radio' as const,
            question: '현재 서비스 이용 빈도는?',
            options: ['매일', '주 2-3회', '주 1회', '월 1-2회', '거의 사용 안함']
          },
          {
            id: '2',
            type: 'checkbox' as const,
            question: '개선이 필요한 부분은? (복수 선택)',
            options: ['속도 개선', 'UI/UX 개선', '기능 추가', '고객 지원', '가격 정책']
          },
          {
            id: '3',
            type: 'text' as const,
            question: '서비스 개선을 위한 구체적인 제안사항이 있다면 작성해주세요.',
            options: []
          }
        ],
        createdAt: '2024-01-10'
      };
      
      localStorage.setItem('survey_2', JSON.stringify(sampleSurveyData2));
      localStorage.setItem('survey_3', JSON.stringify(sampleSurveyData3));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      
      {/* Hero Section */}
      <div 
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }}></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
                데이터 기반 의사결정을 위한
              </span>
              <br />
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
                스마트 설문 플랫폼
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Q+rate로 설문을 생성하고 실시간으로 인사이트를 얻으세요.
              <br />
              강력한 데이터 시각화로 더 나은 결정을 내릴 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/create"
                className="relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105 text-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <i className="ri-add-circle-line mr-3 text-xl relative z-10"></i>
                <span className="relative z-10">무료로 시작하기</span>
              </Link>
              <Link 
                to="/templates"
                className="relative inline-flex items-center px-8 py-4 font-semibold rounded-2xl cursor-pointer whitespace-nowrap transition-all duration-500 text-lg overflow-hidden group backdrop-blur-xl bg-white/60 border border-white/40 text-violet-600 hover:bg-white/80 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <i className="ri-file-list-3-line mr-3 text-xl"></i>
                템플릿 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
              왜 Q+rate를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600">
              전문적인 설문 조사를 위한 완벽한 솔루션
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl shadow-violet-500/10 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:scale-105 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                <i className="ri-flashlight-fill text-white text-3xl relative z-10"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 relative z-10">빠른 설문 생성</h3>
              <p className="text-gray-600 text-lg relative z-10">
                직관적인 인터페이스로 몇 분 만에 전문적인 설문을 만들 수 있습니다
              </p>
            </div>
            
            <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-fuchsia-500 to-pink-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                <i className="ri-line-chart-fill text-white text-3xl relative z-10"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 relative z-10">실시간 분석</h3>
              <p className="text-gray-600 text-lg relative z-10">
                응답 데이터를 실시간으로 시각화하여 즉각적인 인사이트를 제공합니다
              </p>
            </div>
            
            <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl shadow-fuchsia-500/10 hover:shadow-2xl hover:shadow-fuchsia-500/20 transition-all duration-500 hover:scale-105 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                <i className="ri-team-fill text-white text-3xl relative z-10"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 relative z-10">협업 기능</h3>
              <p className="text-gray-600 text-lg relative z-10">
                팀원들과 함께 설문을 관리하고 결과를 공유할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Surveys Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">최근 생성된 설문</h2>
            <Link 
              to="/create"
              className="relative inline-flex items-center px-6 py-3 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <i className="ri-add-line mr-2 relative z-10"></i>
              <span className="relative z-10">새 설문 만들기</span>
            </Link>
          </div>
          
          {surveys.length === 0 ? (
            <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-16 text-center border border-white/40 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 opacity-20"></div>
                <i className="ri-survey-line text-violet-600 text-4xl relative z-10"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 relative z-10">아직 생성된 설문이 없습니다</h3>
              <p className="text-gray-600 mb-8 text-lg relative z-10">첫 번째 설문을 만들어보세요!</p>
              <Link 
                to="/create"
                className="relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <i className="ri-add-line mr-2 relative z-10"></i>
                <span className="relative z-10">설문 생성하기</span>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <div 
                  key={survey.id}
                  className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                        <i className="ri-file-list-3-line text-white text-xl relative z-10"></i>
                      </div>
                      <span className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40">
                        {survey.createdAt}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                      {survey.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        {survey.responseCount}명 응답
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link 
                        to={`/survey/${survey.id}`}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-gray-700 font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/40"
                      >
                        <i className="ri-edit-line mr-2"></i>
                        응답하기
                      </Link>
                      <Link 
                        to={`/results/${survey.id}`}
                        className="relative flex-1 inline-flex items-center justify-center px-4 py-2 text-white font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <i className="ri-bar-chart-line mr-2 relative z-10"></i>
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

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-white/60 border-t border-white/40 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <i className="ri-bar-chart-box-fill text-white text-xl"></i>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent" style={{ fontFamily: '"Poppins", sans-serif' }}>
                Q+rate
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              © 2024 Q+rate. All rights reserved.
            </p>
            <a 
              href="https://readdy.ai/?origin=logo" 
              className="text-violet-600 hover:text-violet-700 transition-colors duration-300 font-medium"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
