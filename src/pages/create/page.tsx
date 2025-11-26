// React의 상태 관리 hook과 라우팅 hook을 import
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

// 설문 문항의 타입 정의
interface Question {
  id: string;  // 문항의 고유 식별자
  type: 'radio' | 'checkbox' | 'text';  // 문항 유형: 단일선택/복수선택/주관식
  question: string;  // 질문 내용
  options: string[];  // 선택지 배열 (객관식 문항에 사용)
}

// 설문 전체의 타입 정의
interface Survey {
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
  
  // 미리보기 모드 토글 상태 관리
  const [showPreview, setShowPreview] = useState(false);

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
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 페이지 헤더 섹션 */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between">
              {/* 제목 및 설명 */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">새 설문 만들기</h1>
                <p className="text-gray-600">설문 제목과 문항을 추가하여 설문을 생성하세요</p>
              </div>
              
              {/* 미리보기 및 저장 버튼 */}
              <div className="flex space-x-3">
                {/* 미리보기 토글 버튼 */}
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/30"
                >
                  <i className="ri-eye-line mr-2"></i>
                  {showPreview ? '편집 모드' : '미리보기'}
                </button>
                
                {/* 설문 저장 버튼 */}
                <button
                  onClick={saveSurvey}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
                >
                  <i className="ri-save-line mr-2"></i>
                  저장하기
                </button>
              </div>
            </div>
          </div>

          {/* 2열 그리드 레이아웃: 편집 패널 / 미리보기 패널 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 왼쪽: 편집 패널 */}
            <div className="space-y-6">
              {/* 설문 제목 입력 섹션 */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  설문 제목
                </label>
                <input
                  type="text"
                  value={surveyTitle}
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  placeholder="설문 제목을 입력하세요"
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* 문항 목록 섹션 */}
              <div className="space-y-4">
                {/* 각 문항을 순회하며 렌더링 */}
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                    {/* 문항 헤더: 번호와 삭제 버튼 */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">문항 {index + 1}</h3>
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>

                    {/* 질문 내용 입력 */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                        placeholder="질문을 입력하세요"
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                      />
                    </div>

                    {/* 문항 유형 선택 드롭다운 */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">문항 유형</label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 pr-8"
                      >
                        <option value="radio">객관식 (단일 선택)</option>
                        <option value="checkbox">복수 선택</option>
                        <option value="text">주관식</option>
                      </select>
                    </div>

                    {/* 객관식 문항(radio/checkbox)인 경우 선택지 입력 섹션 표시 */}
                    {(question.type === 'radio' || question.type === 'checkbox') && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">선택지</label>
                        
                        {/* 각 선택지를 순회하며 렌더링 */}
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            {/* 선택지 내용 입력 */}
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                              placeholder={`선택지 ${optionIndex + 1}`}
                              className="flex-1 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                            />
                            
                            {/* 선택지 삭제 버튼 (선택지가 2개 이상일 때만 표시) */}
                            {question.options.length > 1 && (
                              <button
                                onClick={() => removeOption(question.id, optionIndex)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
                              >
                                <i className="ri-close-line"></i>
                              </button>
                            )}
                          </div>
                        ))}
                        
                        {/* 선택지 추가 버튼 */}
                        <button
                          onClick={() => addOption(question.id)}
                          className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105"
                        >
                          <i className="ri-add-line mr-2"></i>
                          선택지 추가
                        </button>
                      </div>
                    )}
                  </div>
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
                {surveyTitle ? (
                  <div className="space-y-6">
                    {/* 설문 제목 및 안내 문구 */}
                    <div className="text-center mb-8">
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">{surveyTitle}</h1>
                      <p className="text-gray-600">설문에 참여해 주셔서 감사합니다</p>
                    </div>

                    {/* 각 문항을 미리보기 형태로 렌더링 */}
                    {questions.map((question, index) => (
                      <div key={question.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                        {/* 문항 번호와 질문 */}
                        <h3 className="font-medium text-gray-800 mb-3">
                          {index + 1}. {question.question || '질문을 입력하세요'}
                        </h3>

                        {/* 단일 선택 문항 미리보기 */}
                        {question.type === 'radio' && (
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                                <input type="radio" name={`question_${question.id}`} className="text-purple-600" />
                                <span className="text-gray-700">{option || `선택지 ${optionIndex + 1}`}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {/* 복수 선택 문항 미리보기 */}
                        {question.type === 'checkbox' && (
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" className="text-purple-600 rounded" />
                                <span className="text-gray-700">{option || `선택지 ${optionIndex + 1}`}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {/* 주관식 문항 미리보기 */}
                        {question.type === 'text' && (
                          <textarea
                            placeholder="답변을 입력하세요"
                            rows={3}
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                          />
                        )}
                      </div>
                    ))}

                    {/* 문항이 있을 때 제출 버튼 표시 */}
                    {questions.length > 0 && (
                      <button className="w-full py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg border border-white/20">
                        응답 제출하기
                      </button>
                    )}
                  </div>
                ) : (
                  // 설문 제목이 없을 때: 안내 메시지 표시
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                      <i className="ri-file-list-3-line text-white text-2xl"></i>
                    </div>
                    <p className="text-gray-600">설문 제목을 입력하면 미리보기가 표시됩니다</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}