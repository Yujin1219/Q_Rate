import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/feature/Header";
import FooterSection from "../../components/home/FooterSection";
import PageHeader from "../../components/feature/PageHeader";

interface StoredSurvey {
  id: string;
  title: string;
  createdAt?: string; // 설문 생성일
  creatorId?: string; // 설문 생성자 ID
  responseCount?: number; // 응답 수
  questions?: Array<unknown>; // 문항 목록
}

export default function MySurveysPage() {
  // 사용자 정보 상태
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // 설문 목록
  const [surveys, setSurveys] = useState<StoredSurvey[]>([]);

  // 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 저장된 토큰 확인 → 로그인 여부 판단
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    // userId 기본값
    const storedUserId = localStorage.getItem("userId");
    let resolvedUserId = storedUserId ?? null;

    // 저장된 사용자 정보 불러오기
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        setUserName(parsed.name ?? null);
        setUserEmail(parsed.email ?? null);

        // userInfo 안에 있는 userId가 있으면 우선 적용
        resolvedUserId = parsed.userId || resolvedUserId;
      } catch (err) {
        console.error("사용자 정보 파싱 오류:", err);
      }
    }

    setUserId(resolvedUserId);

    // 저장된 설문 목록 로드
    const savedSurveys = localStorage.getItem("surveys");
    if (savedSurveys) {
      try {
        setSurveys(JSON.parse(savedSurveys));
      } catch (err) {
        console.error("설문 목록 파싱 오류:", err);
      }
    }
  }, []);

  // 로그인한 사용자가 만든 설문만 필터링
  const mySurveys = useMemo(() => {
    if (!isLoggedIn) return [];
    if (!userId && !userEmail) return [];

    return surveys.filter(
      (survey) =>
        (userId && survey.creatorId === userId) ||
        (userEmail && survey.creatorId === userEmail)
    );
  }, [surveys, userId, userEmail, isLoggedIn]);

  // 설문이 없는 경우 표시 컴포넌트
  const renderEmptyState = () => {
    if (!isLoggedIn) {
      // 비로그인 상태
      return (
        <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-12 text-center border border-white/40 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            로그인 후 이용 가능합니다
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            내가 만든 설문을 확인하려면 먼저 로그인해주세요.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition relative overflow-hidden"
            >
              <span className="relative z-10">로그인 하러가기</span>
            </Link>
          </div>
        </div>
      );
    }

    // 로그인했지만 설문이 없는 상태
    return (
      <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-12 text-center border border-white/40 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent"></div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          아직 생성한 설문이 없어요
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          첫 번째 설문을 만들어보세요!
        </p>
        <Link
          to="/create"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition relative overflow-hidden"
        >
          <i className="ri-add-line mr-2 relative z-10"></i>
          <span className="relative z-10">새 설문 만들기</span>
        </Link>
      </div>
    );
  };

  const handleDeleteSurvey = (surveyId: string) => {
    if (
      !window.confirm("해당 설문을 삭제하면 복구할 수 없습니다. 삭제할까요?")
    ) {
      return;
    }

    const updated = surveys.filter((survey) => survey.id !== surveyId);
    setSurveys(updated);
    localStorage.setItem("surveys", JSON.stringify(updated));
    localStorage.removeItem(`survey_${surveyId}`);
    localStorage.removeItem(`responses_${surveyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="내가 만든 설문"
          description={
            isLoggedIn
              ? `${userName ?? "사용자"}님이 생성한 설문 목록입니다.`
              : "로그인 후 내가 만든 설문을 확인할 수 있습니다."
          }
          // 로그인 시에만 상단 우측 "새 설문 만들기" 버튼 표시
          actions={
            isLoggedIn ? (
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 text-white font-medium rounded-full shadow-lg shadow-violet-500/30 hover:shadow-xl hover:scale-105 transition relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <i className="ri-add-line mr-2 text-lg relative z-10"></i>
                <span className="relative z-10">새 설문 만들기</span>
              </Link>
            ) : undefined
          }
        />

        <div className="max-w-6xl mx-auto mt-6">
          {/* 설문이 없으면 빈 상태 컴포넌트 표시 */}
          {mySurveys.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {mySurveys.map((survey) => {
                const createdAt = survey.createdAt ?? "생성일 미정";
                const responseCount = survey.responseCount ?? 0;
                const questionCount = Array.isArray(survey.questions)
                  ? survey.questions.length
                  : 0;

                return (
                  <div
                    key={survey.id}
                    className="relative backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* 설문 제목 + 생성일 */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            생성일 {createdAt}
                          </p>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                            {survey.title}
                          </h3>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* 문항 수 */}
                          <span className="px-3 py-1 rounded-full text-sm bg-white/70 border border-white/60 text-gray-700">
                            {questionCount}문항
                          </span>
                          <button
                            onClick={() => handleDeleteSurvey(survey.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
                            aria-label="설문 삭제"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                      </div>

                      {/* 응답 수 */}
                      <p className="text-gray-600 mb-6 flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        현재 {responseCount}명이 응답했습니다
                      </p>

                      {/* 설문 열기 / 결과 보기 버튼 */}
                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <Link
                          to={`/survey/${survey.id}`}
                          className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white transition text-center font-medium text-gray-700"
                        >
                          설문 열기
                        </Link>
                        <Link
                          to={`/results/${survey.id}`}
                          className="relative inline-flex items-center justify-center px-4 py-2 text-white font-medium rounded-xl overflow-hidden group shadow-md hover:shadow-lg"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                          <span className="relative z-10">결과 보기</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
