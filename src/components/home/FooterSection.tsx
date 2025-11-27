import logo from "../../assets/logo.svg";

// footer 섹션
export default function FooterSection() {
  return (
    <footer className="backdrop-blur-xl bg-white/60 border-t border-white/40 py-12">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* 로고 및 사이트명 */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img src={logo} alt="Q+rate Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Q+rate
          </span>
        </div>

        {/* 저작권 정보 */}
        <p className="text-gray-600 mb-2">
          © 2025 Q+rate. All rights reserved.
        </p>

        {/* 개발팀 정보 */}
        <p className="text-violet-600 hover:text-violet-700 transition">
          A Project by the Q+rate Development Team
        </p>
      </div>
    </footer>
  );
}
