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
  },
    // 비즈니스 카테고리

  {

    id: 'nps-survey',

    title: 'NPS 고객 충성도 조사',

    description: '고객이 우리 서비스를 다른 사람에게 추천할 의향을 측정하는 설문입니다. 고객 충성도와 브랜드 가치를 파악할 수 있습니다.',

    category: '비즈니스',

    icon: 'ri-heart-line',

    questions: [

      {

        type: 'radio',

        question: '우리 서비스를 친구나 동료에게 추천할 가능성은 얼마나 됩니까? (0-10점)',

        options: ['0-2점', '3-4점', '5-6점', '7-8점', '9-10점']

      },

      {

        type: 'text',

        question: '위와 같이 평가하신 이유를 간단히 설명해 주세요.'

      },

      {

        type: 'checkbox',

        question: '우리 서비스의 주요 강점은 무엇이라고 생각하십니까?',

        options: ['가격 경쟁력', '품질', '고객 서비스', '사용 편의성', '브랜드 신뢰도']

      }

    ]

  },

  {

    id: 'market-research',

    title: '시장 조사',

    description: '타겟 시장의 트렌드와 소비자 행동 패턴을 파악하는 설문입니다. 마케팅 전략 수립에 필수적인 데이터를 수집합니다.',

    category: '비즈니스',

    icon: 'ri-line-chart-line',

    questions: [

      {

        type: 'radio',

        question: '이 제품군에서 주로 어떤 브랜드를 사용하십니까?',

        options: ['A 브랜드', 'B 브랜드', 'C 브랜드', '기타', '사용 안함']

      },

      {

        type: 'checkbox',

        question: '제품 구매 시 가장 중요하게 고려하는 요소는?',

        options: ['가격', '품질', '브랜드 이미지', '리뷰', '할인 혜택']

      },

      {

        type: 'radio',

        question: '한 달 평균 이 제품군에 얼마를 지출하십니까?',

        options: ['5만원 미만', '5-10만원', '10-20만원', '20-30만원', '30만원 이상']

      }

    ]

  },

  {

    id: 'b2b-satisfaction',

    title: 'B2B 거래처 만족도',

    description: '기업 고객의 만족도를 측정하고 장기적인 파트너십 강화를 위한 인사이트를 얻는 설문입니다.',

    category: '비즈니스',

    icon: 'ri-building-line',

    questions: [

      {

        type: 'radio',

        question: '우리 회사와의 거래에 대해 전반적으로 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '개선이 필요한 부분은 무엇입니까?',

        options: ['납기 준수', '제품 품질', '가격 경쟁력', '커뮤니케이션', 'A/S 지원']

      },

      {

        type: 'radio',

        question: '향후 계약 연장 의향이 있으십니까?',

        options: ['매우 높음', '높음', '보통', '낮음', '매우 낮음']

      }

    ]

  },

  {

    id: 'brand-awareness',

    title: '브랜드 인지도 조사',

    description: '소비자들의 브랜드 인지도와 이미지를 측정하는 설문입니다. 브랜딩 전략 수립에 활용하세요.',

    category: '비즈니스',

    icon: 'ri-price-tag-3-line',

    questions: [

      {

        type: 'radio',

        question: '우리 브랜드를 알고 계셨습니까?',

        options: ['잘 알고 있다', '들어본 적 있다', '처음 듣는다']

      },

      {

        type: 'checkbox',

        question: '우리 브랜드 하면 떠오르는 이미지는?',

        options: ['프리미엄', '합리적', '혁신적', '신뢰할 수 있는', '트렌디한']

      },

      {

        type: 'text',

        question: '우리 브랜드를 어디서 처음 알게 되셨나요?'

      }

    ]

  },

  {

    id: 'service-quality',

    title: '서비스 품질 평가',

    description: '제공하는 서비스의 품질을 다각도로 평가하는 설문입니다. 서비스 개선점을 구체적으로 파악할 수 있습니다.',

    category: '비즈니스',

    icon: 'ri-service-line',

    questions: [

      {

        type: 'radio',

        question: '직원의 전문성과 친절도는 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'radio',

        question: '서비스 처리 속도에 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'text',

        question: '서비스 개선을 위한 제안사항을 알려주세요.'

      }

    ]

  },



  // 이벤트 카테고리

  {

    id: 'conference-evaluation',

    title: '컨퍼런스 평가',

    description: '컨퍼런스나 세미나 참석자들의 의견을 수집하는 설문입니다. 행사의 효과성을 측정하고 개선점을 파악합니다.',

    category: '이벤트',

    icon: 'ri-presentation-line',

    questions: [

      {

        type: 'radio',

        question: '컨퍼런스 전체 구성에 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '가장 유익했던 세션은 무엇입니까?',

        options: ['키노트', '기술 세션', '워크샵', 'Q&A', '네트워킹']

      },

      {

        type: 'text',

        question: '다음 컨퍼런스에서 다뤘으면 하는 주제를 제안해 주세요.'

      }

    ]

  },

  {

    id: 'webinar-feedback',

    title: '웨비나 피드백',

    description: '온라인 웨비나의 만족도와 효과를 측정하는 설문입니다. 콘텐츠 품질과 기술적 측면을 모두 평가합니다.',

    category: '이벤트',

    icon: 'ri-video-line',

    questions: [

      {

        type: 'radio',

        question: '웨비나 내용이 유익했습니까?',

        options: ['매우 유익함', '유익함', '보통', '별로', '전혀 아님']

      },

      {

        type: 'radio',

        question: '화질과 음질은 만족스러웠습니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '향후 어떤 주제의 웨비나를 원하십니까?',

        options: ['기술 트렌드', '실무 스킬', '사례 연구', '업계 동향', '도구 활용법']

      }

    ]

  },

  {

    id: 'workshop-evaluation',

    title: '워크샵 평가',

    description: '실습형 워크샵의 효과성과 만족도를 측정하는 설문입니다. 교육 내용과 진행 방식을 평가합니다.',

    category: '이벤트',

    icon: 'ri-tools-line',

    questions: [

      {

        type: 'radio',

        question: '워크샵에서 배운 내용을 실무에 적용할 수 있겠습니까?',

        options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다']

      },

      {

        type: 'radio',

        question: '강사의 진행 능력은 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'text',

        question: '워크샵에서 가장 도움이 된 부분은 무엇인가요?'

      }

    ]

  },

  {

    id: 'exhibition-survey',

    title: '전시회 관람객 조사',

    description: '전시회 관람객의 만족도와 선호도를 파악하는 설문입니다. 전시 기획 개선에 활용할 수 있습니다.',

    category: '이벤트',

    icon: 'ri-gallery-line',

    questions: [

      {

        type: 'radio',

        question: '전시 내용에 만족하셨습니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '어떤 전시 부스가 가장 인상적이었습니까?',

        options: ['제품 전시', '체험 부스', '세미나', '상담 부스', '이벤트 존']

      },

      {

        type: 'radio',

        question: '전시회를 다른 사람에게 추천하시겠습니까?',

        options: ['적극 추천', '추천', '보통', '비추천', '절대 비추천']

      }

    ]

  },

  {

    id: 'party-feedback',

    title: '파티 피드백',

    description: '회사 파티나 사교 행사에 대한 참석자 의견을 수집하는 설문입니다. 분위기와 만족도를 측정합니다.',

    category: '이벤트',

    icon: 'ri-cake-3-line',

    questions: [

      {

        type: 'radio',

        question: '파티 분위기는 어땠습니까?',

        options: ['매우 좋음', '좋음', '보통', '아쉬움', '매우 아쉬움']

      },

      {

        type: 'checkbox',

        question: '가장 즐거웠던 순간은?',

        options: ['음식', '음악/공연', '게임', '대화', '선물 교환']

      },

      {

        type: 'text',

        question: '다음 파티에서 개선했으면 하는 점을 알려주세요.'

      }

    ]

  },



  // 리서치 카테고리

  {

    id: 'user-experience',

    title: '사용자 경험 리서치',

    description: '제품이나 서비스의 사용자 경험을 심층적으로 조사하는 설문입니다. UX 개선을 위한 구체적인 피드백을 수집합니다.',

    category: '리서치',

    icon: 'ri-user-star-line',

    questions: [

      {

        type: 'radio',

        question: '우리 서비스의 전반적인 사용 편의성은 어떻습니까?',

        options: ['매우 편리함', '편리함', '보통', '불편함', '매우 불편함']

      },

      {

        type: 'checkbox',

        question: '사용 중 어려움을 겪은 부분은?',

        options: ['회원가입', '메뉴 찾기', '기능 사용', '결제', '고객지원']

      },

      {

        type: 'text',

        question: '가장 개선이 필요하다고 생각하는 기능을 설명해 주세요.'

      }

    ]

  },

  {

    id: 'competitor-analysis',

    title: '경쟁사 비교 분석',

    description: '경쟁 제품과의 비교를 통해 우리 제품의 강약점을 파악하는 설문입니다. 시장 포지셔닝 전략 수립에 활용됩니다.',

    category: '리서치',

    icon: 'ri-bar-chart-box-line',

    questions: [

      {

        type: 'checkbox',

        question: '현재 사용 중이거나 고려 중인 경쟁 제품은?',

        options: ['A사 제품', 'B사 제품', 'C사 제품', 'D사 제품', '기타']

      },

      {

        type: 'radio',

        question: '경쟁사 대비 우리 제품의 가격 경쟁력은?',

        options: ['매우 좋음', '좋음', '비슷함', '나쁨', '매우 나쁨']

      },

      {

        type: 'text',

        question: '경쟁사 제품 대비 우리 제품만의 차별점은 무엇이라고 생각하십니까?'

      }

    ]

  },

  {

    id: 'feature-prioritization',

    title: '기능 우선순위 조사',

    description: '새로운 기능 개발의 우선순위를 결정하기 위한 설문입니다. 사용자가 원하는 기능을 파악합니다.',

    category: '리서치',

    icon: 'ri-list-check-2',

    questions: [

      {

        type: 'checkbox',

        question: '가장 필요하다고 생각하는 신규 기능은? (최대 3개)',

        options: ['다크모드', '알림 설정', '데이터 내보내기', '협업 기능', '모바일 앱']

      },

      {

        type: 'radio',

        question: '새 기능을 위해 추가 비용을 지불할 의향이 있습니까?',

        options: ['적극 의향 있음', '의향 있음', '보통', '없음', '전혀 없음']

      },

      {

        type: 'text',

        question: '위 목록에 없는 원하는 기능이 있다면 자유롭게 제안해 주세요.'

      }

    ]

  },

  {

    id: 'pricing-research',

    title: '가격 민감도 조사',

    description: '적정 가격대를 파악하고 가격 전략을 수립하기 위한 설문입니다. 고객의 지불 의향을 측정합니다.',

    category: '리서치',

    icon: 'ri-money-dollar-circle-line',

    questions: [

      {

        type: 'radio',

        question: '현재 가격이 적정하다고 생각하십니까?',

        options: ['매우 저렴함', '저렴함', '적정함', '비쌈', '매우 비쌈']

      },

      {

        type: 'radio',

        question: '이 제품/서비스에 지불할 의향이 있는 가격대는?',

        options: ['1만원 미만', '1-3만원', '3-5만원', '5-10만원', '10만원 이상']

      },

      {

        type: 'checkbox',

        question: '가격 인상 시에도 계속 사용하시겠습니까?',

        options: ['10% 인상까지', '20% 인상까지', '30% 인상까지', '가격과 무관', '사용 중단']

      }

    ]

  },

  {

    id: 'content-preference',

    title: '콘텐츠 선호도 조사',

    description: '사용자가 선호하는 콘텐츠 유형과 주제를 파악하는 설문입니다. 콘텐츠 전략 수립에 활용됩니다.',

    category: '리서치',

    icon: 'ri-article-line',

    questions: [

      {

        type: 'checkbox',

        question: '선호하는 콘텐츠 형식은?',

        options: ['블로그 글', '동영상', '인포그래픽', '팟캐스트', '웨비나']

      },

      {

        type: 'checkbox',

        question: '관심 있는 주제는?',

        options: ['트렌드', '실무 팁', '사례 연구', '인터뷰', '통계 자료']

      },

      {

        type: 'radio',

        question: '콘텐츠를 얼마나 자주 받고 싶으십니까?',

        options: ['매일', '주 2-3회', '주 1회', '월 2-3회', '월 1회']

      }

    ]

  },



  // HR 카테고리

  {

    id: 'onboarding-survey',

    title: '신규 입사자 온보딩',

    description: '신입 직원의 온보딩 경험을 평가하는 설문입니다. 입사 프로세스 개선에 활용합니다.',

    category: 'HR',

    icon: 'ri-user-add-line',

    questions: [

      {

        type: 'radio',

        question: '온보딩 프로세스가 원활했습니까?',

        options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다']

      },

      {

        type: 'checkbox',

        question: '온보딩 중 가장 도움이 된 것은?',

        options: ['멘토 배정', '교육 프로그램', '팀 소개', '업무 매뉴얼', '환영 행사']

      },

      {

        type: 'text',

        question: '온보딩 과정에서 개선이 필요한 부분을 알려주세요.'

      }

    ]

  },

  {

    id: 'training-evaluation',

    title: '교육 프로그램 평가',

    description: '직원 교육의 효과성을 측정하는 설문입니다. 교육 내용과 방식을 개선하는 데 활용됩니다.',

    category: 'HR',

    icon: 'ri-book-open-line',

    questions: [

      {

        type: 'radio',

        question: '교육 내용이 업무에 도움이 되었습니까?',

        options: ['매우 도움됨', '도움됨', '보통', '별로', '전혀 아님']

      },

      {

        type: 'radio',

        question: '강사의 전문성과 교수법은 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'checkbox',

        question: '향후 받고 싶은 교육은?',

        options: ['리더십', '기술 역량', '소프트 스킬', '외국어', '자격증']

      }

    ]

  },

  {

    id: 'performance-review',

    title: '성과 평가 피드백',

    description: '성과 평가 프로세스의 공정성과 만족도를 측정하는 설문입니다. 평가 시스템 개선에 활용됩니다.',

    category: 'HR',

    icon: 'ri-medal-line',

    questions: [

      {

        type: 'radio',

        question: '성과 평가가 공정하게 진행되었다고 생각하십니까?',

        options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다']

      },

      {

        type: 'radio',

        question: '평가 기준이 명확했습니까?',

        options: ['매우 명확함', '명확함', '보통', '불명확함', '매우 불명확함']

      },

      {

        type: 'text',

        question: '평가 프로세스 개선을 위한 제안사항을 알려주세요.'

      }

    ]

  },

  {

    id: 'workplace-culture',

    title: '조직 문화 진단',

    description: '조직 문화의 현황을 진단하고 개선 방향을 모색하는 설문입니다. 건강한 조직 문화 구축에 활용됩니다.',

    category: 'HR',

    icon: 'ri-community-line',

    questions: [

      {

        type: 'radio',

        question: '우리 조직의 문화가 긍정적이라고 생각하십니까?',

        options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다']

      },

      {

        type: 'checkbox',

        question: '우리 조직의 강점은 무엇입니까?',

        options: ['자유로운 소통', '혁신 장려', '수평적 문화', '협업 중시', '성과 인정']

      },

      {

        type: 'checkbox',

        question: '개선이 필요한 문화적 측면은?',

        options: ['의사결정 속도', '부서 간 협력', '일과 삶의 균형', '피드백 문화', '투명성']

      }

    ]

  },

  {

    id: 'remote-work',

    title: '재택근무 만족도',

    description: '재택근무 환경과 제도에 대한 만족도를 조사하는 설문입니다. 하이브리드 근무 정책 수립에 활용됩니다.',

    category: 'HR',

    icon: 'ri-home-office-line',

    questions: [

      {

        type: 'radio',

        question: '재택근무 시 생산성은 어떠합니까?',

        options: ['매우 높음', '높음', '비슷함', '낮음', '매우 낮음']

      },

      {

        type: 'checkbox',

        question: '재택근무의 장점은 무엇입니까?',

        options: ['출퇴근 시간 절약', '업무 집중', '유연한 일정', '비용 절감', '편안한 환경']

      },

      {

        type: 'radio',

        question: '선호하는 근무 형태는?',

        options: ['완전 재택', '주 4일 재택', '주 3일 재택', '주 2일 재택', '완전 출근']

      }

    ]

  },

  {

    id: 'exit-interview',

    title: '퇴사자 인터뷰',

    description: '퇴사하는 직원의 의견을 수집하여 조직 개선에 활용하는 설문입니다. 이직 사유와 개선점을 파악합니다.',

    category: 'HR',

    icon: 'ri-logout-box-line',

    questions: [

      {

        type: 'radio',

        question: '퇴사를 결정한 주된 이유는 무엇입니까?',

        options: ['커리어 발전', '보상', '업무 환경', '조직 문화', '개인 사정']

      },

      {

        type: 'radio',

        question: '회사를 다른 사람에게 추천하시겠습니까?',

        options: ['적극 추천', '추천', '보통', '비추천', '절대 비추천']

      },

      {

        type: 'text',

        question: '회사가 개선해야 할 점을 솔직하게 말씀해 주세요.'

      }

    ]

  },

  {

    id: 'benefits-survey',

    title: '복리후생 만족도',

    description: '현재 제공되는 복리후생에 대한 만족도와 개선 요구사항을 파악하는 설문입니다.',

    category: 'HR',

    icon: 'ri-gift-line',

    questions: [

      {

        type: 'radio',

        question: '현재 복리후생에 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '가장 만족스러운 복리후생은?',

        options: ['건강검진', '식사 지원', '교육비', '휴가', '경조사비']

      },

      {

        type: 'checkbox',

        question: '추가로 원하는 복리후생은?',

        options: ['재택근무 수당', '자기계발비', '헬스장', '간식', '유연근무제']

      }

    ]

  },

  {

    id: 'leadership-feedback',

    title: '리더십 피드백',

    description: '관리자의 리더십에 대한 직원들의 평가를 수집하는 설문입니다. 리더십 개발에 활용됩니다.',

    category: 'HR',

    icon: 'ri-user-star-line',

    questions: [

      {

        type: 'radio',

        question: '상사의 리더십에 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '상사의 강점은 무엇입니까?',

        options: ['명확한 지시', '경청', '공정함', '지원', '비전 제시']

      },

      {

        type: 'text',

        question: '리더십 개선을 위한 건설적인 피드백을 부탁드립니다.'

      }

    ]

  },



  // 교육 카테고리

  {

    id: 'course-evaluation',

    title: '강의 평가',

    description: '강의의 질과 효과성을 평가하는 설문입니다. 교수법 개선과 커리큘럼 개발에 활용됩니다.',

    category: '교육',

    icon: 'ri-graduation-cap-line',

    questions: [

      {

        type: 'radio',

        question: '강의 내용이 이해하기 쉬웠습니까?',

        options: ['매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움']

      },

      {

        type: 'radio',

        question: '강의 자료와 교재는 적절했습니까?',

        options: ['매우 적절', '적절', '보통', '부적절', '매우 부적절']

      },

      {

        type: 'text',

        question: '강의에서 가장 유익했던 부분을 알려주세요.'

      }

    ]

  },

  {

    id: 'student-satisfaction',

    title: '학생 만족도 조사',

    description: '학교나 학원의 전반적인 서비스에 대한 학생 만족도를 측정하는 설문입니다.',

    category: '교육',

    icon: 'ri-school-line',

    questions: [

      {

        type: 'radio',

        question: '교육 기관에 대한 전반적인 만족도는?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '개선이 필요한 부분은?',

        options: ['교육 과정', '시설', '행정 서비스', '상담', '학비']

      },

      {

        type: 'radio',

        question: '이 교육 기관을 다른 사람에게 추천하시겠습니까?',

        options: ['적극 추천', '추천', '보통', '비추천', '절대 비추천']

      }

    ]

  },

  {

    id: 'elearning-feedback',

    title: '온라인 학습 피드백',

    description: '온라인 교육 플랫폼과 콘텐츠에 대한 학습자 경험을 평가하는 설문입니다.',

    category: '교육',

    icon: 'ri-computer-line',

    questions: [

      {

        type: 'radio',

        question: '온라인 학습 플랫폼의 사용성은 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'checkbox',

        question: '가장 유용했던 학습 기능은?',

        options: ['동영상 강의', '퀴즈', '토론방', '자료실', '진도 관리']

      },

      {

        type: 'text',

        question: '플랫폼에 추가되었으면 하는 기능을 제안해 주세요.'

      }

    ]

  },

  {

    id: 'tutoring-evaluation',

    title: '과외/멘토링 평가',

    description: '1:1 또는 소그룹 교육의 효과성을 평가하는 설문입니다. 개인화된 교육 품질을 측정합니다.',

    category: '교육',

    icon: 'ri-parent-line',

    questions: [

      {

        type: 'radio',

        question: '튜터의 설명이 명확했습니까?',

        options: ['매우 명확', '명확', '보통', '불명확', '매우 불명확']

      },

      {

        type: 'radio',

        question: '학습 진도가 적절했습니까?',

        options: ['매우 적절', '적절', '보통', '빠름', '느림']

      },

      {

        type: 'text',

        question: '학습 효과를 높이기 위한 제안사항을 알려주세요.'

      }

    ]

  },



  // 헬스케어 카테고리

  {

    id: 'patient-satisfaction',

    title: '환자 만족도 조사',

    description: '병원이나 의료 서비스에 대한 환자 만족도를 측정하는 설문입니다. 의료 서비스 품질 개선에 활용됩니다.',

    category: '헬스케어',

    icon: 'ri-hospital-line',

    questions: [

      {

        type: 'radio',

        question: '진료 대기 시간은 적절했습니까?',

        options: ['매우 적절', '적절', '보통', '길었음', '매우 길었음']

      },

      {

        type: 'radio',

        question: '의료진의 친절도와 전문성은 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'checkbox',

        question: '개선이 필요한 부분은?',

        options: ['예약 시스템', '대기 시간', '시설', '직원 응대', '주차']

      }

    ]

  },

  {

    id: 'fitness-feedback',

    title: '피트니스 센터 만족도',

    description: '헬스장이나 피트니스 센터 이용 경험을 평가하는 설문입니다. 시설과 프로그램 개선에 활용됩니다.',

    category: '헬스케어',

    icon: 'ri-run-line',

    questions: [

      {

        type: 'radio',

        question: '시설과 장비에 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '주로 이용하는 프로그램은?',

        options: ['웨이트', '유산소', 'GX', 'PT', '수영']

      },

      {

        type: 'text',

        question: '추가되었으면 하는 운동 프로그램이나 시설을 제안해 주세요.'

      }

    ]

  },

  {

    id: 'wellness-program',

    title: '웰니스 프로그램 평가',

    description: '기업이나 단체의 건강 증진 프로그램 효과를 측정하는 설문입니다.',

    category: '헬스케어',

    icon: 'ri-heart-pulse-line',

    questions: [

      {

        type: 'radio',

        question: '웰니스 프로그램 참여 후 건강이 개선되었습니까?',

        options: ['매우 개선', '개선', '비슷함', '악화', '매우 악화']

      },

      {

        type: 'checkbox',

        question: '참여한 프로그램은?',

        options: ['건강검진', '운동 프로그램', '영양 상담', '스트레스 관리', '금연 프로그램']

      },

      {

        type: 'radio',

        question: '프로그램을 계속 참여하시겠습니까?',

        options: ['적극 참여', '참여', '보통', '불참', '절대 불참']

      }

    ]

  },



  // 소매/유통 카테고리

  {

    id: 'retail-experience',

    title: '매장 방문 경험',

    description: '오프라인 매장 방문 고객의 경험을 평가하는 설문입니다. 매장 운영과 서비스 개선에 활용됩니다.',

    category: '소매/유통',

    icon: 'ri-store-line',

    questions: [

      {

        type: 'radio',

        question: '매장 분위기와 청결도는 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'radio',

        question: '직원의 서비스는 만족스러웠습니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '방문 목적은 무엇이었습니까?',

        options: ['제품 구매', '둘러보기', '반품/교환', '상담', '행사 참여']

      }

    ]

  },

  {

    id: 'online-shopping',

    title: '온라인 쇼핑 만족도',

    description: '온라인 쇼핑몰 이용 경험을 평가하는 설문입니다. 웹사이트 개선과 배송 서비스 향상에 활용됩니다.',

    category: '소매/유통',

    icon: 'ri-shopping-cart-line',

    questions: [

      {

        type: 'radio',

        question: '웹사이트에서 원하는 상품을 찾기 쉬웠습니까?',

        options: ['매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움']

      },

      {

        type: 'radio',

        question: '배송 속도에 만족하십니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '개선이 필요한 부분은?',

        options: ['검색 기능', '상품 설명', '결제 과정', '배송 추적', '고객센터']

      }

    ]

  },

  {

    id: 'delivery-feedback',

    title: '배송 서비스 평가',

    description: '배송 서비스의 품질을 측정하는 설문입니다. 배송 프로세스 개선에 활용됩니다.',

    category: '소매/유통',

    icon: 'ri-truck-line',

    questions: [

      {

        type: 'radio',

        question: '배송 시간은 정확했습니까?',

        options: ['매우 정확', '정확', '보통', '지연됨', '매우 지연됨']

      },

      {

        type: 'radio',

        question: '상품 포장 상태는 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'text',

        question: '배송 서비스 개선을 위한 제안사항을 알려주세요.'

      }

    ]

  },



  // 외식/서비스 카테고리

  {

    id: 'restaurant-feedback',

    title: '레스토랑 방문 후기',

    description: '식당 방문 고객의 만족도를 측정하는 설문입니다. 음식 품질과 서비스 개선에 활용됩니다.',

    category: '외식/서비스',

    icon: 'ri-restaurant-line',

    questions: [

      {

        type: 'radio',

        question: '음식의 맛과 품질은 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'radio',

        question: '서비스와 직원 응대는 만족스러웠습니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '재방문 의향이 있으십니까?',

        options: ['적극 재방문', '재방문 의향', '보통', '재방문 안함', '추천 안함']

      }

    ]

  },

  {

    id: 'hotel-satisfaction',

    title: '호텔 숙박 만족도',

    description: '호텔 투숙 경험을 평가하는 설문입니다. 객실 품질과 서비스 개선에 활용됩니다.',

    category: '외식/서비스',

    icon: 'ri-hotel-line',

    questions: [

      {

        type: 'radio',

        question: '객실 청결도와 편의시설에 만족하셨습니까?',

        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

      },

      {

        type: 'checkbox',

        question: '이용하신 부대시설은?',

        options: ['레스토랑', '피트니스', '수영장', '스파', '비즈니스센터']

      },

      {

        type: 'radio',

        question: '체크인/체크아웃 과정은 원활했습니까?',

        options: ['매우 원활', '원활', '보통', '불편', '매우 불편']

      }

    ]

  },

  {

    id: 'cafe-experience',

    title: '카페 이용 경험',

    description: '카페 방문 고객의 만족도를 조사하는 설문입니다. 메뉴와 분위기 개선에 활용됩니다.',

    category: '외식/서비스',

    icon: 'ri-cup-line',

    questions: [

      {

        type: 'radio',

        question: '음료의 맛과 품질은 어떠했습니까?',

        options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']

      },

      {

        type: 'checkbox',

        question: '카페를 방문한 주된 이유는?',

        options: ['음료', '디저트', '공부/작업', '모임', '분위기']

      },

      {

        type: 'text',

        question: '메뉴나 서비스 개선을 위한 제안을 해주세요.'

      }

    ]

  },



  // 기술/IT 카테고리

  {

    id: 'app-usability',

    title: '앱 사용성 평가',

    description: '모바일 앱의 사용자 경험을 평가하는 설문입니다. UI/UX 개선과 기능 최적화에 활용됩니다.',

    category: '기술/IT',

    icon: 'ri-smartphone-line',

    questions: [

      {

        type: 'radio',

        question: '앱의 전반적인 사용 편의성은 어떻습니까?',

        options: ['매우 편리', '편리', '보통', '불편', '매우 불편']

      },

      {

        type: 'checkbox',

        question: '앱 사용 중 불편한 점은?',

        options: ['느린 속도', '복잡한 메뉴', '오류', '디자인', '기능 부족']

      },

      {

        type: 'radio',

        question: '앱을 다른 사람에게 추천하시겠습니까?',

        options: ['적극 추천', '추천', '보통', '비추천', '절대 비추천']

      }

    ]

  },

  {

    id: 'software-feedback',

    title: '소프트웨어 사용 피드백',

    description: '소프트웨어 제품의 기능과 성능을 평가하는 설문입니다. 제품 개선 로드맵 수립에 활용됩니다.',

    category: '기술/IT',

    icon: 'ri-code-box-line',

    questions: [

      {

        type: 'radio',

        question: '소프트웨어가 업무 효율성 향상에 도움이 되었습니까?',

        options: ['매우 도움됨', '도움됨', '보통', '별로', '전혀 아님']

      },

      {

        type: 'checkbox',

        question: '가장 자주 사용하는 기능은?',

        options: ['문서 작성', '데이터 분석', '협업', '자동화', '보고서']

      },

      {

        type: 'text',

        question: '추가되었으면 하는 기능을 제안해 주세요.'

      }

    ]

  },

  {

    id: 'tech-support',

    title: '기술 지원 만족도',

    description: '기술 지원팀의 서비스 품질을 평가하는 설문입니다. 고객 지원 프로세스 개선에 활용됩니다.',

    category: '기술/IT',

    icon: 'ri-customer-service-line',

    questions: [

      {

        type: 'radio',

        question: '문제가 신속하게 해결되었습니까?',

        options: ['매우 신속', '신속', '보통', '느림', '매우 느림']

      },

      {

        type: 'radio',

        question: '지원 담당자의 전문성은 어떠했습니까?',

        options: ['매우 전문적', '전문적', '보통', '부족', '매우 부족']

      },

      {

        type: 'text',

        question: '기술 지원 서비스 개선을 위한 의견을 알려주세요.'

      }

    ]

  },



  // 커뮤니티 카테고리

  {

    id: 'community-engagement',

    title: '커뮤니티 참여도 조사',

    description: '온라인 커뮤니티의 활성화 정도와 회원 만족도를 측정하는 설문입니다.',

    category: '커뮤니티',

    icon: 'ri-group-line',

    questions: [

      {

        type: 'radio',

        question: '커뮤니티 활동에 얼마나 자주 참여하십니까?',

        options: ['매일', '주 2-3회', '주 1회', '월 2-3회', '거의 안함']

      },

      {

        type: 'checkbox',

        question: '주로 참여하는 활동은?',

        options: ['게시글 읽기', '댓글 작성', '게시글 작성', '이벤트 참여', '정보 공유']

      },

      {

        type: 'text',

        question: '커뮤니티 활성화를 위한 아이디어를 제안해 주세요.'

      }

    ]

  },

  {

    id: 'volunteer-feedback',

    title: '봉사활동 피드백',

    description: '봉사활동 참여자의 경험을 평가하는 설문입니다. 봉사 프로그램 개선에 활용됩니다.',

    category: '커뮤니티',

    icon: 'ri-hand-heart-line',

    questions: [

      {

        type: 'radio',

        question: '봉사활동이 의미 있었습니까?',

        options: ['매우 의미있음', '의미있음', '보통', '별로', '전혀 아님']

      },

      {

        type: 'radio',

        question: '향후 다시 참여하실 의향이 있습니까?',

        options: ['적극 참여', '참여', '보통', '불참', '절대 불참']

      },

      {

        type: 'checkbox',

        question: '봉사활동을 통해 얻은 것은?',

        options: ['보람', '새로운 경험', '인간관계', '기술 습득', '사회 공헌']

      }

    ]

  },



  // 정부/공공 카테고리

  {

    id: 'public-service',

    title: '공공 서비스 만족도',

    description: '정부나 공공기관의 서비스에 대한 시민 만족도를 측정하는 설문입니다.',

    category: '정부/공공',

    icon: 'ri-government-line',

    questions: [

      {

        type: 'radio',

        question: '공공 서비스 이용이 편리했습니까?',

        options: ['매우 편리', '편리', '보통', '불편', '매우 불편']

      },

      {

        type: 'checkbox',

        question: '개선이 필요한 부분은?',

        options: ['대기 시간', '직원 응대', '시설', '온라인 서비스', '안내']

      },

      {

        type: 'text',

        question: '공공 서비스 개선을 위한 제안사항을 알려주세요.'

      }

    ]

  },

  {

    id: 'policy-feedback',

    title: '정책 의견 수렴',

    description: '새로운 정책이나 제도에 대한 시민 의견을 수집하는 설문입니다.',

    category: '정부/공공',

    icon: 'ri-file-list-line',

    questions: [

      {

        type: 'radio',

        question: '제안된 정책에 대해 어떻게 생각하십니까?',

        options: ['매우 찬성', '찬성', '중립', '반대', '매우 반대']

      },

      {

        type: 'checkbox',

        question: '정책의 예상 효과는 무엇이라고 생각하십니까?',

        options: ['경제 활성화', '복지 향상', '환경 개선', '안전 강화', '편의 증대']

      },

      {

        type: 'text',

        question: '정책 개선을 위한 의견을 자유롭게 작성해 주세요.'

      },

    ]

  },
  {
    id: 'financial-product-satisfaction',
    title: '금융 상품 만족도',
    description: '은행, 증권, 보험 등 금융 상품 이용 고객의 만족도와 니즈를 파악하는 설문입니다. 상품 개발 및 서비스 개선에 활용됩니다.',
    category: '금융/보험',
    icon: 'ri-bank-card-line',
    questions: [
      { type: 'radio', question: '현재 이용 중인 금융 상품에 대해 전반적으로 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'checkbox', question: '금융 상품 선택 시 가장 중요하게 고려하는 요소는?', options: ['수익률/이율', '안정성/위험도', '수수료', '모바일 앱 편의성', '브랜드 신뢰도'] },
      { type: 'text', question: '개인 맞춤형 금융 상품 추천 서비스에 대한 의견을 알려주세요.' }
    ]
  },
  {
    id: 'mobile-banking-ux',
    title: '모바일 뱅킹 사용성 평가',
    description: '금융 앱의 사용자 경험(UX/UI)과 편의성을 평가합니다. 앱 기능 개선 및 디지털 채널 최적화에 활용됩니다.',
    category: '금융/보험',
    icon: 'ri-smartphone-line',
    questions: [
      { type: 'radio', question: '모바일 뱅킹 앱의 전반적인 사용 편의성은 어떻습니까?', options: ['매우 편리함', '편리함', '보통', '불편함', '매우 불편함'] },
      { type: 'checkbox', question: '앱 사용 시 가장 만족스러운 기능은?', options: ['간편 이체', '자산 관리', '보안 기능', '알림 서비스', '챗봇 상담'] },
      { type: 'radio', question: '앱 오류나 접속 지연 문제는 얼마나 자주 발생합니까?', options: ['거의 없음', '가끔', '보통', '자주', '매우 자주'] }
    ]
  },
  {
    id: 'insurance-claim-process',
    title: '보험 청구 프로세스 만족도',
    description: '보험금 청구 과정의 신속성, 투명성, 담당자 응대에 대한 고객 만족도를 평가합니다.',
    category: '금융/보험',
    icon: 'ri-file-shield-line',
    questions: [
      { type: 'radio', question: '보험금 청구 절차는 얼마나 간편했습니까?', options: ['매우 간편', '간편', '보통', '복잡', '매우 복잡'] },
      { type: 'radio', question: '보험금 지급 소요 기간에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'text', question: '담당 직원의 응대 방식이나 전문성에 대한 의견을 자유롭게 작성해 주세요.' }
    ]
  },
  {
    id: 'retirement-planning-needs',
    title: '은퇴 및 노후 설계 니즈 조사',
    description: '개인의 은퇴 준비 현황 및 금융 상품 선호도를 파악하여 맞춤형 노후 상품 개발에 활용합니다.',
    category: '금융/보험',
    icon: 'ri-wallet-line',
    questions: [
      { type: 'radio', question: '현재 은퇴 준비를 충분히 하고 있다고 생각하십니까?', options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다'] },
      { type: 'checkbox', question: '노후 자금 마련을 위해 주로 고려하는 금융 상품은?', options: ['연금/저축', '부동산 투자', '주식/펀드', '개인연금', '정기 예금'] },
      { type: 'radio', question: '은퇴 후 예상되는 월 생활비 수준은?', options: ['100만원 미만', '100-200만원', '200-300만원', '300-400만원', '400만원 이상'] }
    ]
  },
  {
    id: 'investment-service-feedback',
    title: '투자 서비스 및 자문 평가',
    description: '증권사나 투자 자문 서비스 이용자의 만족도 및 제공되는 정보의 질을 평가합니다.',
    category: '금융/보험',
    icon: 'ri-funds-line',
    questions: [
      { type: 'radio', question: '제공된 투자 정보의 정확성과 유용성에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'checkbox', question: '투자 서비스에서 개선이 필요한 부분은?', options: ['수수료', '정보 업데이트 속도', '개인화된 포트폴리오 추천', '온라인 거래 시스템', '상담 전문성'] },
      { type: 'radio', question: '주요 투자 결정 시 자문 서비스의 영향을 얼마나 받습니까?', options: ['매우 크게 받음', '어느 정도 받음', '보통', '거의 안 받음', '전혀 안 받음'] }
    ]
  },
  {
    id: 'digital-branch-experience',
    title: '디지털 지점/키오스크 경험',
    description: '무인 또는 디지털화된 금융 지점 이용 경험을 평가하여 비대면 채널 서비스 개선에 활용합니다.',
    category: '금융/보험',
    icon: 'ri-computer-line',
    questions: [
      { type: 'radio', question: '키오스크나 디지털 기기의 사용법이 직관적이었습니까?', options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다'] },
      { type: 'radio', question: '대면 서비스 대비 업무 처리 속도에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'text', question: '디지털 지점에서 직원 도움 없이 처리하기 어려웠던 업무가 있다면 알려주세요.' }
    ]
  },


  // --- 여행/숙박 카테고리 (5개) ---
  {
    id: 'travel-package-evaluation',
    title: '여행 상품 및 가이드 평가',
    description: '여행 패키지 이용객의 만족도를 측정하고, 여행사의 상품 구성 및 가이드 서비스 품질을 평가하는 설문입니다.',
    category: '여행/숙박',
    icon: 'ri-flight-takeoff-line',
    questions: [
      { type: 'radio', question: '여행 상품의 일정 구성에 만족하셨습니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'radio', question: '가이드의 전문성과 서비스는 어떠했습니까?', options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] },
      { type: 'checkbox', question: '가장 만족스러웠던 부분은?', options: ['숙소', '이동 수단', '식사', '관광지', '현지 체험'] }
    ]
  },
  {
    id: 'accommodation-cleanliness',
    title: '숙박 시설 청결 및 환경 평가',
    description: '호텔, 펜션 등의 청결도, 시설 상태, 소음 등 숙박 환경에 대한 만족도 평가.',
    category: '여행/숙박',
    icon: 'ri-bed-line',
    questions: [
      { type: 'radio', question: '객실의 청결도에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'checkbox', question: '숙면을 방해했던 요소는 무엇입니까?', options: ['소음', '침구 불편', '온도/습도', '조명', '벌레'] },
      { type: 'text', question: '숙박 시설 개선을 위해 가장 필요한 것을 제안해 주세요.' }
    ]
  },
  {
    id: 'online-booking-experience',
    title: '온라인 예약 시스템 만족도',
    description: '항공, 숙박 예약 웹사이트/앱의 검색 기능, 결제 과정, 정보 제공 수준 등 사용 편의성 평가.',
    category: '여행/숙박',
    icon: 'ri-global-line',
    questions: [
      { type: 'radio', question: '예약 과정이 복잡하거나 오류가 있었습니까?', options: ['전혀 없었음', '거의 없었음', '보통', '약간 불편', '매우 불편'] },
      { type: 'radio', question: '가격 정보가 명확하게 제공되었다고 생각하십니까?', options: ['매우 명확', '명확', '보통', '불명확', '매우 불명확'] },
      { type: 'checkbox', question: '예약 시 가장 중요하게 생각하는 요소는?', options: ['가격', '취소/환불 정책', '실시간 예약 가능 여부', '이용자 리뷰', '사이트 속도'] }
    ]
  },
  {
    id: 'destination-attractiveness',
    title: '여행지 매력도 및 추천 의향',
    description: '방문한 여행지의 전반적인 만족도, 문화적 매력, 재방문 의향 등을 조사하여 마케팅 전략 수립에 활용.',
    category: '여행/숙박',
    icon: 'ri-map-pin-2-line',
    questions: [
      { type: 'radio', question: '여행지에 대한 전반적인 만족도는?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'checkbox', question: '여행지에서 인상 깊었던 요소는?', options: ['자연 경관', '역사/문화 유적', '음식/맛집', '쇼핑', '치안/안전'] },
      { type: 'radio', question: '이 여행지를 친구나 동료에게 추천하시겠습니까?', options: ['적극 추천', '추천', '보통', '비추천', '절대 비추천'] }
    ]
  },
  {
    id: 'airline-service-quality',
    title: '항공사 서비스 품질 평가',
    description: '탑승 전후 서비스, 기내 서비스, 승무원 응대 등에 대한 고객 만족도를 평가하여 항공 서비스 개선에 활용.',
    category: '여행/숙박',
    icon: 'ri-plane-line',
    questions: [
      { type: 'radio', question: '승무원의 친절도와 전문성에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'radio', question: '기내식 품질에 대해 어떻게 평가하십니까?', options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] },
      { type: 'checkbox', question: '항공편 이용 시 가장 중요하게 생각하는 요소는?', options: ['정시 운항', '좌석 편의성', '수하물 서비스', '가격', '마일리지 혜택'] }
    ]
  },


  // --- ESG/사회공헌 카테고리 (5개) ---
  {
    id: 'sustainability-perception',
    title: 'ESG 및 지속가능성 인식 조사',
    description: '소비자 및 이해관계자들이 기업의 환경, 사회, 지배구조(ESG) 활동을 어떻게 인식하고 있는지 파악하는 설문입니다.',
    category: 'ESG/사회공헌',
    icon: 'ri-leaf-line',
    questions: [
      { type: 'radio', question: '제품 구매 시 기업의 친환경 노력(E)이 얼마나 중요합니까?', options: ['매우 중요', '중요', '보통', '별로 중요하지 않음', '전혀 중요하지 않음'] },
      { type: 'checkbox', question: '우리 기업의 사회 공헌 활동(S)에 대해 알고 계십니까?', options: ['자세히 알고 있다', '들어본 적 있다', '전혀 모른다'] },
      { type: 'text', question: '우리 기업이 가장 중점을 두어야 할 ESG 분야는 무엇이라고 생각하십니까?' }
    ]
  },
  {
    id: 'ethical-sourcing-opinion',
    title: '윤리적/공정 무역 제품 선호도',
    description: '제품 구매 시 윤리적 소비, 공정 무역 등에 대한 소비자의 태도 및 지불 의향을 조사합니다.',
    category: 'ESG/사회공헌',
    icon: 'ri-hand-coin-line',
    questions: [
      { type: 'radio', question: '윤리적/공정 무역 제품을 구매할 의향이 있습니까?', options: ['매우 높음', '높음', '보통', '낮음', '매우 낮음'] },
      { type: 'radio', question: '공정 무역 제품에 대해 일반 제품보다 추가 비용을 지불할 의향이 있습니까?', options: ['10% 이상', '5~10%', '0~5%', '전혀 없음'] },
      { type: 'checkbox', question: '윤리적 기업을 선택하는 주요 이유는?', options: ['사회적 책임감', '제품 품질 신뢰', '개인의 가치관', '브랜드 이미지', '정부 정책'] }
    ]
  },
  {
    id: 'social-contribution-impact',
    title: '사회 공헌 활동 참여 효과 분석',
    description: '기업의 사회 공헌 프로그램 참여자(수혜자 또는 직원 봉사자)의 만족도와 효과를 측정합니다.',
    category: 'ESG/사회공헌',
    icon: 'ri-heart-hand-line',
    questions: [
      { type: 'radio', question: '사회 공헌 활동의 운영 방식에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'checkbox', question: '참여를 통해 가장 크게 얻은 것은?', options: ['자아실현/보람', '새로운 경험', '회사에 대한 긍정적 인식', '동료와의 관계 개선', '새로운 지식'] },
      { type: 'text', question: '활동 효과를 높이기 위한 제안사항을 알려주세요.' }
    ]
  },
  {
    id: 'green-product-evaluation',
    title: '친환경 제품 사용 경험',
    description: '친환경 인증 제품이나 재활용 제품의 성능, 가격, 만족도 등을 소비자에게 직접 평가받습니다.',
    category: 'ESG/사회공헌',
    icon: 'ri-recycle-line',
    questions: [
      { type: 'radio', question: '친환경 제품이 일반 제품과 비교하여 품질이 떨어진다고 느끼십니까?', options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다'] },
      { type: 'radio', question: '친환경 제품의 가격 수준은 적정하다고 생각하십니까?', options: ['매우 저렴', '저렴', '적정', '비쌈', '매우 비쌈'] },
      { type: 'checkbox', question: '친환경 제품 구매 시 가장 중요하게 확인하는 정보는?', options: ['환경 인증 마크', '재활용 가능 여부', '유해 성분 미포함', '생산 과정 투명성', '포장재'] }
    ]
  },
  {
    id: 'governance-transparency',
    title: '기업 지배구조 투명성 인식',
    description: '기업의 투명한 의사결정 및 건전한 지배구조에 대한 이해관계자 인식과 신뢰도를 조사합니다.',
    category: 'ESG/사회공헌',
    icon: 'ri-building-line',
    questions: [
      { type: 'radio', question: '우리 기업의 정보 공개 수준은 투명하다고 생각하십니까?', options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다'] },
      { type: 'radio', question: '기업의 경영진이 윤리적인 결정을 내리고 있다고 신뢰하십니까?', options: ['매우 신뢰', '신뢰', '보통', '불신', '매우 불신'] },
      { type: 'checkbox', question: '경영 투명성을 높이기 위해 가장 중요한 것은?', options: ['독립적인 이사회 구성', '내부 고발 시스템 활성화', '공정한 감사', '경영진 보수 공개', '주주 소통 강화'] }
    ]
  },


  // --- 크리에이티브 카테고리 (5개) ---
  {
    id: 'ad-campaign-effectiveness',
    title: '광고 캠페인 효과 분석',
    description: '새로운 광고 캠페인의 인지 경로, 메시지 전달력, 브랜드 이미지 변화에 미치는 영향을 측정하는 설문입니다.',
    category: '크리에이티브',
    icon: 'ri-megaphone-line',
    questions: [
      { type: 'radio', question: '이 광고 캠페인을 통해 우리 브랜드를 접한 적이 있습니까?', options: ['있다', '없다'] },
      { type: 'checkbox', question: '어떤 매체를 통해 광고를 보셨습니까? (복수 선택 가능)', options: ['TV', '유튜브', 'SNS(인스타그램/페이스북 등)', '검색 광고', '옥외 광고'] },
      { type: 'radio', question: '광고가 전달하려는 메시지를 명확히 이해했습니까?', options: ['매우 명확', '명확', '보통', '불명확', '매우 불명확'] }
    ]
  },
  {
    id: 'content-branding-fit',
    title: '콘텐츠와 브랜드 일치도 평가',
    description: '제작된 콘텐츠(영상, 디자인, 카피 등)가 브랜드의 핵심 가치 및 이미지와 얼마나 부합하는지 평가합니다.',
    category: '크리에이티브',
    icon: 'ri-palette-line',
    questions: [
      { type: 'radio', question: '이 콘텐츠가 우리 브랜드의 이미지를 잘 반영하고 있다고 생각하십니까?', options: ['매우 그렇다', '그렇다', '보통', '아니다', '전혀 아니다'] },
      { type: 'checkbox', question: '콘텐츠에서 가장 매력적인 요소는?', options: ['독창적인 아이디어', '고품질의 시각 효과', '감성을 자극하는 스토리', '정보의 유용성', '재미/유머'] },
      { type: 'text', question: '콘텐츠가 브랜드 이미지와 일치하지 않는다고 생각하는 부분이 있다면 설명해 주세요.' }
    ]
  },
  {
    id: 'logo-design-preference',
    title: '로고 및 시각 디자인 선호도 조사',
    description: '신규 로고나 디자인 시안에 대한 소비자 및 타겟층의 직관적인 선호도와 연상 이미지를 조사합니다.',
    category: '크리에이티브',
    icon: 'ri-quill-pen-line',
    questions: [
      { type: 'radio', question: '제시된 로고 디자인 시안 중 가장 선호하는 것은?', options: ['시안 A', '시안 B', '시안 C'] },
      { type: 'checkbox', question: '가장 선호하는 시안에서 느껴지는 이미지는?', options: ['신뢰감', '혁신', '친근함', '고급스러움', '간결함'] },
      { type: 'radio', question: '현재 로고가 얼마나 트렌디하다고 느끼십니까?', options: ['매우 트렌디함', '트렌디함', '보통', '구식', '매우 구식'] }
    ]
  },
  {
    id: 'video-format-preference',
    title: '영상 콘텐츠 형식 선호도',
    description: '유튜브, 숏폼(릴스, 틱톡), 라이브 스트리밍 등 다양한 영상 형식에 대한 선호도와 시청 행태 파악.',
    category: '크리에이티브',
    icon: 'ri-video-line',
    questions: [
      { type: 'radio', question: '가장 선호하는 영상 콘텐츠 길이는?', options: ['1분 미만 (숏폼)', '1~5분', '5~15분', '15분 이상', '길이 무관'] },
      { type: 'checkbox', question: '주로 시청하는 영상 콘텐츠 형식은?', options: ['정보/교육', '엔터테인먼트/예능', '브이로그', '제품 리뷰', '뉴스/시사'] },
      { type: 'radio', question: '유료 영상 콘텐츠 구독에 대한 의향은?', options: ['적극 있음', '있음', '보통', '없음', '전혀 없음'] }
    ]
  },
  {
    id: 'creative-team-satisfaction',
    title: '사내 디자인/제작팀 업무 만족도',
    description: '마케팅, 영업 등 타 부서가 내부 제작팀으로부터 제공받는 디자인 및 콘텐츠의 품질과 협업 만족도 평가.',
    category: '크리에이티브',
    icon: 'ri-lightbulb-line',
    questions: [
      { type: 'radio', question: '요청한 제작물의 최종 품질에 만족하십니까?', options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'] },
      { type: 'radio', question: '제작 요청 후 전달까지 소요된 시간은 적절했습니까?', options: ['매우 적절', '적절', '보통', '느림', '매우 느림'] },
      { type: 'text', question: '내부 제작팀과의 협업 과정 개선을 위한 제안사항을 알려주세요.' }
    ]
  },
];
