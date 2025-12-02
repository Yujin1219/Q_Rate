
import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import FooterSection from '../../components/home/FooterSection';
import ProfileCard from '../../components/mypage/ProfileCard';
import UserInfoForm from '../../components/mypage/UserInfoForm';
import RespondedSurveyList from '../../components/mypage/RespondedSurveyList';

interface UserInfo {
  name: string;
  email: string;
  gender: string;
  age: string;
  joinDate: string;
}

interface RespondedSurvey {
  id: string;
  title: string;
  responderId: string;
  respondedAt: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    gender: '',
    age: '',
    joinDate: ''
  });

  const [respondedSurveys, setRespondedSurveys] = useState<RespondedSurvey[]>([]);

  const [createdSurveyCount, setCreatedSurveyCount] = useState(0);

  useEffect(() => {
    // LocalStorage에서 사용자 정보 불러오기
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const parsed = JSON.parse(savedUserInfo);
      setUserInfo(parsed);

      // 현재 사용자가 생성한 설문 개수 계산
      const savedSurveys = localStorage.getItem('surveys');
      if (savedSurveys) {
        try {
          const surveys = JSON.parse(savedSurveys);
          const userEmail = parsed.email;
          const count = surveys.filter((survey: any) => survey.creatorId === userEmail).length;
          setCreatedSurveyCount(count);
        } catch (err) {
          console.error('설문 목록 파싱 오류:', err);
        }
      }

      // 응답한 설문 목록 불러오기 (로그인한 사용자의 것만)
      const savedResponses = localStorage.getItem('myResponses');
      if (savedResponses) {
        try {
          const allResponses = JSON.parse(savedResponses);
          const userEmail = parsed.email;
          // 현재 로그인한 사용자의 응답만 필터링
          const filteredResponses = allResponses.filter((response: any) => response.responderId === userEmail);
          setRespondedSurveys(filteredResponses);
        } catch (err) {
          console.error('응답 목록 파싱 오류:', err);
        }
      }
    }
  }, []);

  const handleSaveUserInfo = (updatedInfo: UserInfo) => {
    setUserInfo(updatedInfo);
    localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
              마이페이지
            </h1>
            <p className="text-gray-600 text-lg">내 정보와 활동 내역을 확인하세요</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 왼쪽: 프로필 카드 */}
            <div className="lg:col-span-1">
              <ProfileCard
                name={userInfo.name}
                email={userInfo.email}
                joinDate={userInfo.joinDate}
                surveyCount={respondedSurveys.length}
                createdSurveyCount={createdSurveyCount}
              />
            </div>

            {/* 오른쪽: 상세 정보 및 활동 내역 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 기본 정보 */}
              <UserInfoForm
                userInfo={userInfo}
                onSave={handleSaveUserInfo}
              />

              {/* 응답한 설문 목록 */}
              <RespondedSurveyList surveys={respondedSurveys} />
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
