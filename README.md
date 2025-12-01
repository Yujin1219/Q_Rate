# 📊 웹프레임워크1 프로젝트 - Q+Rate

## 📋 프로젝트 개요
Q+Rate는 온라인 설문조사 플랫폼으로, 사용자가 손쉽게 설문을 작성하고 공유하며 응답을 수집할 수 있는 웹 애플리케이션입니다.

### 🎯 주요 기능
- **설문 작성**: 다양한 질문 유형(라디오, 체크박스, 텍스트) 지원
- **필수/선택 질문**: 질문별 필수 여부 설정
- **조건부 건너뛰기**: 특정 선택지에 따라 다음 질문을 조건부로 건너뛰기
- **설문 공유**: 링크, 이메일, Twitter를 통한 설문 공유
- **응답 수집**: 응답자의 답변을 실시간으로 수집
- **결과 분석**: 차트와 텍스트 분석을 통한 결과 시각화

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
npm start
```
- 개발 서버가 `http://localhost:5173`에서 실행됩니다.
- 핫 리로드 기능으로 파일 변경 시 자동으로 브라우저가 새로고침됩니다.

#### 3️⃣ 프로덕션 빌드
```bash
npm run build
```
- 최적화된 프로덕션 빌드가 `out` 디렉토리에 생성됩니다.

#### 4️⃣ 빌드 결과물 미리보기
```bash
npm run preview
```
- 로컬에서 프로덕션 빌드된 파일을 미리볼 수 있습니다.

&nbsp;
## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── feature/        # Header, PageHeader 등 공통 컴포넌트
│   ├── home/           # 홈 페이지 섹션 컴포넌트
│   ├── mypage/         # 마이페이지 관련 컴포넌트
│   ├── results/        # 결과 분석 컴포넌트 (차트, 텍스트 분석)
│   └── survey/         # 설문 작성/응답 관련 컴포넌트
├── pages/              # 라우팅될 페이지 컴포넌트
│   ├── create/         # 설문 작성 페이지
│   ├── home/           # 홈 페이지
│   ├── login/          # 로그인 페이지
│   ├── mypage/         # 마이페이지
│   ├── myresponse/     # 내 응답 내역
│   ├── mysurveys/      # 내 설문 목록
│   ├── results/        # 설문 결과 분석
│   ├── signup/         # 회원가입 페이지
│   ├── survey/         # 설문 응답 페이지
│   └── templates/      # 설문 템플릿 페이지
├── router/             # 라우팅 설정
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
├── data/               # 샘플 데이터, 템플릿 데이터
├── i18n/               # 국제화 설정
└── App.tsx             # 메인 App 컴포넌트
```

&nbsp;
## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | React 18 + TypeScript |
| **빌드 도구** | Vite |
| **스타일링** | Tailwind CSS |
| **라우팅** | React Router v6 |
| **아이콘** | Remix Icon |
| **배포** | Netlify |
| **상태 관리** | React Hooks (localStorage) |

&nbsp;
## 🚀 Git Flow
- `main`
    - 프로젝트 발표 전까지 완성한 기능들을 계속해서 merge
    - 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- `{type}/{issue number}`
    - 개발 브랜치
    - 예: `feat/#5`, `fix/#11`

> 작업 단위로 이슈 생성 → 브랜치 생성 → 생성한 브랜치에서 작업 후 끝나면 main 브랜치로 PR 남기기
>
> 모든 작업 시작 전 생성한 브랜치에서 main 브랜치 pull을 받은 후 작업

&nbsp;
## 💡 PR Rules
- Assignee에는 본인을 지정해 주세요.
- Reviewers에는 본인을 제외한 팀원 2명을 지정한 후, 카카오톡으로 공유해 주세요.
- 이후, 팀원(1명 이상)이 PR을 확인하고 승인해서 머지해 주세요.
  (해당 브랜치는 머지 후 자동 삭제되며, 복구도 가능합니다.)

&nbsp;
## 💻 Commit Message Convention
| **Type** | **Description** |
| --- | --- |
| **Feat** | 새로운 기능 추가 |
| **Fix** | 버그 수정 |
| **Docs** | 문서 수정 |
| **Style** | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| **Refactor** | 코드 리팩토링 |
| **Test** | 테스트 코드, 리팩토링 테스트 코드 추가 |
| **Chore** | 패키지 매니저 수정, 그 외 기타 수정 (예: .gitignore) |
| **Design** | CSS 등 사용자 UI 디자인 변경 |
| **Comment** | 필요한 주석 추가 및 변경 |
| **Rename** | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| **Remove** | 파일을 삭제하는 작업만 수행한 경우 |
| **Init** | 프로젝트 초기 세팅 |
| **Merge** | 브랜치 merge |
| **!BREAKING CHANGE** | 커다란 API 변경의 경우 |
| **!HOTFIX** | 급하게 치명적인 버그를 고쳐야 하는 경우 |

> [#Issue Number] Type: commit title
>
> ex. `[#5] Feat: 로그인 기능 추가`

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
## 📝 주요 기능 설명

### 1. 설문 작성 (`/create`)
- 설문 제목 입력
- 질문 추가 (라디오, 체크박스, 텍스트)
- 각 질문별 필수/선택 지정
- 조건부 건너뛰기 설정
  - 특정 선택지 선택 시 다음 질문으로 이동 가능
  - 예: 질문 1에서 "아니오" 선택 → 질문 3으로 이동

### 2. 설문 공유
- 설문 링크 복사
- 이메일로 공유
- Twitter로 공유

### 3. 설문 응답 (`/survey/:surveyId`)
- 동적 질문 이동 (조건부 건너뛰기 적용)
- 필수 질문만 검증
- 선택 질문은 건너뛰기 가능
- 이전 버튼으로 건너뛴 질문 정확히 역추적

### 4. 결과 분석 (`/results/:surveyId`)
- 응답 현황 시각화
- 차트 표시 (라디오, 체크박스)
- 텍스트 응답 분석

&nbsp;
## 🚀 배포

### Netlify 배포
이 프로젝트는 Netlify에 자동 배포되도록 설정되어 있습니다.
- 빌드 명령: `npm run build`
- 배포 디렉토리: `out`

### 로컬에서 배포 테스트
```bash
npm run build
npm run preview
```

&nbsp;
## 📧 연락처
문제가 발생하거나 질문이 있으면 프로젝트 관리자에게 연락하세요.
