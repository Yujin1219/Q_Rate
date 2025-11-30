// src/pages/login/LoginForm.tsx
// 실제 로그인 폼만 담당하는 컴포넌트 (레이아웃은 AuthLayout이 담당)

import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  // 페이지 이동을 위한 훅
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 or 폼 제출 시 실행
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 새로고침 막기

    // 간단한 유효성 검사
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 회원가입 시 저장해둔 userInfo 읽기
    const storedUser = localStorage.getItem('userInfo');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // 저장된 이메일/비밀번호와 일치하는지 확인
        if (parsedUser.email === email && parsedUser.password === password) {
          // 로그인 성공 처리

          //  accessToken 을 가짜 값으로 저장
          localStorage.setItem('accessToken', 'mock-token-12345');

          // 나중에 API 호출 등에 쓸 수 있도록 userId도 보관
          if (parsedUser.userId) {
            localStorage.setItem('userId', parsedUser.userId);
          }

          alert(`${parsedUser.name}님 환영합니다!`);
          navigate('/'); // 메인 페이지로 이동
          return;
        }
      } catch (err) {
        console.error('userInfo 파싱 실패:', err);
      }
    }

    // 위 조건을 모두 통과하지 못하면 실패
    alert('이메일 또는 비밀번호가 일치하지 않거나 가입된 정보가 없습니다.');
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* 이메일 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          required
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          required
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-inner"
        />
      </div>

      {/* 로그인 상태 유지 체크박스 */}
      <div className="flex items-center text-sm">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
          />
          <span className="ml-2 text-gray-600">로그인 상태 유지</span>
        </label>
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

      {/* 회원가입 페이지로 이동 링크 */}
      <div className="text-center pt-4">
        <span className="text-gray-600">계정이 없으신가요? </span>
        <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-medium">
          회원가입
        </Link>
      </div>
    </form>
  );
}
