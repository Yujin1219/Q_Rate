import { useState, useEffect } from "react";
import Header from "../../components/feature/Header";
import HeroSection from "../../components/home/HeroSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import RecentSurveys from "../../components/home/RecentSurveys";
import FooterSection from "../../components/home/FooterSection";

// sample data import
import {
  sampleSurveys,
  sampleSurveyData1,
  sampleSurveyData2,
  sampleSurveyData3,
} from "../../data/sampleSurveys";

export interface Survey {
  id: string;
  title: string;
  createdAt: string;
  responseCount: number;
}

export default function HomePage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    /** 1) LocalStorage에서 기존 설문 목록 불러오기 */
    const savedSurveys = localStorage.getItem("surveys");

    if (savedSurveys) {
      setSurveys(JSON.parse(savedSurveys));
    } else {
      /** 2) 최초 진입 시 샘플 설문 자동 생성 */
      setSurveys(sampleSurveys);

      localStorage.setItem("surveys", JSON.stringify(sampleSurveys));
      localStorage.setItem("survey_1", JSON.stringify(sampleSurveyData1));
      localStorage.setItem("survey_2", JSON.stringify(sampleSurveyData2));
      localStorage.setItem("survey_3", JSON.stringify(sampleSurveyData3));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <RecentSurveys surveys={surveys} />
      <FooterSection />
    </div>
  );
}
