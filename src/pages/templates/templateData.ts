// src/pages/templates/templateData.ts
// 설문 템플릿 "데이터 전용" 모듈

// 템플릿 하나가 어떤 데이터를 가지는지 정의
export interface Template {
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

// 실제 템플릿 데이터들 (하드코딩)
export const templates: Template[] = [
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
