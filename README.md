# 📊 웹프레임워크1 프로젝트 - Q+Rate

## 📋 프로젝트 개요
Q+Rate는 **온라인 설문조사 플랫폼**으로, 사용자가 손쉽게 설문을 작성하고 공유하며 응답을 수집할 수 있는 웹 애플리케이션입니다.
**70개 이상의 템플릿**과 **고급 분석 기능**을 제공하여 누구나 전문적인 설문조사를 진행할 수 있습니다.

### 🎯 주요 기능

#### 📝 설문 생성
- **다양한 질문 유형**: 라디오, 체크박스, 텍스트 질문 지원
- **조건부 분기**: 특정 선택지에 따라 질문을 건너뛰는 스킵 규칙 설정
- **필수/선택 설정**: 질문별로 필수 여부 지정
- **실시간 미리보기**: 편집과 동시에 설문 화면 확인
- **70+ 템플릿**: 13개 카테고리의 전문 템플릿 제공

#### 📊 결과 분석
- **차트 시각화**: 막대 그래프, 원형 그래프, 통계 테이블
- **텍스트 분석**: 워드클라우드, 감정 분석(긍정/부정/중립)
- **응답 개요**: 총 응답 수, 질문별 상세 통계

#### 👤 사용자 관리
- **마이페이지**: 프로필 정보, 활동 통계
- **내가 만든 설문**: 설문 목록, 응답 현황, 결과 보기
- **내 응답 내역**: 응답한 설문 목록 및 상세 보기

#### 🔗 설문 공유
- **링크 복사**: 클립보드 공유
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 대응

&nbsp;
## 🚀 실행 환경

### 요구사항
- **Node.js**: v18 이상
- **npm**: v9 이상

### 설치 및 실행 방법

#### 1️⃣ 의존성 설치
```bash
npm install
```

#### 2️⃣ 개발 서버 실행
```bash
npm run dev
```
- 개발 서버가 `http://localhost:3000`에서 실행됩니다.
- 핫 리로드 기능으로 파일 변경 시 자동으로 브라우저가 새로고침됩니다.

#### 3️⃣ 프로덕션 빌드
```bash
npm run build
```
- 최적화된 프로덕션 빌드가 `out/` 디렉토리에 생성됩니다.
- 소스맵이 포함되어 디버깅이 용이합니다.

#### 4️⃣ 빌드 결과물 미리보기
```bash
npm run preview
```
- 로컬에서 프로덕션 빌드된 파일을 미리볼 수 있습니다.

&nbsp;
## 📁 프로젝트 구조

```
src/
├── assets/                     # 이미지 리소스
│   ├── default_profile.png     # 기본 프로필 이미지
│   ├── logo.png                # 로고
│   └── ...
│
├── components/                 # 재사용 가능한 UI 컴포넌트
│   ├── ScrollToTop.tsx         # 페이지 이동 시 스크롤 초기화
│   ├── feature/                # 공통 기능 컴포넌트
│   │   ├── Header.tsx          # 전역 헤더 (로그인/로그아웃)
│   │   └── PageHeader.tsx      # 페이지별 헤더
│   ├── home/                   # 홈 페이지 섹션
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TemplateSection.tsx
│   │   └── ...
│   ├── mypage/                 # 마이페이지 컴포넌트
│   │   ├── ProfileCard.tsx
│   │   ├── UserInfoForm.tsx
│   │   └── RespondedSurveyList.tsx
│   ├── mysurveys/
│   │   └── DeleteConfirmModal.tsx
│   ├── results/                # 결과 분석 컴포넌트
│   │   ├── Charts.tsx          # 막대/원형 차트
│   │   ├── TextAnalysis.tsx    # 워드클라우드, 감정분석
│   │   └── ...
│   └── survey/                 # 설문 작성/응답 컴포넌트
│       ├── QuestionEditor.tsx
│       ├── SurveyPreview.tsx
│       ├── RadioQuestion.tsx
│       ├── CheckboxQuestion.tsx
│       ├── TextQuestion.tsx
│       └── ...
│
├── pages/                      # 페이지 컴포넌트
│   ├── NotFound.tsx            # 404 페이지
│   ├── home/page.tsx           # 홈 (랜딩)
│   ├── login/page.tsx          # 로그인
│   ├── signup/page.tsx         # 회원가입
│   ├── create/page.tsx         # 설문 생성/편집
│   ├── templates/page.tsx      # 템플릿 목록
│   ├── survey/page.tsx         # 설문 응답
│   ├── results/page.tsx        # 설문 결과 분석
│   ├── mypage/page.tsx         # 마이페이지
│   ├── mysurveys/page.tsx      # 내가 만든 설문
│   └── myresponse/page.tsx     # 내 응답 내역
│
├── router/                     # 라우팅 설정
│   ├── config.tsx              # 라우트 정의
│   └── index.ts
│
├── types/                      # TypeScript 타입 정의
│   └── survey.ts               # Survey, Question, Response 타입
│
├── utils/                      # 유틸리티 함수
│   ├── calculateChartData.ts   # 차트 데이터 계산
│   ├── calculateSentiment.ts   # 감정 분석 로직
│   └── generateWordCloud.ts    # 워드클라우드 생성
│
├── data/                       # 데이터
│   ├── sampleSurveys.ts        # 샘플 설문
│   └── templateData.ts         # 70+ 템플릿 (13개 카테고리)
│
├── i18n/                       # 국제화 설정 (다국어 지원 준비)
│
├── App.tsx                     # 메인 앱 컴포넌트
├── main.tsx                    # 엔트리 포인트
└── index.css                   # 전역 스타일
```

