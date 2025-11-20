
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

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

export default function CreatePage() {
  const navigate = useNavigate();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'radio',
      question: '',
      options: ['']
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, options: [...q.options, ''] } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        options: q.options.map((opt, idx) => idx === optionIndex ? value : opt)
      } : q
    ));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        options: q.options.filter((_, idx) => idx !== optionIndex)
      } : q
    ));
  };

  const saveSurvey = () => {
    if (!surveyTitle.trim()) {
      alert('설문 제목을 입력해주세요.');
      return;
    }

    if (questions.length === 0) {
      alert('최소 하나의 문항을 추가해주세요.');
      return;
    }

    const newSurvey: Survey = {
      id: Date.now().toString(),
      title: surveyTitle,
      questions,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const savedSurveys = localStorage.getItem('surveys');
    const surveys = savedSurveys ? JSON.parse(savedSurveys) : [];
    surveys.push(newSurvey);
    localStorage.setItem('surveys', JSON.stringify(surveys));
    localStorage.setItem(`survey_${newSurvey.id}`, JSON.stringify(newSurvey));

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">새 설문 만들기</h1>
                <p className="text-gray-600">설문 제목과 문항을 추가하여 설문을 생성하세요</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/30"
                >
                  <i className="ri-eye-line mr-2"></i>
                  {showPreview ? '편집 모드' : '미리보기'}
                </button>
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            <div className="space-y-6">
              {/* Survey Title */}
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

              {/* Questions */}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">문항 {index + 1}</h3>
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>

                    {/* Question Input */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                        placeholder="질문을 입력하세요"
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                      />
                    </div>

                    {/* Question Type */}
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

                    {/* Options */}
                    {(question.type === 'radio' || question.type === 'checkbox') && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">선택지</label>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                              placeholder={`선택지 ${optionIndex + 1}`}
                              className="flex-1 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                            />
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

                {/* Add Question Button */}
                <button
                  onClick={addQuestion}
                  className="w-full py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-purple-700 font-medium rounded-2xl cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/30 border-dashed"
                >
                  <i className="ri-add-circle-line mr-2 text-xl"></i>
                  새 문항 추가
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-white/20">
                    <i className="ri-eye-line text-white"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">미리보기</h2>
                </div>

                {surveyTitle ? (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">{surveyTitle}</h1>
                      <p className="text-gray-600">설문에 참여해 주셔서 감사합니다</p>
                    </div>

                    {questions.map((question, index) => (
                      <div key={question.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                        <h3 className="font-medium text-gray-800 mb-3">
                          {index + 1}. {question.question || '질문을 입력하세요'}
                        </h3>

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

                        {question.type === 'text' && (
                          <textarea
                            placeholder="답변을 입력하세요"
                            rows={3}
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                          />
                        )}
                      </div>
                    ))}

                    {questions.length > 0 && (
                      <button className="w-full py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm text-white font-medium rounded-xl cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg border border-white/20">
                        응답 제출하기
                      </button>
                    )}
                  </div>
                ) : (
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
