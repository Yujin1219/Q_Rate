// src/pages/login_signup_auth/AuthLayout.tsx
// 로그인 / 회원가입 페이지의 공통 레이아웃 컴포넌트
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

// children: 안에 들어갈 실제 폼(LoginForm, SignupForm)
// title: "로그인" / "회원가입"
// subtitle: 작은 설명 문구
interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center px-4 py-12">
      {/* 배경 그라디언트 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
        }}
      ></div>

      <div className="relative w-full max-w-md">
        {/* 상단 로고 */}
        <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
          <img src={logo} alt="Q+rate Logo" className="w-14 h-14 object-contain" />
          <span
            className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Q+rate
          </span>
        </Link>

        {/* 카드 */}
        <div className="relative backdrop-blur-2xl bg-white/70 rounded-3xl p-8 border border-white/40 shadow-2xl shadow-violet-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/50 rounded-3xl"></div>

          <div className="relative z-10">
            {/* 제목 / 서브텍스트 */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                {title}
              </h1>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>

            {/* 실제 폼 내용 */}
            {children}
          </div>
        </div>

        {/* 하단 홈으로 */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-violet-600 transition-colors duration-300"
          >
            <i className="ri-arrow-left-line mr-1"></i>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
