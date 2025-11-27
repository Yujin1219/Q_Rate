// React의 상태 관리 hook과 라우팅 hook을 import
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import PageHeader from '../../components/feature/PageHeader';
import SurveyTitleInput from '../../components/survey/SurveyTitleInput';
import QuestionEditor from '../../components/survey/QuestionEditor';
import SurveyPreview from '../../components/survey/SurveyPreview';

// 설문 문항의 타입 정의
export interface Question {
  id: string;  // 문항의 고유 식별자
  type: 'radio' | 'checkbox' | 'text';  // 문항 유형: 단일선택/복수선택/주관식
  question: string;  // 질문 내용
  options: string[];  // 선택지 배열 (객관식 문항에 사용)
}

// 설문 전체의 타입 정의
export interface Survey {
  id: string;  // 설문의 고유 식별자
  title: string;  // 설문 제목
  questions: Question[];  // 설문 문항들의 배열
  createdAt: string;  // 생성 날짜
}

export default function CreatePage() {
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();
  
  // 설문 제목 상태 관리
  const [surveyTitle, setSurveyTitle] = useState('');
  
  // 설문 문항들의 배열 상태 관리
  const [questions, setQuestions] = useState<Question[]>([]);
  
  /**
   * 새로운 문항을 추가하는 함수
   * - 기본값으로 단일선택(radio) 타입의 빈 문항을 생성
   * - 현재 시간을 id로 사용하여 고유성 보장
   */
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),  // 현재 타임스탬프를 문자열로 변환하여 고유 ID 생성
      type: 'radio',  // 기본값: 단일 선택
      question: '',  // 빈 질문
      options: ['']  // 빈 선택지 하나로 시작
    };
    // 기존 문항 배열에 새 문항 추가
    setQuestions([...questions, newQuestion]);
  };

  /**
   * 특정 문항의 필드를 업데이트하는 함수
   * @param id - 수정할 문항의 ID
   * @param field - 수정할 필드명 (type, question, options 등)
   * @param value - 새로운 값
   */
  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      // 해당 ID의 문항만 업데이트하고 나머지는 그대로 유지
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  /**
   * 특정 문항을 삭제하는 함수
   * @param id - 삭제할 문항의 ID
   */
  const deleteQuestion = (id: string) => {
    // 해당 ID가 아닌 문항들만 필터링하여 새 배열 생성
    setQuestions(questions.filter(q => q.id !== id));
  };

  /**
   * 특정 문항에 새로운 선택지를 추가하는 함수
   * @param questionId - 선택지를 추가할 문항의 ID
   */
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      // 해당 문항의 options 배열에 빈 문자열 추가
      q.id === questionId ? { ...q, options: [...q.options, ''] } : q
    ));
  };

  /**
   * 특정 문항의 특정 선택지를 수정하는 함수
   * @param questionId - 문항 ID
   * @param optionIndex - 수정할 선택지의 인덱스
   * @param value - 새로운 선택지 내용
   */
  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        // 해당 인덱스의 선택지만 업데이트
        options: q.options.map((opt, idx) => idx === optionIndex ? value : opt)
      } : q
    ));
  };

  /**
   * 특정 문항의 특정 선택지를 삭제하는 함수
   * @param questionId - 문항 ID
   * @param optionIndex - 삭제할 선택지의 인덱스
   */
  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        // 해당 인덱스가 아닌 선택지들만 필터링
        options: q.options.filter((_, idx) => idx !== optionIndex)
      } : q
    ));
  };

  /**
   * 설문을 저장하고 메인 페이지로 이동하는 함수
   * - 유효성 검사 수행
   * - localStorage에 설문 데이터 저장
   */
  const saveSurvey = () => {
    // 설문 제목이 비어있는지 검사
    if (!surveyTitle.trim()) {
      alert('설문 제목을 입력해주세요.');
      return;
    }

    // 최소 하나의 문항이 있는지 검사
    if (questions.length === 0) {
      alert('최소 하나의 문항을 추가해주세요.');
      return;
    }

    // 새 설문 객체 생성
    const newSurvey: Survey = {
      id: Date.now().toString(),  // 고유 ID 생성
      title: surveyTitle,
      questions,
      createdAt: new Date().toISOString().split('T')[0]  // YYYY-MM-DD 형식으로 날짜 저장
    };

    // localStorage에서 기존 설문 목록 가져오기
    const savedSurveys = localStorage.getItem('surveys');
    const surveys = savedSurveys ? JSON.parse(savedSurveys) : [];
    
    // 새 설문을 목록에 추가
    surveys.push(newSurvey);
    
    // 업데이트된 목록을 localStorage에 저장 (설문 목록용)
    localStorage.setItem('surveys', JSON.stringify(surveys));
    
    // 개별 설문도 별도로 저장 (설문 상세 조회용)
    localStorage.setItem(`survey_${newSurvey.id}`, JSON.stringify(newSurvey));

    // 메인 페이지로 이동
    navigate('/');
  };

  return (
    // 전체 페이지 컨테이너 - 보라색 그라데이션 배경
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />
      <div className="py-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <PageHeader
          title="새 설문 만들기"
          description="설문 제목과 문항을 추가하여 설문을 생성하세요"
          actions={
            <button
              onClick={saveSurvey}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
            >
              <i className="ri-save-line mr-2"></i>
              저장하기
            </button>
          }
        />
          {/* 2열 그리드 레이아웃: 편집 패널 / 미리보기 패널 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 왼쪽: 편집 패널 */}
            <div className="space-y-6">
              {/* 설문 제목 입력 섹션 */}
              <div className="space-y-6">
              <SurveyTitleInput 
                value={surveyTitle} 
                onChange={setSurveyTitle} 
              />

              {/* 문항 목록 섹션 */}
              <div className="space-y-4">
                {/* 각 문항을 순회하며 렌더링 */}
                {questions.map((question, index) => (
                  <QuestionEditor
                    key={question.id}
                    question={question}
                    index={index}
                    onUpdate={updateQuestion}
                    onDelete={deleteQuestion}
                    onAddOption={addOption}
                    onUpdateOption={updateOption}
                    onRemoveOption={removeOption}
                  />
                ))}

                {/* 새 문항 추가 버튼 */}
                <button
                  onClick={addQuestion}
                  className="w-full py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-purple-700 font-medium rounded-2xl cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/30 border-dashed"
                >
                  <i className="ri-add-circle-line mr-2 text-xl"></i>
                  새 문항 추가
                </button>
              </div>
            </div>

            {/* 오른쪽: 미리보기 패널 (sticky로 스크롤 시 상단 고정) */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                {/* 미리보기 헤더 */}
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-white/20">
                    <i className="ri-eye-line text-white"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">미리보기</h2>
                </div>

                {/* 설문 제목이 있을 때: 실제 설문 미리보기 표시 */}
               <SurveyPreview 
                  surveyTitle={surveyTitle} 
                  questions={questions} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};