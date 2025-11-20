
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

interface ResponseData {
  surveyId: string;
  responses: Array<{
    questionId: string;
    answer: string | string[];
  }>;
  submittedAt: string;
}

interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<ResponseData[]>([]);

  useEffect(() => {
    if (id) {
      // 설문 데이터 로드
      const savedSurvey = localStorage.getItem(`survey_${id}`);
      if (savedSurvey) {
        setSurvey(JSON.parse(savedSurvey));
      }

      // 응답 데이터 로드 또는 샘플 데이터 생성
      const savedResponses = localStorage.getItem(`responses_${id}`);
      if (savedResponses) {
        setResponses(JSON.parse(savedResponses));
      } else {
        // 샘플 응답 데이터 생성
        const sampleResponses: ResponseData[] = Array.from({ length: 25 }, (_, i) => ({
          surveyId: id,
          responses: [
            { 
              questionId: '1', 
              answer: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'][Math.floor(Math.random() * 5)]
            },
            { 
              questionId: '2', 
              answer: [
                ['빠른 배송', '좋은 품질'],
                ['좋은 품질', '합리적 가격'],
                ['빠른 배송'],
                ['친절한 서비스', '사용 편의성'],
                ['좋은 품질']
              ][Math.floor(Math.random() * 5)]
            },
            { 
              questionId: '3', 
              answer: [
                '전반적으로 만족스러운 서비스였습니다.',
                '품질이 좋아서 재구매 의향이 있습니다.',
                '배송은 빨랐지만 포장이 아쉬웠습니다.',
                '가격 대비 품질이 우수합니다.',
                '고객 서비스가 매우 친절했습니다.',
                '다음에도 이용하고 싶습니다.',
                '개선이 필요한 부분이 있지만 전체적으로 좋습니다.'
              ][Math.floor(Math.random() * 7)]
            }
          ],
          submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        }));
        setResponses(sampleResponses);
        localStorage.setItem(`responses_${id}`, JSON.stringify(sampleResponses));
      }
    }
  }, [id]);

  const getChartData = (question: Question): ChartData[] => {
    if (question.type === 'text') return [];

    const answerCounts: { [key: string]: number } = {};
    
    if (question.type === 'radio') {
      question.options.forEach(option => {
        answerCounts[option] = 0;
      });

      responses.forEach(response => {
        const answer = response.responses.find(r => r.questionId === question.id);
        if (answer && typeof answer.answer === 'string') {
          answerCounts[answer.answer] = (answerCounts[answer.answer] || 0) + 1;
        }
      });
    } else if (question.type === 'checkbox') {
      question.options.forEach(option => {
        answerCounts[option] = 0;
      });

      responses.forEach(response => {
        const answer = response.responses.find(r => r.questionId === question.id);
        if (answer && Array.isArray(answer.answer)) {
          answer.answer.forEach(selectedOption => {
            answerCounts[selectedOption] = (answerCounts[selectedOption] || 0) + 1;
          });
        }
      });
    }

    const total = Object.values(answerCounts).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(answerCounts).map(([label, value]) => ({
      label,
      value,
      percentage: total > 0 ? Math.round((value / total) * 100) : 0
    }));
  };

  const getTextResponses = (question: Question): string[] => {
    if (question.type !== 'text') return [];

    return responses
      .map(response => {
        const answer = response.responses.find(r => r.questionId === question.id);
        return typeof answer?.answer === 'string' ? answer.answer : '';
      })
      .filter(answer => answer.trim() !== '');
  };

  const generateWordCloud = (texts: string[]): { word: string; count: number }[] => {
    const words: { [key: string]: number } = {};
    
    texts.forEach(text => {
      const cleanText = text.replace(/[^\w\s가-힣]/g, ' ');
      const wordList = cleanText.split(/\s+/).filter(word => word.length > 1);
      
      wordList.forEach(word => {
        words[word] = (words[word] || 0) + 1;
      });
    });

    return Object.entries(words)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  };

  const getSentimentAnalysis = (texts: string[]) => {
    const positive = ['좋', '만족', '우수', '훌륭', '친절', '빠른', '편리'];
    const negative = ['아쉬', '불만', '개선', '문제', '어려', '느린', '불편'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    texts.forEach(text => {
      const hasPositive = positive.some(word => text.includes(word));
      const hasNegative = negative.some(word => text.includes(word));
      
      if (hasPositive && !hasNegative) positiveCount++;
      else if (hasNegative && !hasPositive) negativeCount++;
      else neutralCount++;
    });

    return { positive: positiveCount, negative: negativeCount, neutral: neutralCount };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{survey.title}</h1>
                <div className="flex items-center space-x-6 text-gray-600">
                  <span className="flex items-center">
                    <i className="ri-user-line mr-2"></i>
                    총 {responses.length}명 응답
                  </span>
                  <span className="flex items-center">
                    <i className="ri-calendar-line mr-2"></i>
                    생성일: {survey.createdAt}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 border border-white/30 hover:scale-105">
                  <i className="ri-share-line mr-2"></i>
                  공유하기
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20">
                  <i className="ri-download-line mr-2"></i>
                  PDF 저장
                </button>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <i className="ri-user-line text-white text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">{responses.length}</div>
              <div className="text-sm text-gray-600">총 응답 수</div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/80 to-emerald-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <i className="ri-question-line text-white text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">{survey.questions.length}</div>
              <div className="text-sm text-gray-600">총 문항 수</div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/80 to-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <i className="ri-time-line text-white text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {Math.round((responses.length / Math.max(1, Math.ceil((Date.now() - new Date(survey.createdAt).getTime()) / (1000 * 60 * 60 * 24)))) * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">일평균 응답</div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <i className="ri-bar-chart-line text-white text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {responses.length > 0 ? '100%' : '0%'}
              </div>
              <div className="text-sm text-gray-600">완료율</div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-8">
            {survey.questions.map((question, index) => {
              const chartData = getChartData(question);
              const textResponses = getTextResponses(question);

              return (
                <div key={question.id} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {index + 1}. {question.question}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="ri-file-list-line mr-1"></i>
                        {question.type === 'radio' ? '객관식' : question.type === 'checkbox' ? '복수선택' : '주관식'}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        {question.type === 'text' ? textResponses.length : responses.length}명 응답
                      </span>
                    </div>
                  </div>

                  {question.type === 'text' ? (
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Word Cloud */}
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <i className="ri-cloud-line mr-2"></i>
                          워드클라우드
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center min-h-[200px] items-center">
                          {generateWordCloud(textResponses).map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm text-white rounded-full border border-white/20 hover:scale-110 transition-transform duration-300"
                              style={{ fontSize: `${Math.max(12, Math.min(20, item.count * 3 + 10))}px` }}
                            >
                              {item.word} ({item.count})
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sentiment Analysis */}
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <i className="ri-emotion-line mr-2"></i>
                          감정 분석
                        </h3>
                        {(() => {
                          const sentiment = getSentimentAnalysis(textResponses);
                          const total = sentiment.positive + sentiment.negative + sentiment.neutral;
                          return (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                  <span className="text-gray-700">긍정적</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-800">{sentiment.positive}개</div>
                                  <div className="text-sm text-gray-600">{total > 0 ? Math.round((sentiment.positive / total) * 100) : 0}%</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
                                  <span className="text-gray-700">중립적</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-800">{sentiment.neutral}개</div>
                                  <div className="text-sm text-gray-600">{total > 0 ? Math.round((sentiment.neutral / total) * 100) : 0}%</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                                  <span className="text-gray-700">부정적</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-800">{sentiment.negative}개</div>
                                  <div className="text-sm text-gray-600">{total > 0 ? Math.round((sentiment.negative / total) * 100) : 0}%</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Recent Responses */}
                      <div className="lg:col-span-2 bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <i className="ri-chat-3-line mr-2"></i>
                          최근 응답 ({textResponses.length}개)
                        </h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {textResponses.slice(0, 5).map((response, idx) => (
                            <div key={idx} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                              <p className="text-gray-700">{response}</p>
                            </div>
                          ))}
                          {textResponses.length > 5 && (
                            <div className="text-center text-sm text-gray-600 pt-2">
                              +{textResponses.length - 5}개 응답 더 있음
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Bar Chart */}
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <i className="ri-bar-chart-line mr-2"></i>
                          막대 차트
                        </h3>
                        <div className="space-y-4">
                          {chartData.map((item, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-sm text-gray-700 mb-1">
                                <span className="truncate">{item.label}</span>
                                <span className="ml-2">{item.value}명</span>
                              </div>
                              <div className="w-full bg-white/40 backdrop-blur-sm rounded-full h-3 border border-white/50">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-600 mt-1">{item.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pie Chart */}
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <i className="ri-pie-chart-line mr-2"></i>
                          파이 차트
                        </h3>
                        <div className="flex items-center justify-center">
                          {chartData.length > 0 ? (
                            <div className="relative w-48 h-48">
                              {/* 3D Shadow Effect */}
                              <div className="absolute top-2 left-2 w-full h-full">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                                  {(() => {
                                    let currentAngle = 0;
                                    const shadowColors = ['#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6'];
                                    
                                    return chartData.map((item, idx) => {
                                      if (item.percentage === 0) return null;
                                      
                                      const startAngle = currentAngle;
                                      const angle = (item.percentage / 100) * 360;
                                      const endAngle = startAngle + angle;
                                      
                                      const startAngleRad = (startAngle * Math.PI) / 180;
                                      const endAngleRad = (endAngle * Math.PI) / 180;
                                      
                                      const outerRadius = 45;
                                      const innerRadius = 20;
                                      
                                      const x1 = 60 + outerRadius * Math.cos(startAngleRad);
                                      const y1 = 60 + outerRadius * Math.sin(startAngleRad);
                                      const x2 = 60 + outerRadius * Math.cos(endAngleRad);
                                      const y2 = 60 + outerRadius * Math.sin(endAngleRad);
                                      
                                      const x3 = 60 + innerRadius * Math.cos(endAngleRad);
                                      const y3 = 60 + innerRadius * Math.sin(endAngleRad);
                                      const x4 = 60 + innerRadius * Math.cos(startAngleRad);
                                      const y4 = 60 + innerRadius * Math.sin(startAngleRad);
                                      
                                      const largeArcFlag = angle > 180 ? 1 : 0;
                                      
                                      const pathData = [
                                        `M ${x1} ${y1}`,
                                        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                        `L ${x3} ${y3}`,
                                        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                                        'Z'
                                      ].join(' ');
                                      
                                      currentAngle = endAngle;
                                      
                                      return (
                                        <path
                                          key={idx}
                                          d={pathData}
                                          fill={shadowColors[idx % shadowColors.length]}
                                          opacity="0.3"
                                        />
                                      );
                                    });
                                  })()}
                                </svg>
                              </div>
                              
                              {/* Main Chart */}
                              <div className="relative z-10">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                                  <defs>
                                    {chartData.map((_, idx) => (
                                      <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={['#A855F7', '#C084FC', '#DDD6FE', '#F3E8FF', '#FAF5FF'][idx % 5]} />
                                        <stop offset="100%" stopColor={['#7C3AED', '#A855F7', '#C084FC', '#DDD6FE', '#F3E8FF'][idx % 5]} />
                                      </linearGradient>
                                    ))}
                                  </defs>
                                  
                                  {(() => {
                                    let currentAngle = 0;
                                    
                                    return chartData.map((item, idx) => {
                                      if (item.percentage === 0) return null;
                                      
                                      const startAngle = currentAngle;
                                      const angle = (item.percentage / 100) * 360;
                                      const endAngle = startAngle + angle;
                                      
                                      const startAngleRad = (startAngle * Math.PI) / 180;
                                      const endAngleRad = (endAngle * Math.PI) / 180;
                                      
                                      const outerRadius = 45;
                                      const innerRadius = 20;
                                      
                                      const x1 = 60 + outerRadius * Math.cos(startAngleRad);
                                      const y1 = 60 + outerRadius * Math.sin(startAngleRad);
                                      const x2 = 60 + outerRadius * Math.cos(endAngleRad);
                                      const y2 = 60 + outerRadius * Math.sin(endAngleRad);
                                      
                                      const x3 = 60 + innerRadius * Math.cos(endAngleRad);
                                      const y3 = 60 + innerRadius * Math.sin(endAngleRad);
                                      const x4 = 60 + innerRadius * Math.cos(startAngleRad);
                                      const y4 = 60 + innerRadius * Math.sin(startAngleRad);
                                      
                                      const largeArcFlag = angle > 180 ? 1 : 0;
                                      
                                      const pathData = [
                                        `M ${x1} ${y1}`,
                                        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                        `L ${x3} ${y3}`,
                                        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                                        'Z'
                                      ].join(' ');
                                      
                                      currentAngle = endAngle;
                                      
                                      return (
                                        <g key={idx}>
                                          <path
                                            d={pathData}
                                            fill={`url(#gradient-${idx})`}
                                            className="hover:opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer"
                                            stroke="white"
                                            strokeWidth="2"
                                            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                                            style={{
                                              transformOrigin: '60px 60px'
                                            }}
                                          />
                                        </g>
                                      );
                                    });
                                  })()}
                                </svg>
                              </div>
                              
                              {/* Center Content */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-full flex flex-col items-center justify-center border-2 border-white/50 shadow-lg">
                                  <span className="text-lg font-bold text-purple-700">{responses.length}</span>
                                  <span className="text-xs text-purple-600">응답</span>
                                </div>
                              </div>
                              
                              {/* Floating Labels */}
                              {chartData.map((item, idx) => {
                                if (item.percentage === 0) return null;
                                
                                let currentAngle = 0;
                                for (let i = 0; i < idx; i++) {
                                  currentAngle += (chartData[i].percentage / 100) * 360;
                                }
                                const midAngle = currentAngle + ((item.percentage / 100) * 360) / 2;
                                const midAngleRad = (midAngle * Math.PI) / 180;
                                
                                const labelRadius = 55;
                                const labelX = 60 + labelRadius * Math.cos(midAngleRad);
                                const labelY = 60 + labelRadius * Math.sin(midAngleRad);
                                
                                return (
                                  <div
                                    key={idx}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-purple-700 border border-purple-200 shadow-md"
                                    style={{
                                      left: `${(labelX / 120) * 100}%`,
                                      top: `${(labelY / 120) * 100}%`,
                                    }}
                                  >
                                    {item.percentage}%
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full border-2 border-white/40 shadow-lg">
                              <div className="text-center">
                                <i className="ri-pie-chart-line text-gray-400 text-3xl mb-2"></i>
                                <p className="text-sm text-gray-500">데이터 없음</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Enhanced Legend */}
                        {chartData.length > 0 && (
                          <div className="mt-6 space-y-3">
                            {chartData.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50 hover:bg-white/50 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                  <div className="relative">
                                    <div 
                                      className="w-4 h-4 rounded-full shadow-md"
                                      style={{ 
                                        background: `linear-gradient(135deg, ${['#A855F7', '#C084FC', '#DDD6FE', '#F3E8FF', '#FAF5FF'][idx % 5]}, ${['#7C3AED', '#A855F7', '#C084FC', '#DDD6FE', '#F3E8FF'][idx % 5]})`
                                      }}
                                    ></div>
                                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-white/20"></div>
                                  </div>
                                  <span className="text-gray-700 font-medium truncate max-w-[120px]">{item.label}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-600 font-semibold">{item.percentage}%</span>
                                  <span className="text-xs text-gray-500">({item.value}명)</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Statistics */}
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <i className="ri-calculator-line mr-2"></i>
                          상세 통계
                        </h3>
                        <div className="space-y-3">
                          {chartData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: ['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE', '#EDE9FE'][idx % 5] }}
                                ></div>
                                <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-gray-800">{item.value}</div>
                                <div className="text-xs text-gray-600">{item.percentage}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-violet-600/20 backdrop-blur-sm rounded-lg border border-white/40">
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-800">{responses.length}</div>
                            <div className="text-xs text-gray-600">총 응답 수</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