&nbsp;
## 🛠 기술 스택

### 핵심 기술
| 분류 | 기술 | 버전 |
|------|------|------|
| **프레임워크** | React | 18.3.1 |
| **언어** | TypeScript | 5.8.3 |
| **빌드 도구** | Vite | 7.0.3 |
| **라우팅** | React Router DOM | 7.6.3 |

### UI/스타일링
| 분류 | 기술 | 버전 |
|------|------|------|
| **스타일링** | Tailwind CSS | 3.4.17 |
| **애니메이션** | Framer Motion | 12.23.25 |
| **아이콘** | Lucide React | 0.469.0 |
| **디자인 패턴** | Glassmorphism, Neumorphism | - |

### 데이터 시각화
| 분류 | 기술 | 버전 |
|------|------|------|
| **차트** | Recharts | 3.2.0 |
| **워드클라우드** | React D3 Cloud | 1.0.6 |
| **PDF 내보내기** | jsPDF | 3.0.4 |
| **화면 캡처** | html2canvas | 1.4.1 |

### 국제화 & 개발 도구
| 분류 | 기술 | 버전 |
|------|------|------|
| **다국어 지원** | i18next, react-i18next | 25.3.2 / 15.6.0 |
| **자동 임포트** | unplugin-auto-import | 19.3.0 |
| **린팅** | ESLint | 9.30.1 |

### 상태 관리 & 저장소
- **React Hooks** (useState, useEffect, useMemo, useCallback)
- **LocalStorage** (사용자 정보, 설문 데이터, 응답 데이터)


&nbsp;
## 📝 주요 기능 설명

### 1. 설문 작성 ([/create](src/pages/create/page.tsx))
- **설문 제목 및 설명** 입력
- **질문 추가/삭제/수정**
  - 라디오 버튼 (단일 선택)
  - 체크박스 (다중 선택)
  - 텍스트 (주관식)
- **필수/선택 지정**: 질문별 `required` 플래그
- **조건부 분기 (Skip Rules)**
  - 특정 선택지 선택 시 다음 질문으로 건너뛰기
  - 예: "만족하십니까?" → "아니오" 선택 → 불만족 이유 질문으로 이동
- **실시간 미리보기**: 편집과 동시에 설문 화면 확인
- **템플릿 사용**: 70+ 템플릿 중 선택하여 빠른 시작

### 2. 템플릿 ([/templates](src/pages/templates/page.tsx))
- **70개 이상의 전문 템플릿** 제공
- **13개 카테고리**: 비즈니스, 이벤트, 리서치, HR, 교육, 헬스케어, 소매/유통, 외식/서비스, 기술/IT, 커뮤니티, 정부/공공, 금융/보험, 여행/숙박, ESG/사회공헌, 크리에이티브
- **원클릭 사용**: 템플릿 클릭 시 설문 생성 페이지로 자동 로드

### 3. 설문 공유 ([SurveyShareModal](src/components/survey/SurveyShareModal.tsx))
- **링크 복사**: 클립보드에 설문 URL 복사
- **설문 코드**: 고유 ID로 설문 식별

### 4. 설문 응답 ([/survey/:id](src/pages/survey/page.tsx))
- **동적 질문 이동**: Skip Rules에 따른 조건부 분기
- **진행률 표시**: 현재 진행 상황을 시각적으로 표시
- **필수 질문 검증**: 필수 질문 미응답 시 다음으로 이동 불가
- **이전 버튼**: 건너뛴 질문 포함 정확한 역추적
- **응답 저장**: LocalStorage에 실시간 저장
- **완료 화면**: 제출 성공 메시지 및 결과 보기 링크

### 5. 결과 분석 ([/results/:id](src/pages/results/page.tsx))

#### 객관식 질문 (라디오, 체크박스)
- **막대 그래프** ([BarChart](src/components/results/Charts.tsx))
- **원형 그래프** ([PieChart](src/components/results/Charts.tsx))
- **상세 통계** ([Statistics](src/components/results/Charts.tsx))
  - 선택지별 응답 수, 비율, 퍼센트

#### 주관식 질문 (텍스트)
- **워드클라우드** ([generateWordCloud](src/utils/generateWordCloud.ts))
  - 단어 빈도 시각화
