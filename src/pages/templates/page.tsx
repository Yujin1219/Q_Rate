import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

// 템플릿 하나가 어떤 데이터를 가지는지 정의
interface Template {
  id: string; // 템플릿 고유 ID
  title: string; // 템플릿 이름
  description: string; // 설명 문구
  category: string; // 비즈니스 / 이벤트 / 리서치 / HR
  icon: string; // 리믹스 아이콘 클래스명
  questions: Array<{
    type: 'radio' | 'checkbox' | 'text'; // 질문 타입
    question: string; // 질문 내용
    options?: string[]; // 객관식/체크박스일 때 선택지
  }>;
}

export default function TemplatesPage() {
  const navigate = useNavigate();

  // 🔹 현재 선택된 카테고리 상태
  //   null   → 전체 보기
  //   '비즈니스' / '이벤트' / '리서치' / 'HR' → 해당 카테고리만 보기
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 🔹 실제 템플릿 데이터들 (하드코딩)
  const templates: Template[] = [
    {
      id: 'customer-satisfaction',
      title: '고객 만족도 조사',
      description:
        '서비스나 제품에 대한 고객 만족도를 측정하는 설문입니다. 전반적인 만족도부터 세부적인 개선사항까지 종합적으로 파악할 수 있습니다.',
      category: '비즈니스',
      icon: 'ri-star-line',
      questions: [
        {
          type: 'radio',
          question: '전반적인 서비스에 대해 얼마나 만족하십니까?',
          options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']
        },
        {
          type: 'checkbox',
          question: '어떤 부분이 가장 좋았습니까? (복수 선택 가능)',
          options: ['빠른 배송', '좋은 품질', '합리적 가격', '친절한 서비스', '사용 편의성']
        },
        {
          type: 'text',
          question: '개선이 필요한 부분이나 추가 의견이 있으시면 자유롭게 작성해 주세요.'
        }
      ]
    },
    {
      id: 'event-feedback',
      title: '이벤트 피드백',
      description:
        '행사나 이벤트 참가자들의 피드백을 수집하는 설문입니다. 이벤트의 성공도를 측정하고 다음 행사 개선에 활용할 수 있습니다.',
      category: '이벤트',
      icon: 'ri-calendar-event-line',
      questions: [
        {
          type: 'radio',
          question: '이번 이벤트에 대해 전반적으로 어떻게 평가하십니까?',
          options: ['매우 좋음', '좋음', '보통', '아쉬움', '매우 아쉬움']
        },
        {
          type: 'checkbox',
          question: '가장 인상 깊었던 프로그램은 무엇입니까?',
          options: ['기조연설', '패널토론', '네트워킹', '전시부스', '경품추첨']
        },
        {
          type: 'text',
          question: '다음 이벤트에서 보고 싶은 내용이나 개선사항을 알려주세요.'
        }
      ]
    },
    {
      id: 'product-research',
      title: '제품 리서치',
      description:
        '신제품 개발이나 기존 제품 개선을 위한 시장 조사 설문입니다. 고객의 니즈와 선호도를 파악하여 제품 전략 수립에 활용하세요.',
      category: '리서치',
      icon: 'ri-search-line',
      questions: [
        {
          type: 'radio',
          question: '이 제품을 구매할 의향이 있으십니까?',
          options: ['매우 높음', '높음', '보통', '낮음', '매우 낮음']
        },
        {
          type: 'checkbox',
          question: '제품에서 가장 중요하게 생각하는 요소는 무엇입니까?',
          options: ['가격', '품질', '디자인', '기능성', '브랜드']
        },
        {
          type: 'text',
          question: '이 제품에 대한 전반적인 의견을 자유롭게 작성해 주세요.'
        }
      ]
    },
    {
      id: 'employee-engagement',
      title: '직원 만족도',
      description:
        '조직 내 직원들의 만족도와 참여도를 측정하는 설문입니다. 조직 문화 개선과 직원 복지 향상을 위한 데이터를 수집할 수 있습니다.',
      category: 'HR',
      icon: 'ri-team-line',
      questions: [
        {
          type: 'radio',
          question: '현재 직장에서의 업무 만족도는 어느 정도입니까?',
          options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']
        },
        {
          type: 'checkbox',
          question: '업무 환경에서 개선이 필요한 부분은 무엇입니까?',
          options: ['업무량', '근무환경', '복리후생', '소통', '성장기회']
        },
        {
          type: 'text',
          question: '조직 발전을 위한 제안사항이 있으시면 작성해 주세요.'
        }
      ]
    }
  ];

  // 🔹 "이 템플릿 사용하기" 눌렀을 때 실행되는 함수
  const useTemplate = (template: Template) => {
    const now = Date.now(); // 현재 시간(ms) → 고유 id 생성용

    // 템플릿 내용을 기반으로 새 설문 데이터 생성
    const newSurvey = {
      id: now.toString(),
      title: template.title,
      questions: template.questions.map((q, index) => ({
        id: `${now}_${index}`, // 각 질문도 고유 id 생성
        type: q.type,
        question: q.question,
        options: q.options || [''] // 옵션이 없으면 빈 옵션 하나라도 넣기
      })),
      createdAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };

    // localStorage 에 저장 (키: survey_설문ID)
    localStorage.setItem(`survey_${newSurvey.id}`, JSON.stringify(newSurvey));

    // /create 페이지로 이동하면서 ?template=설문ID 쿼리 전달
    navigate(`/create?template=${newSurvey.id}`);
  };

  // 🔹 상단 카테고리 버튼 목록
  //    ['전체', '비즈니스', '이벤트', '리서치', 'HR'] 이런 형태가 됨
  const categories = ['전체', ...new Set(templates.map(t => t.category))];

  // 🔹 선택된 카테고리에 따라 템플릿을 필터링
  const filteredTemplates =
    selectedCategory && selectedCategory !== '전체'
      ? templates.filter(t => t.category === selectedCategory) // 특정 카테고리만
      : templates; // 아무것도 선택 안 했거나 "전체" → 전체 템플릿

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100">
      <Header />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* 🔹 상단 카테고리 필터 영역 */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => {
                // 이 버튼이 현재 선택된 버튼인지 여부
                const isActive =
                  (category === '전체' && !selectedCategory) ||
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    // "전체" 눌리면 selectedCategory 를 null 로,
                    // 나머지는 해당 카테고리 문자열로 세팅
                    onClick={() =>
                      setSelectedCategory(category === '전체' ? null : category)
                    }
                    className={
                      'px-4 py-2 rounded-full border backdrop-blur-sm font-medium cursor-pointer transition-all duration-300 ' +
                      (isActive
                        ? // 선택된 버튼 스타일
                          'bg-white text-purple-700 border-white shadow-md scale-105'
                        : // 선택 안 된 버튼 스타일
                          'bg-white/30 text-purple-700 border-white/40 hover:bg-white/40 hover:scale-105')
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🔹 템플릿 카드 리스트 */}
          <div className="space-y-6">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-start gap-6">
                  {/* 아이콘 박스 */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-violet-600/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                    <i className={`${template.icon} text-white text-2xl`}></i>
                  </div>

                  {/* 템플릿 내용 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                            {template.title}
                          </h3>
                          <span className="text-sm text-purple-600 bg-purple-100/50 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-200/50">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {template.description}
                        </p>
                      </div>
                    </div>

                    {/* 질문 미리보기 (앞 2개만) */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        포함된 질문 미리보기:
                      </h4>
                      <div className="space-y-2">
                        {template.questions.slice(0, 2).map((q, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-sm text-gray-600"
                          >
                            <span className="w-6 h-6 bg-white/40 backdrop-blur-sm text-purple-600 rounded-full flex items-center justify-center text-xs font-medium border border-white/50">
                              {idx + 1}
                            </span>
                            <span className="flex-1">{q.question}</span>
                            <span className="text-xs px-2 py-1 bg-white/40 backdrop-blur-sm text-gray-600 rounded-md border border-white/50">
                              {q.type === 'radio'
                                ? '객관식'
                                : q.type === 'checkbox'
                                ? '복수선택'
                                : '주관식'}
                            </span>
                          </div>
                        ))}
                        {template.questions.length > 2 && (
                          <div className="text-sm text-gray-500 ml-9">
                            +{template.questions.length - 2}개 문항 더 있음
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 카드 하단 버튼들 */}
                    <div className="flex items-center gap-3">
                      {/* 이 템플릿 사용하기 → /create 로 연결 */}
                      <button
                        onClick={() => useTemplate(template)}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/80 to-violet-600/80 backdrop-blur-sm hover:from-purple-600/90 hover:to-violet-700/90 text-white font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
                      >
                        <i className="ri-edit-line mr-2"></i>
                        이 템플릿 사용하기
                      </button>

                      {/* (추후 모달이나 별도 미리보기 페이지로 확장 가능) */}
                      <button className="inline-flex items-center px-4 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-purple-700 font-medium rounded-lg cursor-pointer transition-all duration-300 border border-white/30 hover:scale-105">
                        <i className="ri-eye-line mr-2"></i>
                        미리보기
                      </button>

                      <div className="flex items-center text-sm text-gray-600 ml-auto">
                        <i className="ri-question-line mr-1"></i>
                        {template.questions.length}개 문항
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔹 "빈 양식으로 시작하기" CTA 카드 */}
          <div className="mt-12 bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <i className="ri-add-circle-line text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              원하는 템플릿이 없나요?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              빈 양식으로 시작하여 나만의 맞춤형 설문을 만들어보세요
            </p>
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm hover:from-indigo-600/90 hover:to-purple-700/90 text-white font-semibold rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-white/20"
            >
              <i className="ri-file-add-line mr-3"></i>
              빈 양식으로 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
