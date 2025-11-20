import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

// Interfaces
interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  options: string[];
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

interface Response {
  questionId: string;
  answer: string | string[];
}

export default function SurveyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      const savedSurvey = localStorage.getItem(`survey_${id}`);
      if (savedSurvey) {
        const surveyData = JSON.parse(savedSurvey);
        setSurvey(surveyData);
        // 응답 초기화
        setResponses(surveyData.questions.map((q: Question) => ({
          questionId: q.id,
          answer: q.type === 'checkbox' ? [] : ''
        })));
      }
    }
  }, [id]);

  const updateResponse = (questionId: string, answer: string | string[]) => {
    setResponses(prev => prev.map(r => 
      r.questionId === questionId ? { ...r, answer } : r
    ));
  };

  const handleRadioChange = (questionId: string, value: string) => {
    updateResponse(questionId, value);
  };

  const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
    const currentResponse = responses.find(r => r.questionId === questionId);
    const currentAnswers = Array.isArray(currentResponse?.answer) ? currentResponse.answer : [];
    
    if (checked) {
      updateResponse(questionId, [...currentAnswers, value]);
    } else {
      updateResponse(questionId, currentAnswers.filter(a => a !== value));
    }
  };

  const handleTextChange = (questionId: string, value: string) => {
    updateResponse(questionId, value);
  };

  const submitSurvey = () => {
    if (!survey || !id) return;

    // 응답 검증
    const unansweredQuestions = responses.filter(r => {
      if (Array.isArray(r.answer)) {
        return r.answer.length === 0;
      }
      return !r.answer || r.answer.trim() === '';
    });

    if (unansweredQuestions.length > 0) {
      alert('모든 문항에 응답해주세요.');
      return;
    }

    // 응답 저장
    const responseData = {
      surveyId: id,
      responses,
      submittedAt: new Date().toISOString()
    };

    const existingResponses = localStorage.getItem(`responses_${id}`);
    const allResponses = existingResponses ? JSON.parse(existingResponses) : [];
    allResponses.push(responseData);
    localStorage.setItem(`responses_${id}`, JSON.stringify(allResponses));

    setIsSubmitted(true);
  };

  const nextQuestion = () => {
    if (survey && currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <i className="ri-error-warning-line text-white text-2xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">설문을 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">요청하신 설문이 존재하지 않습니다.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
            >
              <i className="ri-home-line mr-2"></i>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <i className="ri-check-line text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">응답이 제출되었습니다!</h2>
            <p className="text-gray-600 mb-6">
              소중한 의견을 주셔서 감사합니다. 
              응답 결과는 설문 관리자가 확인할 수 있습니다.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/')}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105"
              >
                <i className="ri-home-line mr-2"></i>
                홈으로
              </button>
              <button
                onClick={() => navigate(`/results/${id}`)}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
              >
                <i className="ri-bar-chart-line mr-2"></i>
                결과 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / survey.questions.length) * 100;
  const currentQ = survey.questions[currentQuestion];
  const currentResponse = responses.find(r => r.questionId === currentQ.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{survey.title}</h1>
              <p className="text-gray-600">설문에 참여해 주셔서 감사합니다</p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>진행률</span>
                <span>{currentQuestion + 1} / {survey.questions.length}</span>
              </div>
              <div className="w-full bg-white/40 backdrop-blur-sm rounded-full h-3 border border-white/50">
                <div
                  className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl mb-8">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 border border-white/20">
                  <span className="text-white font-semibold">{currentQuestion + 1}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 flex-1">
                  {currentQ.question}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {currentQ.type === 'radio' && (
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                    >
                      <input
                        type="radio"
                        name={`question_${currentQ.id}`}
                        value={option}
                        checked={currentResponse?.answer === option}
                        onChange={(e) => handleRadioChange(currentQ.id, e.target.value)}
                        className="w-5 h-5 text-purple-600 mr-4"
                      />
                      <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-300">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {currentQ.type === 'checkbox' && (
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={Array.isArray(currentResponse?.answer) && currentResponse.answer.includes(option)}
                        onChange={(e) => handleCheckboxChange(currentQ.id, option, e.target.checked)}
                        className="w-5 h-5 text-purple-600 rounded mr-4"
                      />
                      <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-300">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {currentQ.type === 'text' && (
                <div>
                  <textarea
                    value={typeof currentResponse?.answer === 'string' ? currentResponse.answer : ''}
                    onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                    placeholder="답변을 입력하세요..."
                    rows={6}
                    className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                  />
                  <div className="text-right text-sm text-gray-500 mt-2">
                    {typeof currentResponse?.answer === 'string' ? currentResponse.answer.length : 0} / 500자
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`inline-flex items-center px-6 py-3 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border ${
                currentQuestion === 0
                  ? 'bg-gray-200/50 text-gray-400 border-gray-200/50 cursor-not-allowed'
                  : 'bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 border-white/30 hover:scale-105'
              }`}
            >
              <i className="ri-arrow-left-line mr-2"></i>
              이전
            </button>

            {currentQuestion === survey.questions.length - 1 ? (
              <button
                onClick={submitSurvey}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-semibold rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
              >
                <i className="ri-send-plane-line mr-2"></i>
                응답 제출하기
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
              >
                다음
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