- **감정 분석** ([calculateSentiment](src/utils/calculateSentiment.ts))
  - 긍정/부정/중립 비율 분석
  - 한국어 감정 키워드 기반
- **최근 응답**: 최신 응답 5개 표시

#### 응답 개요
- 총 응답 수
- 질문별 상세 통계
- 응답 시간 정보

### 6. 마이페이지 ([/mypage](src/pages/mypage/page.tsx))
- **프로필 정보**: 이름, 이메일, 가입일
- **활동 통계**: 응답한 설문 수, 생성한 설문 수
- **정보 수정**: 이름, 성별, 연령대 수정
- **응답 내역**: 내가 응답한 설문 목록 및 상세보기

### 7. 내가 만든 설문 ([/mysurveys](src/pages/mysurveys/page.tsx))
- **설문 목록**: 로그인한 사용자가 생성한 설문만 표시
- **응답 현황**: 각 설문의 응답 수
- **설문 관리**
  - 설문 열기: 설문 응답 페이지로 이동
  - 결과 보기: 설문 결과 분석 페이지로 이동
  - 설문 삭제: 확인 모달 후 삭제

### 8. 내 응답 내역 ([/myresponse/:id](src/pages/myresponse/page.tsx))
- **응답 상세 보기**: 내가 응답한 설문의 상세 내용
- **질문별 답변**: 각 질문에 대한 나의 응답 확인

&nbsp;
## 🚀 배포

### Netlify 배포 설정
이 프로젝트는 Netlify에 자동 배포되도록 설정되어 있습니다.

#### 배포 설정
- **빌드 명령**: `npm run build`
- **배포 디렉토리**: `out/`
- **Node 버전**: 18 이상
- **환경 변수**: `BASE_PATH` (서브 경로 배포 시)

#### 로컬에서 배포 테스트
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

&nbsp;
## 📊 데이터 구조

### LocalStorage 키
프로젝트는 브라우저의 LocalStorage를 사용하여 데이터를 관리합니다.

| 키 | 설명 | 형식 |
|---|---|---|
| `userInfo` | 사용자 정보 | `Array<User>` |
| `accessToken` | 로그인 토큰 | `string` |
| `surveys` | 전체 설문 목록 | `Array<Survey>` |
| `survey_{id}` | 개별 설문 데이터 | `Survey` |
| `responses_{id}` | 설문별 응답 데이터 | `Array<Response>` |
| `myResponses` | 내 응답 목록 | `Array<MyResponse>` |

### 주요 타입 정의 ([types/survey.ts](src/types/survey.ts))

```typescript
interface Survey {
  id: string
  title: string
  description?: string
  questions: Question[]
  creatorId: string
  createdAt: string
}

interface Question {
  id: string
  type: 'radio' | 'checkbox' | 'text'
  question: string
  options?: string[]
  required: boolean
  skipRules?: SkipRule[]
}

interface SkipRule {
  optionIndex: number
  skipToQuestionId: string
}
```

&nbsp;
## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Violet-Purple-Fuchsia Gradient
- **Background**: White with Glassmorphism effect
- **Text**: Gray scale (900, 700, 600, 500)
- **Accent**: Blue, Green, Red for status

### 타이포그래피
- **한글**: Pretendard
- **영문**: Poppins
- **로고**: Pacifico

### 반응형 브레이크포인트
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: ≥ 1024px

&nbsp;
## 🔄 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| `/` | HomePage | 랜딩 페이지 |
| `/login` | LoginPage | 로그인 |
| `/signup` | SignupPage | 회원가입 |
| `/create` | CreatePage | 설문 생성/편집 |
| `/templates` | TemplatesPage | 템플릿 목록 |
| `/survey/:id` | SurveyPage | 설문 응답 |
| `/results/:id` | ResultsPage | 설문 결과 |
| `/mypage` | MyPage | 마이페이지 |
| `/mysurveys` | MySurveysPage | 내가 만든 설문 |
| `/myresponse/:id` | MyResponsePage | 내 응답 상세 |
| `*` | NotFound | 404 페이지 |

&nbsp;
## 🐛 문제 해결

### npm start가 작동하지 않는 경우
1. **캐시 초기화**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

2. **포트 충돌 확인**
   - 기본 포트 5173이 사용 중이면 Vite가 자동으로 다른 포트를 할당합니다.
   - 콘솔 메시지를 확인하여 실제 실행 중인 포트를 확인하세요.

### 모듈 에러 발생 시
```bash
npm install
```
- 최신 의존성을 설치합니다.

### 빌드 에러 발생 시
```bash
npm run build
```
- 빌드 과정에서 발생하는 에러 메시지를 확인하고 수정합니다.

### 로컬스토리지 초기화
- 브라우저 개발자 도구 (F12) → Application → Local Storage → Clear All
- 또는 브라우저 캐시 전체 삭제
&nbsp;
## 📧 문의
프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.
