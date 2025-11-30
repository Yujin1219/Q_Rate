interface ProfileCardProps {
  name: string;
  email: string;
  joinDate: string;
  surveyCount: number;
  createdSurveyCount?: number;
}

export default function ProfileCard({
  name,
  email,
  joinDate,
  surveyCount,
  createdSurveyCount = 0
}: ProfileCardProps) {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5"></div>

      <div className="relative z-10">
        {/* 프로필 이미지 */}
        <div className="flex justify-center mb-3">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden">
            <img
              src="/src/assets/default_profile.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-4 border border-white/40 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {surveyCount}
              </div>
              <div className="text-sm text-gray-600">응답한 설문</div>
            </div>
          </div>
          <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-4 border border-white/40 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-1">
                {createdSurveyCount}
              </div>
              <div className="text-sm text-gray-600">생성한 설문</div>
            </div>
          </div>
        </div>

        {/* 가입일 */}
        <div className="text-center text-sm text-gray-600">
          <i className="ri-calendar-line mr-1"></i>
          가입일: {joinDate}
        </div>
      </div>
    </div>
  );
}
