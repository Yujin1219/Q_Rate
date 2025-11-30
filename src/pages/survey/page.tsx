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
      submittedAt: new Date().toISOString()
    };

    // localStorage에 응답 저장 (기존 응답에 추가)
    const existingResponses = localStorage.getItem(`responses_${id}`);
    const allResponses = existingResponses ? JSON.parse(existingResponses) : [];
    allResponses.push(responseData);
    localStorage.setItem(`responses_${id}`, JSON.stringify(allResponses));

    // 마이페이지용 응답한 설문 목록에 추가
    const myResponsesString = localStorage.getItem('myResponses');
    const myResponses = myResponsesString ? JSON.parse(myResponsesString) : [];

    // 이미 응답한 설문인지 확인 (중복 방지)
    const alreadyResponded = myResponses.some((r: any) => r.id === id);

    if (!alreadyResponded) {
      myResponses.push({
        id: id,
        title: survey.title,
        respondedAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식
      });
      localStorage.setItem('myResponses', JSON.stringify(myResponses));
    }

    setIsSubmitted(true);
  };

  // 다음 질문으로 이동
  const nextQuestion = () => {
    if (survey && currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 이전 질문으로 이동
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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