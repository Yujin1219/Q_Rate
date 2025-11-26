import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  // 페이지 이동을 시켜주는 도구 (성공 시 메인으로 보내기 위함)
  const navigate = useNavigate();
  
  // [1. 상태 관리] 사용자가 입력한 이메일과 비밀번호를 저장하는 공간
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // [2. 로그인 버튼 클릭 핸들러]
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지 (필수!)
    
    // [유효성 검사] 빈칸이 있는지 확인
    if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
    }
    
    // [3. 회원 대조] 아까 회원가입할 때 브라우저에 저장해둔 정보를 꺼내옴
    const storedUser = localStorage.getItem('userInfo');
    
    if (storedUser) {
        // 저장된 문자열을 자바스크립트 객체로 변환
        const parsedUser = JSON.parse(storedUser);
        
        // [4. 정보 일치 확인]
        // 저장된 이메일과 입력한 이메일이 같은지 비교 (간단한 검증)
        // *실무에서는 서버로 데이터를 보내서 비밀번호까지 검증해야 함
        if (parsedUser.email === email) {
            
            // [5. 로그인 성공 처리]
            // 'accessToken'이라는 이름으로 가짜 토큰을 저장함
            // -> 이것이 있어야 헤더에서 '로그인 상태'임을 알 수 있음
            localStorage.setItem('accessToken', 'mock-token-12345');
            
            alert(`${parsedUser.name}님 환영합니다!`);
            navigate('/'); // 메인 페이지로 이동
            return;
        }
    }
    
    // [6. 실패 처리] 정보가 없거나 이메일이 다를 때
    alert('이메일이 일치하지 않거나 가입된 정보가 없습니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center px-4">
      {/* 배경 장식 (보라색 원형 그라디언트) */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
      }}></div>

      <div className="relative w-full max-w-md">
        {/* 로고 (클릭 시 홈으로 이동) */}
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

        {/* 로그인 입력 카드 */}
        <div className="relative backdrop-blur-2xl bg-white/70 rounded-3xl p-8 border border-white/40 shadow-2xl shadow-violet-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                로그인
              </h1>
              <p className="text-gray-600">Q+rate에 오신 것을 환영합니다</p>
            </div>

            {/* 입력 폼: 엔터 키나 버튼 클릭 시 handleLogin 실행 */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // 입력할 때마다 email 상태 업데이트
                  placeholder="이메일을 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // 입력할 때마다 password 상태 업데이트
                  placeholder="비밀번호를 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-600">로그인 상태 유지</span>
                </label>
                <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">
                  비밀번호 찾기
                </a>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="relative w-full py-3 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <span className="relative z-10">로그인</span>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/40"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/60 backdrop-blur-xl text-gray-600 rounded-full">또는</span>
                </div>
              </div>

              {/* 소셜 로그인 버튼 (UI만 존재) */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center px-4 py-3 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group backdrop-blur-xl bg-white/60 border border-white/40 text-gray-700 hover:bg-white/80 shadow-lg hover:shadow-xl"
                >
                  <i className="ri-google-fill text-xl mr-2 text-red-500"></i>
                  Google
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center px-4 py-3 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group backdrop-blur-xl bg-white/60 border border-white/40 text-gray-700 hover:bg-white/80 shadow-lg hover:shadow-xl"
                >
                  <i className="ri-kakao-talk-fill text-xl mr-2 text-yellow-500"></i>
                  Kakao
                </button>
              </div>

              {/* 회원가입 페이지 이동 링크 */}
              <div className="text-center pt-4">
                <span className="text-gray-600">계정이 없으신가요? </span>
                <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-medium">
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </div>

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