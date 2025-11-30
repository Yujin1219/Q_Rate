// src/pages/templates/page.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

// 분리해 둔 데이터/타입 import
import { templates, type Template } from '../../data/templateData';

export default function TemplatesPage() {
  const navigate = useNavigate();

  //  현재 선택된 카테고리 상태
  //   null   → 전체 보기
  //   '비즈니스' / '이벤트' / '리서치' / 'HR' → 해당 카테고리만 보기
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // 상단 카테고리 버튼 목록
  //    ['전체', '비즈니스', '이벤트', '리서치', 'HR'] 이런 형태가 됨
  const categories = ['전체', ...new Set(templates.map(t => t.category))];

  //  선택된 카테고리에 따라 템플릿을 필터링
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
                        ? 'bg-white text-purple-700 border-white shadow-md scale-105'
                        : 'bg-white/30 text-purple-700 border-white/40 hover:bg-white/40 hover:scale-105')
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/*  템플릿 카드 리스트 */}
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

          {/* "빈 양식으로 시작하기" CTA 카드 */}
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
