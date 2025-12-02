export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 text-center px-6">
      <div className="mb-6">
        <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 drop-shadow">
          404
        </span>
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-purple-700">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-lg text-purple-500">
        요청하신 경로가 존재하지 않거나 이동되었어요.
      </p>
      <p className="text-lg text-purple-400">
        주소를 다시 확인하거나 홈으로 돌아가 주세요.
      </p>
    </div>
  );
}
