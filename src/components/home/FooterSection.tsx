export default function FooterSection() {
  return (
    <footer className="backdrop-blur-xl bg-white/60 border-t border-white/40 py-12">
      <div className="max-w-6xl mx-auto text-center px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-white/30 to-transparent"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <i className="ri-bar-chart-box-fill text-white text-xl"></i>
            </div>
          </div>

          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Q+rate
          </span>
        </div>

        <p className="text-gray-600 mb-2">
          © 2024 Q+rate. All rights reserved.
        </p>

        <a
          href="https://readdy.ai/?origin=logo"
          className="text-violet-600 hover:text-violet-700 transition"
        >
          Powered by Readdy
        </a>
      </div>
    </footer>
  );
}
