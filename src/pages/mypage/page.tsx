
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';

interface UserInfo {
  name: string;
  email: string;
  gender: string;
  age: string;
  joinDate: string;
}

interface RespondedSurvey {
  id: string;
  title: string;
  respondedAt: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '김설문',
    email: 'survey@example.com',
    gender: '여성',
    age: '25-34',
    joinDate: '2024-01-01'
  });

  const [respondedSurveys, setRespondedSurveys] = useState<RespondedSurvey[]>([
    {
      id: '1',
      title: '고객 만족도 조사',
      respondedAt: '2024-01-20'
    },
    {
      id: '2',
      title: '제품 피드백 설문',
      respondedAt: '2024-01-18'
    },
    {
      id: '3',
      title: '서비스 개선 의견 수집',
      respondedAt: '2024-01-15'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userInfo);

  useEffect(() => {
    // LocalStorage에서 사용자 정보 불러오기
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const parsed = JSON.parse(savedUserInfo);
      setUserInfo(parsed);
      setEditForm(parsed);
    }

    // 응답한 설문 목록 불러오기
    const savedResponses = localStorage.getItem('myResponses');
    if (savedResponses) {
      setRespondedSurveys(JSON.parse(savedResponses));
    }
  }, []);

  const handleSave = () => {
    setUserInfo(editForm);
    localStorage.setItem('userInfo', JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
              마이페이지
            </h1>
            <p className="text-gray-600 text-lg">내 정보와 활동 내역을 확인하세요</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 왼쪽: 프로필 카드 */}
            <div className="lg:col-span-1">
              <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
                
                <div className="relative z-10">
                  {/* 프로필 이미지 */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl shadow-violet-500/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
                      <div className="relative w-full h-full flex items-center justify-center">
                        <i className="ri-user-fill text-white text-6xl"></i>
                      </div>
                    </div>
                  </div>

                  {/* 사용자 정보 */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{userInfo.name}</h2>
                    <p className="text-gray-600">{userInfo.email}</p>
                  </div>

                  {/* 통계 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-4 border border-white/40 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent"></div>
                      <div className="relative z-10">
                        <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                          {respondedSurveys.length}
                        </div>
                        <div className="text-sm text-gray-600">응답한 설문</div>
                      </div>
                    </div>
                    <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-4 border border-white/40 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
                      <div className="relative z-10">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-1">
                          0
                        </div>
                        <div className="text-sm text-gray-600">생성한 설문</div>
                      </div>
                    </div>
                  </div>

                  {/* 가입일 */}
                  <div className="text-center text-sm text-gray-600">
                    <i className="ri-calendar-line mr-1"></i>
                    가입일: {userInfo.joinDate}
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 상세 정보 및 활동 내역 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 기본 정보 */}
              <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">기본 정보</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="relative inline-flex items-center px-5 py-2.5 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <i className="ri-edit-line mr-2 relative z-10"></i>
                        <span className="relative z-10">수정</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancel}
                          className="relative inline-flex items-center px-5 py-2.5 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group backdrop-blur-xl bg-white/60 border border-white/40 text-gray-700 hover:bg-white/80"
                        >
                          <i className="ri-close-line mr-2"></i>
                          취소
                        </button>
                        <button
                          onClick={handleSave}
                          className="relative inline-flex items-center px-5 py-2.5 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                          <i className="ri-save-line mr-2 relative z-10"></i>
                          <span className="relative z-10">저장</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                          {userInfo.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                          {userInfo.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                      {isEditing ? (
                        <div className="relative">
                          <select
                            value={editForm.gender}
                            onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                            className="w-full px-4 py-3 pr-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner appearance-none cursor-pointer"
                          >
                            <option value="남성">남성</option>
                            <option value="여성">여성</option>
                            <option value="기타">기타</option>
                          </select>
                          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                        </div>
                      ) : (
                        <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                          {userInfo.gender}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
                      {isEditing ? (
                        <div className="relative">
                          <select
                            value={editForm.age}
                            onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                            className="w-full px-4 py-3 pr-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner appearance-none cursor-pointer"
                          >
                            <option value="18-24">18-24세</option>
                            <option value="25-34">25-34세</option>
                            <option value="35-44">35-44세</option>
                            <option value="45-54">45-54세</option>
                            <option value="55-64">55-64세</option>
                            <option value="65+">65세 이상</option>
                          </select>
                          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                        </div>
                      ) : (
                        <div className="px-4 py-3 bg-white/40 backdrop-blur-xl border border-white/30 rounded-xl text-gray-800">
                          {userInfo.age}세
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 응답한 설문 목록 */}
              <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-transparent"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">응답한 설문</h3>
                  
                  {respondedSurveys.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 opacity-20"></div>
                        <i className="ri-survey-line text-violet-600 text-4xl relative z-10"></i>
                      </div>
                      <p className="text-gray-600">아직 응답한 설문이 없습니다</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {respondedSurveys.map((survey) => (
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-white/60 border-t border-white/40 py-12 mt-12">
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
