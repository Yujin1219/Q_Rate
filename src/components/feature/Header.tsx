
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg shadow-violet-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-xl shadow-violet-500/30 group-hover:shadow-2xl group-hover:shadow-violet-500/40 transition-all duration-500 group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <i className="ri-bar-chart-box-fill text-white text-xl drop-shadow-lg"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm" style={{ fontFamily: '"Poppins", sans-serif' }}>
                Q+rate
              </span>
              <span className="text-xs text-gray-500/80 -mt-1">Survey Insights Platform</span>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center space-x-2">
            <Link
              to="/create"
              className={`relative inline-flex items-center px-5 py-2.5 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group ${
                isActive('/create')
                  ? 'text-white shadow-lg shadow-violet-500/30'
                  : 'text-gray-700 hover:text-violet-600'
              }`}
            >
              {isActive('/create') && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </>
              )}
              {!isActive('/create') && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              <i className="ri-add-circle-line mr-2 relative z-10"></i>
              <span className="relative z-10">새 설문 만들기</span>
            </Link>
            <Link
              to="/templates"
              className={`relative inline-flex items-center px-5 py-2.5 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group ${
                isActive('/templates')
                  ? 'text-white shadow-lg shadow-violet-500/30'
                  : 'text-gray-700 hover:text-violet-600'
              }`}
            >
              {isActive('/templates') && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </>
              )}
              {!isActive('/templates') && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              <i className="ri-file-list-3-line mr-2 relative z-10"></i>
              <span className="relative z-10">설문 템플릿</span>
            </Link>
            <Link
              to="/"
              className={`relative inline-flex items-center px-5 py-2.5 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group ${
                isActive('/')
                  ? 'text-white shadow-lg shadow-violet-500/30'
                  : 'text-gray-700 hover:text-violet-600'
              }`}
            >
              {isActive('/') && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </>
              )}
              {!isActive('/') && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              <i className="ri-bar-chart-line mr-2 relative z-10"></i>
              <span className="relative z-10">설문 결과 보기</span>
            </Link>
          </nav>

          {/* 로그인/마이페이지 */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="relative inline-flex items-center px-5 py-2.5 text-gray-700 font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group hover:text-violet-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <i className="ri-login-box-line mr-2 relative z-10"></i>
              <span className="relative z-10">로그인</span>
            </Link>
            <Link
              to="/mypage"
              className="relative inline-flex items-center px-6 py-2.5 text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-500 overflow-hidden group shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <i className="ri-user-line mr-2 relative z-10"></i>
              <span className="relative z-10">마이페이지</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
