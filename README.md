# CRM 360° - Customer Journey Management System

지구에서 최고의 고객관리시스템 (Customer Relationship Management System)

## 🚀 주요 기능

### 고객 360도 여정 관리
- **Profile**: 고객 기본 정보, 관심사, 멤버십 정보
- **Purchases / Orders**: 주문 이력, 매출 분석, 구매 패턴
- **Service / CS**: VOC 관리, 상담 이력, SLA 추적
- **Marketing Touchpoints**: 캠페인 발송 이력, 반응률, 피로도 관리
- **CallSync (CTI)**: 통화 이력, 녹취, 상담 스크립트
- **Visits / Branch**: 오프라인 방문 기록, 매장별 통계
- **Channel Interactions**: 웹/앱 행동 분석, 구매 퍼널
- **Churn / Risk**: 이탈 위험 분석, RFM 점수, 예방 조치
- **Recommendations (NBA)**: AI 기반 Next Best Action 추천

### 주요 액션
- 메시지 발송 (SMS/카카오/Push/Email)
- 쿠폰 발급
- 포인트 지급
- 캠페인 대상 등록
- 고객 메모 작성
- 활동 기록 관리

## 🛠️ 기술 스택

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프리뷰
npm run preview
```

## 📁 프로젝트 구조

```
crm-360/
├── src/
│   ├── components/
│   │   ├── ui/              # 공통 UI 컴포넌트
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   ├── views/           # 9개 세부 화면
│   │   └── modals/          # 팝업/패널
│   ├── types/               # TypeScript 타입 정의
│   ├── data/                # Mock 데이터
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── main.tsx             # 엔트리 포인트
│   └── index.css            # 글로벌 스타일
├── public/
├── index.html
└── package.json
```

## 🎨 UI/UX 특징

### 최신 트렌드 반영
- 모던한 카드 기반 레이아웃
- 반응형 디자인
- 부드러운 애니메이션
- 직관적인 네비게이션
- 실시간 데이터 시각화

### 사용자 경험
- 원클릭 액션 실행
- 다양한 필터 및 검색
- 상세한 툴팁 및 안내
- 빠른 모달 인터랙션
- 키보드 단축키 지원

## 📊 주요 화면

### 1. Customer Header
- 고객 기본 정보 및 프로필
- 주요 KPI (CLV, 총 구매액, 최근 구매일, 이탈 위험도)
- 빠른 액션 버튼

### 2. Profile View
- 기본 정보 (이름, 연락처, 주소)
- 멤버십 & 라이프사이클
- 관심사 & 선호 카테고리
- 동의 현황

### 3. Orders View
- 주문 이력 테이블
- 매출 KPI 카드
- 채널별/월별 분석

### 4. CS View
- VOC 목록 및 타임라인
- 유형별/채널별 통계
- 신규 VOC 등록

### 5. Marketing View
- 발송 로그 및 반응률
- 채널별 성과 분석
- 피로도 점수 모니터링

### 6. CTI View
- 통화 이력 및 녹취
- 상담 유형별 통계
- 상담 스크립트 가이드

### 7. Visits View
- 방문 이력 및 타임라인
- 매장별 통계
- 구매 전환율

### 8. Interactions View
- 행동 로그 및 타임라인
- 구매 전환 퍼널
- 채널/디바이스별 분석

### 9. Churn View
- 이탈 위험 점수 및 추이
- RFM 분석
- 위험 요인 및 개선 권장사항

### 10. Recommendations View
- AI 기반 NBA 추천
- 우선순위별 액션
- 기대 효과 및 근거

## 🔧 주요 컴포넌트

### UI 컴포넌트
- `Button`: 다양한 스타일의 버튼
- `Modal`: 중앙 모달
- `SlidePanel`: 우측 슬라이드 패널
- `Input/Select/Textarea`: 폼 요소
- `Card`: 카드 레이아웃
- `Table`: 데이터 테이블
- `Timeline`: 시간순 타임라인
- `Badge`: 상태 배지
- `KPICard`: KPI 카드
- `Tabs`: 탭 네비게이션

### 레이아웃
- `MainLayout`: 전체 레이아웃
- `CustomerHeader`: 고객 헤더
- `Sidebar`: 좌측 네비게이션
- `ActionPanel`: 우측 액션 패널

## 📝 주요 모달

1. **SendMessageModal**: 메시지 발송
2. **IssueCouponModal**: 쿠폰 발급
3. **AwardPointsModal**: 포인트 지급
4. **AddToCampaignModal**: 캠페인 등록
5. **EditProfileModal**: 프로필 수정
6. **OrderDetailModal**: 주문 상세
7. **NewVOCModal**: VOC 등록
8. **EnterNoteModal**: 메모 등록

## 🎯 향후 개선 사항

- 실제 API 연동
- 권한 관리 시스템
- 다국어 지원
- 고급 필터링
- 엑셀 내보내기
- 실시간 알림
- 대시보드 커스터마이징

## 📄 라이선스

MIT License

## 👥 개발자

CRM 360° Development Team

