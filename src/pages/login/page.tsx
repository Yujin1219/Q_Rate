
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 (추후 Supabase 연동)
    console.log('Login:', { email, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
      }}></div>

      <div className="relative w-full max-w-md">
        {/* 로고 */}
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

        {/* 로그인 카드 */}
        <div className="relative backdrop-blur-2xl bg-white/70 rounded-3xl p-8 border border-white/40 shadow-2xl shadow-violet-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                로그인
              </h1>
              <p className="text-gray-600">Q+rate에 오신 것을 환영합니다</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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

              <div className="text-center pt-4">
                <span className="text-gray-600">계정이 없으신가요? </span>
                <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-medium">
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* 홈으로 돌아가기 */}
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
