import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import ProgressBar from '../../components/survey/ProgressBar';
import QuestionCard from '../../components/survey/QuestionCard';
import NavigationButtons from '../../components/survey/NavigationButtons';
import EmptyState from '../../components/survey/EmptyState';
import SubmitSuccess from '../../components/survey/SubmitSuccess';

// 인터페이스 정의
interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text'; // 질문 유형: 단일선택, 다중선택, 텍스트
  question: string;
  options: string[];
  required: boolean; // 필수 응답 여부
  skipRules?: {  // 건너뛰기 규칙
    [optionIndex: number]: number;  // 선택지 인덱스 → 건너뛸 질문 번호
  };
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

interface Response {
  questionId: string;
  answer: string | string[]; // 단일 답변(string) 또는 다중 답변(string[])
}

interface ResponseData {
  surveyId: string;
  responses: Response[];
  respondent: {
    gender: string;  // 성별
    age: string;     // 나이대
  };
  responderId: string; // 응답자 ID (email)
  submittedAt: string;
}

export default function SurveyPage() {
  // URL 파라미터에서 설문 ID 가져오기
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 상태 관리
  const [survey, setSurvey] = useState<Survey | null>(null); // 설문 데이터
  const [responses, setResponses] = useState<Response[]>([]); // 사용자 응답
  const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 질문 인덱스
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 완료 여부

  // 컴포넌트 마운트 시 로그인 확인 및 설문 데이터 불러오기
  useEffect(() => {
    // 로그인 확인
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (id) {
      const savedSurvey = localStorage.getItem(`survey_${id}`);
      if (savedSurvey) {
        const surveyData = JSON.parse(savedSurvey);
        setSurvey(surveyData);
        // 각 질문에 대한 빈 응답 초기화
        setResponses(surveyData.questions.map((q: Question) => ({
          questionId: q.id,
          answer: q.type === 'checkbox' ? [] : '' // 체크박스는 배열, 나머지는 문자열
        })));
      }
    }
  }, [id, navigate]);

  // 응답 업데이트 함수
  const updateResponse = (questionId: string, answer: string | string[]) => {
    setResponses(prev => prev.map(r => 
      r.questionId === questionId ? { ...r, answer } : r
    ));
  };

  // 라디오 버튼 변경 핸들러
  const handleRadioChange = (questionId: string, value: string) => {
    updateResponse(questionId, value);
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
    const currentResponse = responses.find(r => r.questionId === questionId);
    const currentAnswers = Array.isArray(currentResponse?.answer) ? currentResponse.answer : [];
    
    if (checked) {
      // 체크됨: 배열에 추가
      updateResponse(questionId, [...currentAnswers, value]);
    } else {
      // 체크 해제: 배열에서 제거
      updateResponse(questionId, currentAnswers.filter(a => a !== value));
    }
  };

  // 텍스트 입력 핸들러
  const handleTextChange = (questionId: string, value: string) => {
    updateResponse(questionId, value);
  };

  // 설문 제출 함수
  const submitSurvey = () => {
    if (!survey || !id) return;

    // 필수 문항만 검증
    const unansweredRequired = responses.filter(r => {
      // 해당 질문이 필수인지 확인
      const question = survey.questions.find(q => q.id === r.questionId);
      if (!question || !question.required) {
        return false; // 필수가 아니면 스킵
      }

      // 필수 문항의 응답 확인
      if (Array.isArray(r.answer)) {
        return r.answer.length === 0; // 체크박스: 선택 항목 없음
      }
      return !r.answer || r.answer.trim() === ''; // 텍스트/라디오: 빈 값
    });

    if (unansweredRequired.length > 0) {
      alert('필수 항목(*)에 응답해주세요.');
      return;
    }

    // localStorage에서 로그인한 사용자 정보 가져오기
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    // 응답 데이터 생성 (사용자 정보 포함)
    const responseData: ResponseData = {
      surveyId: id,
      responses,
      respondent: {
        gender: userInfo?.gender || '미지정',
        age: userInfo?.age || '미지정'
      },
      responderId: userInfo?.email || '미지정',
      submittedAt: new Date().toISOString()
    };

    // localStorage에 응답 저장 (기존 응답에 추가)
    const existingResponses = localStorage.getItem(`responses_${id}`);
    const allResponses = existingResponses ? JSON.parse(existingResponses) : [];
    allResponses.push(responseData);
    localStorage.setItem(`responses_${id}`, JSON.stringify(allResponses));

    // 설문 목록(responseCount) 업데이트
    const storedSurveys = localStorage.getItem('surveys');
    if (storedSurveys) {
      try {
        const parsedSurveys = JSON.parse(storedSurveys).map((item: any) =>
          item.id === id
            ? { ...item, responseCount: allResponses.length }
            : item
        );
        localStorage.setItem('surveys', JSON.stringify(parsedSurveys));
      } catch (err) {
        console.error('설문 목록 업데이트 실패:', err);
      }
    }

    // 개별 설문 데이터에도 응답 수 반영
    const storedSurvey = localStorage.getItem(`survey_${id}`);
    if (storedSurvey) {
      try {
        const parsedSurvey = JSON.parse(storedSurvey);
        parsedSurvey.responseCount = allResponses.length;
        localStorage.setItem(`survey_${id}`, JSON.stringify(parsedSurvey));
      } catch (err) {
        console.error('설문 데이터 업데이트 실패:', err);
      }
    }

    // 마이페이지용 응답한 설문 목록에 추가
    const myResponsesString = localStorage.getItem('myResponses');
    const myResponses = myResponsesString ? JSON.parse(myResponsesString) : [];

    // 이미 응답한 설문인지 확인 (중복 방지)
    const alreadyResponded = myResponses.some((r: any) => r.id === id && r.responderId === userInfo?.email);

    if (!alreadyResponded) {
      myResponses.push({
        id: id,
        title: survey.title,
        responderId: userInfo?.email || '미지정',
        respondedAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식
      });
      localStorage.setItem('myResponses', JSON.stringify(myResponses));
    }

    setIsSubmitted(true);
  };

  // 다음 질문으로 이동 (건너뛰기 규칙 적용)
  const nextQuestion = () => {
    if (!survey || currentQuestion >= survey.questions.length - 1) {
      return;
    }

    const currentQ = survey.questions[currentQuestion];
    const currentResponse = responses.find(r => r.questionId === currentQ.id);
    const answer = currentResponse?.answer;

    // 건너뛰기 규칙 확인 (radio/checkbox 모두 지원)
    if (currentQ.skipRules && (currentQ.type === 'radio' || currentQ.type === 'checkbox')) {
      let optionIndex = -1;

      if (currentQ.type === 'radio' && typeof answer === 'string') {
        // radio: 선택한 선택지의 인덱스 찾기
        optionIndex = currentQ.options.indexOf(answer);
      } else if (currentQ.type === 'checkbox' && Array.isArray(answer) && answer.length > 0) {
        // checkbox: 첫 번째 선택항목의 인덱스 찾기
        optionIndex = currentQ.options.indexOf(answer[0]);
      }

      // 건너뛰기 규칙이 있으면 적용
      if (optionIndex !== -1 && currentQ.skipRules[optionIndex]) {
        const targetQuestion = currentQ.skipRules[optionIndex];
        // 유효한 질문 번호인지 확인
        if (targetQuestion > 0 && targetQuestion <= survey.questions.length) {
          setCurrentQuestion(targetQuestion - 1); // 질문 번호 - 1 = 배열 인덱스
          return;
        }
      }
    }

    // 건너뛰기가 없으면 다음 질문으로
    setCurrentQuestion(currentQuestion + 1);
  };

  // 이전 질문으로 이동 (건너뛰기 규칙 역순 적용)
  const prevQuestion = () => {
    if (!survey || currentQuestion <= 0) {
      return;
    }

    let targetIndex = currentQuestion - 1;

    // 현재 위치에서 역으로 가면서 건너뛰어진 질문 찾기
    while (targetIndex >= 0) {
      const targetQ = survey.questions[targetIndex];
      
      // targetQ가 현재 질문으로 건너뜬 것인지 확인
      let isSkippedTo = false;
      
      if (targetQ.skipRules && (targetQ.type === 'radio' || targetQ.type === 'checkbox')) {
        const targetResponse = responses.find(r => r.questionId === targetQ.id);
        const answer = targetResponse?.answer;
        let optionIndex = -1;

        if (targetQ.type === 'radio' && typeof answer === 'string') {
          optionIndex = targetQ.options.indexOf(answer);
        } else if (targetQ.type === 'checkbox' && Array.isArray(answer) && answer.length > 0) {
          optionIndex = targetQ.options.indexOf(answer[0]);
        }

        // 이 질문의 답변에 따라 현재 위치로 건너뛰었는지 확인
        if (optionIndex !== -1 && targetQ.skipRules[optionIndex]) {
          const skippedTarget = targetQ.skipRules[optionIndex];
          if (skippedTarget === currentQuestion + 1) {
            // 맞으면 이 질문으로 이동
            isSkippedTo = true;
          }
        }
      }

      if (isSkippedTo) {
        setCurrentQuestion(targetIndex);
        return;
      }

      targetIndex--;
    }

    // 건너뛰기 규칙이 없으면 그냥 이전 질문으로
    setCurrentQuestion(currentQuestion - 1);
  };

  // 설문을 찾을 수 없는 경우
  if (!survey) {
    return <EmptyState onNavigateHome={() => navigate('/')} />;
  }

  // 설문 제출 완료 화면
  if (isSubmitted) {
    return (
      <SubmitSuccess
        onNavigateHome={() => navigate('/')}
        onViewResults={() => navigate(`/results/${id}`)}
      />
    );
  }

  // 진행률 계산
  // const progress = ((currentQuestion + 1) / survey.questions.length) * 100;
  const currentQ = survey.questions[currentQuestion];
  const currentResponse = responses.find(r => r.questionId === currentQ.id);

  // 설문 진행 화면
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* 진행률 바 */}
          <ProgressBar
            current={currentQuestion}
            total={survey.questions.length}
            title={survey.title}
          />

          {/* 질문 카드 */}
          <QuestionCard
            question={currentQ}
            questionNumber={currentQuestion + 1}
            answer={currentResponse?.answer || (currentQ.type === 'checkbox' ? [] : '')}
            onRadioChange={handleRadioChange}
            onCheckboxChange={handleCheckboxChange}
            onTextChange={handleTextChange}
          />

          {/* 네비게이션 버튼 */}
          <NavigationButtons
            currentQuestion={currentQuestion}
            totalQuestions={survey.questions.length}
            onPrev={prevQuestion}
            onNext={nextQuestion}
            onSubmit={submitSurvey}
          />
        </div>
      </div>
    </div>
  );
}
