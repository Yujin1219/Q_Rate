
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '남성',
    age: '25-34'
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 로직 (추후 Supabase 연동)
    const userInfo = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      age: formData.age,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log('Signup:', formData);
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center px-4 py-12">
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

        {/* 회원가입 카드 */}
        <div className="relative backdrop-blur-2xl bg-white/70 rounded-3xl p-8 border border-white/40 shadow-2xl shadow-violet-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                회원가입
              </h1>
              <p className="text-gray-600">Q+rate와 함께 시작하세요</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
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

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
                <label className="ml-2 text-sm text-gray-600">
                  <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">이용약관</a> 및 <a href="#" className="text-violet-600 hover:text-violet-700 font-medium">개인정보처리방침</a>에 동의합니다
                </label>
              </div>

              <button
                type="submit"
                className="relative w-full py-3 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <span className="relative z-10">회원가입</span>
              </button>

              <div className="text-center pt-4">
                <span className="text-gray-600">이미 계정이 있으신가요? </span>
                <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
                  로그인
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
