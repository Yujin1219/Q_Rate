import { useState, useEffect } from "react";
import Header from "../../components/feature/Header";
import HeroSection from "../../components/home/HeroSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import TemplateSection from "../../components/home/TemplateSection";
import SurveyTypesSection from "../../components/home/SurveyTypesSection";
import ResultVisualizationSection from "../../components/home/ResultVisualizationSection";
import RecentSurveys from "../../components/home/RecentSurveys";
import FooterSection from "../../components/home/FooterSection";

// 샘플 설문 데이터 임포트
import {
  sampleSurveys,
  sampleSurveyData1,
  sampleSurveyData2,
  sampleSurveyData3,
} from "../../data/sampleSurveys";

// 설문 정보 타입 정의
export interface Survey {
  id: string;
  title: string;
  createdAt: string;
  responseCount: number;
}

// 홈페이지 메인 컴포넌트
export default function HomePage() {
  const [surveys, setSurveys] = useState<Survey[]>([]); // 설문 목록 상태 관리

  // 페이지 로드 시 스크롤을 최상단으로 이동 (더 강력한 처리)
  useEffect(() => {
    // 즉시 실행
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 다음 프레임에서도 한 번 더 실행
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, []);

  // 페이지 로드 시 LocalStorage에서 설문 불러오기
  useEffect(() => {
    const savedSurveys = localStorage.getItem("surveys");

    if (savedSurveys) {
      // 저장된 설문이 있으면 로드
      setSurveys(JSON.parse(savedSurveys));
    } else {
      // 없으면 샘플 설문 자동 생성
      setSurveys(sampleSurveys);

      localStorage.setItem("surveys", JSON.stringify(sampleSurveys));
      localStorage.setItem("survey_1", JSON.stringify(sampleSurveyData1));
      localStorage.setItem("survey_2", JSON.stringify(sampleSurveyData2));
      localStorage.setItem("survey_3", JSON.stringify(sampleSurveyData3));
    }
  }, []);

  // 페이지 렌더링
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TemplateSection />
      <SurveyTypesSection />
      <ResultVisualizationSection />
      
      <RecentSurveys surveys={surveys} />
      <FooterSection />
    </div>
  );
}
