<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/16c1131b-f272-46f3-9691-25d6a23ce3e6" />

## 📋 프로젝트 개요
Q+Rate는 **온라인 설문조사 플랫폼**으로, 사용자가 손쉽게 설문을 작성하고 공유하며 응답을 수집할 수 있는 웹 애플리케이션입니다.
**70개 이상의 템플릿**과 **고급 분석 기능**을 제공하여 누구나 전문적인 설문조사를 진행할 수 있습니다.

### 🎯 주요 기능
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/55d45c1f-d772-45f9-92eb-9eb8ba1f3093" />

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
## 📝 주요 기능 설명

### 1. 설문 생성
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3f74cf3a-2293-4e2b-beee-3f7276b650d1" />
<details>
  <summary>상세 설명</summary>
  
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
</details>

### 2. 설문 템플릿 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/80c0a5ed-bdf5-4e91-8c78-213d777bfd3b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ae8c02e1-e156-406a-8749-312645300e7c" />

<details>
  <summary>상세 설명</summary>
  
  - **70개 이상의 전문 템플릿** 제공
  - **13개 카테고리**: 비즈니스, 이벤트, 리서치, HR, 교육, 헬스케어, 소매/유통, 외식/서비스, 기술/IT, 커뮤니티, 정부/공공, 금융/보험, 여행/숙박, ESG/사회공헌, 크리에이티브
  - **원클릭 사용**: 템플릿 클릭 시 설문 생성 페이지로 자동 로드
</details>

### 3. 설문 공유 및 응답
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c2710465-40c5-4fbc-8650-2b4f3c62625d" />

<details>
  <summary>상세 설명</summary>
  
  #### 설문 공유
  - **링크 복사**: 클립보드에 설문 URL 복사
  - **설문 코드**: 고유 ID로 설문 식별

  #### 설문 응답
  - **동적 질문 이동**: Skip Rules에 따른 조건부 분기
  - **진행률 표시**: 현재 진행 상황을 시각적으로 표시
  - **필수 질문 검증**: 필수 질문 미응답 시 다음으로 이동 불가
  - **이전 버튼**: 건너뛴 질문 포함 정확한 역추적
  - **응답 저장**: LocalStorage에 실시간 저장
  - **완료 화면**: 제출 성공 메시지 및 결과 보기 링크
</details>

### 4. 결과 분석 및 시각화
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e058ab6a-4f59-4c83-8813-a78d88fed36f" />
<details>
  <summary>상세 설명</summary>

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
</details>

### 5. 로그인/회원가입
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dd9d0544-51d4-4234-a875-9752191f309b" />

### 6. 마이페이지
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0e037bff-4a2a-4674-b738-934f5733d3aa" />

<details>
  <summary>상세 설명</summary>

  - **프로필 정보**: 이름, 이메일, 가입일
  - **활동 통계**: 응답한 설문 수, 생성한 설문 수
  - **정보 수정**: 이름, 성별, 연령대 수정
  - **응답 내역**: 내가 응답한 설문 목록 및 상세보기
</details>

### 7. 내가 만든 설문
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/39a5431c-5361-4051-bde7-cf5776caa941" />

<details>
  <summary>상세 설명</summary>

  - **설문 목록**: 로그인한 사용자가 생성한 설문만 표시
  - **응답 현황**: 각 설문의 응답 수
  - **설문 관리**
    - 설문 열기: 설문 응답 페이지로 이동
    - 결과 보기: 설문 결과 분석 페이지로 이동
    - 설문 삭제: 확인 모달 후 삭제
</details>

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
## 📧 문의
프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.
