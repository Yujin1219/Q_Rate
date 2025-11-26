import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  // 페이지 이동을 도와주는 훅 (회원가입 성공 시 로그인 페이지로 이동)
  const navigate = useNavigate();
  
  // [1. 상태 관리 (State)]
  // 사용자가 입력하는 모든 데이터를 실시간으로 저장하는 객체입니다.
  // - 초기값: 텍스트는 빈칸(''), 선택형은 기본값('남성', '25-34'), 체크박스는 해제(false)로 설정
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '남성',
    age: '25-34',
    isAgreed: false, 
  });

  // [2. 회원가입 버튼 클릭 핸들러]
  const handleSignup = (e: React.FormEvent) => {
    // 폼 제출 시 브라우저가 자동으로 새로고침되는 것을 막습니다. 
    e.preventDefault(); 
    
    // [유효성 검사 1] 비밀번호 일치 여부 확인
    // 비밀번호와 확인란의 값이 다르면 경고창을 띄우고 함수를 종료합니다.
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // [유효성 검사 2] 약관 동의 여부 확인
    // 체크박스가 체크되지 않았으면(false) 경고창을 띄우고 진행을 막음
    if (!formData.isAgreed) {
      alert('이용약관 및 개인정보처리방침에 동의해주세요.');
      return;
    }

    // [데이터 저장] 백엔드 없이 테스트하기 위해 브라우저 저장소(LocalStorage) 사용
    // 입력된 데이터를 userInfo라는 객체로 묶어서 저장할 준비를 합니다.
    const userInfo = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      age: formData.age,
      joinDate: new Date().toISOString().split('T')[0] // 가입일(오늘 날짜) 자동 생성
    };
    
    // 객체를 문자열로 변환(JSON.stringify)하여 로컬 스토리지에 저장합니다.
    // 이 정보는 나중에 로그인 페이지에서 사용됩니다.
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    console.log('Signup Success:', formData); // 개발자 확인용 로그
    alert('회원가입 완료! 로그인 페이지로 이동합니다.');
    
    // 모든 절차가 끝나면 로그인 페이지로 강제 이동합니다.
    navigate('/login');
  };

  // [3. 입력값 변경 감지 핸들러]
  // input이나 select 태그의 값이 바뀔 때마다 실행되어 상태(state)를 업데이트합니다.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // 기존 데이터(...formData)는 유지한 채, 변경된 항목만 업데이트합니다.
    setFormData({
      ...formData,
      // 만약 입력 타입이 체크박스라면 checked 값을, 아니라면 value 값을 사용합니다.
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center px-4 py-12">
      {/* 배경 장식 (그라디언트 효과) */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
      }}></div>

      <div className="relative w-full max-w-md">
        {/* 로고 영역 (클릭 시 홈으로 이동) */}
        <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-violet-500/30 group-hover:shadow-2xl group-hover:shadow-violet-500/40 transition-all duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <i className="ri-bar-chart-box-fill text-white text-2xl drop-shadow-lg"></i>
            </div>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm" style={{ fontFamily: '"Poppins", sans-serif' }}>
            Q+rate
          </span>
        </Link>

        {/* 회원가입 폼 컨테이너 */}
        <div className="relative backdrop-blur-2xl bg-white/70 rounded-3xl p-8 border border-white/40 shadow-2xl shadow-violet-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                회원가입
              </h1>
              <p className="text-gray-600">Q+rate와 함께 시작하세요</p>
            </div>

            {/* 입력 폼: 제출 시 handleSignup 함수 실행 */}
            <form onSubmit={handleSignup} className="space-y-5">
              {/* 이름 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>

              {/* 이메일 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>

              {/* 성별 및 나이 선택 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 shadow-inner appearance-none cursor-pointer"
                    >
                      <option value="남성">남성</option>
                      <option value="여성">여성</option>
                      <option value="기타">기타</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
                  <div className="relative">
                    <select
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
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
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>

              {/* 비밀번호 확인 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>

              {/* 약관 동의 체크박스 */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="isAgreed"
                  checked={formData.isAgreed}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
                <label className="ml-2 text-sm text-gray-600">
                  <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">이용약관</a> 및 <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">개인정보처리방침</a>에 동의합니다
                </label>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="relative w-full py-3 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <span className="relative z-10">회원가입</span>
              </button>

              {/* 로그인 페이지 이동 링크 */}
              <div className="text-center pt-4">
                <span className="text-gray-600">이미 계정이 있으신가요? </span>
                <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
                  로그인
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* 하단 홈으로 가기 버튼 */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors duration-300">
            <i className="ri-arrow-left-line mr-1"></i>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}