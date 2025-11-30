
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
  respondedAt: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '유진',
    email: 'jin@gmail.com',
    gender: '여성',
    age: '19-24',
    joinDate: '2025-11-01'
  });

  const [respondedSurveys, setRespondedSurveys] = useState<RespondedSurvey[]>([
    {
      id: '1',
      title: '고객 만족도 조사',
      respondedAt: '2025-11-20'
    },
    {
      id: '2',
      title: '제품 피드백 설문',
      respondedAt: '2025-11-18'
    },
    {
      id: '3',
      title: '서비스 개선 의견 수집',
      respondedAt: '2025-11-15'
    }
  ]);

  useEffect(() => {
    // LocalStorage에서 사용자 정보 불러오기
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const parsed = JSON.parse(savedUserInfo);
      setUserInfo(parsed);
    }

    // 응답한 설문 목록 불러오기
    const savedResponses = localStorage.getItem('myResponses');
    if (savedResponses) {
      setRespondedSurveys(JSON.parse(savedResponses));
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
                createdSurveyCount={0}
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
