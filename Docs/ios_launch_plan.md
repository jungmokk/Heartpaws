# 📱 Heartpaws iOS 출시 종합 실행계획서 (App Store Launch Plan)

본 문서는 **Heartpaws(하트포즈)** 앱을 Apple App Store에 성공적으로 출시하고, 애플의 엄격한 앱 심사 가이드라인을 통과하기 위한 단계별 기술 및 운영 실행계획서입니다.

---

## 📅 전체 마일스톤 및 일정 요약

| 단계 | 주요 작업 내용 | 예상 소요 | 상태 |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Apple Developer 계정 등록 및 App Store Connect 기본 구성 | 1~2일 | 대기 |
| **Phase 2** | iOS 네이티브 설정, 권한 안내문 및 필수 정책(ATT/계정삭제) 정비 | 2일 | 진행중 |
| **Phase 3** | EAS iOS 빌드 생성 & TestFlight 내부/외부 테스트 진행 | 3~5일 | 대기 |
| **Phase 4** | 스토어 메타데이터(스크린샷, 설명문, 심사용 계정) 준비 | 2일 | 대기 |
| **Phase 5** | App Store 심사 제출 및 승인 대응 / 정식 런칭 | 2~3일 | 대기 |

---

## 🛠 Phase 1: 개발자 계정 및 스토어 기반 설정

1. **Apple Developer Program 가입**
   - 개인 또는 조직(D-U-N-S 필요) 계정 활성화 (연간 $99)
   - 역할 및 권한 부여 (EAS CLI 또는 Fastlane 자동 서명용 API Key 발급)
2. **App Store Connect 앱 등록**
   - **App Name**: Heartpaws (하트포즈)
   - **Bundle Identifier**: `com.heartpaws.app`
   - **Primary Language**: 한국어 (기본) / 영어 (US 타겟)
   - **SKU**: `heartpaws-ios-app`

---

## ⚙️ Phase 2: iOS 기술 사양 및 App Store 심사 대응

### 1. iOS 권한 명시 (`Info.plist` / `app.config.js`)
애플 심사 가이드라인(Guideline 5.1.1)에 맞춰 권한 사용 목적을 구체적이고 사용자 친화적으로 고지합니다.

- **위치 권한 (`NSLocationWhenInUseUsageDescription`)**:
  - *"주변의 유기 동물을 찾고 지도 기반 제보 서비스를 이용하기 위해 사용자의 현재 위치 정보가 필요합니다."*
- **카메라 권한 (`NSCameraUsageDescription`)**:
  - *"길거리 및 동네에서 발견한 유기 동물을 직접 촬영하여 제보 사진을 등록하기 위해 카메라 접근 권한이 필요합니다."*
- **사진 보관함 (`NSPhotoLibraryUsageDescription`)**:
  - *"반려동물 및 발견한 유기동물의 사진을 업로드하고 입양 포스터를 생성하기 위해 사진 라이브러리에 접근합니다."*
- **광고 추적 동의 (`NSUserTrackingUsageDescription` / App Tracking Transparency)**:
  - *"맞춤형 광고 제공 및 유기동물 구조 커뮤니티 서비스 개선을 위해 활동 정보를 활용합니다."*

### 2. Apple 심사 필수 기능 체크리스트 (Rejection 방지)
- **계정 삭제(회원 탈퇴) 기능 (Guideline 5.1.1(v))**:
  - 앱 내 프로필/설정 화면에서 즉시 계정을 삭제하고 데이터를 파기할 수 있는 기능 완비 확인.
- **인앱 결제(IAP) 정책 준수 (Guideline 3.1.1)**:
  - 코인 구매, 디지털 아이템(가상 펫 꾸미기 악세서리 등) 충전 기능이 있을 경우 반드시 Apple In-App Purchase(StoreKit) 연동 필수 (외부 결제 링크 연결 불가).
- **심사용 데모 계정 및 데이터 준비 (Guideline 2.1)**:
  - 심사관이 직접 로그인하여 둘러볼 수 있는 테스트 ID/PW 준비.
  - 지도 화면에 즉시 확인할 수 있는 샘플 유기동물 핀 및 프로필 데이터 노출 보장.

---

## 🚀 Phase 3: EAS Build 및 TestFlight 배포

### 1. EAS iOS 빌드 구성 (`eas.json`)
```bash
# TestFlight 배포용 iOS 빌드 생성 (자동 서명 관리)
eas build --platform ios --profile production
```

### 2. TestFlight 테스트 단계
1. **내부 테스터 (Internal Testing)**:
   - 빌드 완료 즉시 개발팀 및 내부 관계자 10~20명 대상 테스트
   - iOS UI Safe Area Insets (다이내믹 아일랜드/노치 및 홈 인디케이터 간섭) 점검
   - 기기별 화면 비율(iPhone SE ~ iPhone 16 Pro Max) 렌더링 확인
2. **외부 테스터 (External Testing)**:
   - 공개 링크 생성을 통한 14일간 사용자 테스트 및 크래시 모니터링

---

## 🎨 Phase 4: App Store Connect 메타데이터 준비

### 1. 스크린샷 규격 (필수)
- **6.9" Display (iPhone 16 Pro Max / 15 Pro Max)**: `1320 x 2868` 또는 `1290 x 2796` (최소 3장, 권장 5~10장)
- **6.5" Display (iPhone 11 Pro Max / Plus 모델)**: `1242 x 2688`
- **13" iPad Pro Display** (iPad 지원 시): `2064 x 2752`

### 2. 스토어 텍스트 및 URL
- **부제목 (30자 이내)**: 동네 유기동물 발견 & 입양 커뮤니티
- **키워드 (100자 이내)**: `Heartpaws,하트포즈,유기동물,길고양이,유기견,동물보호,입양,반려동물,포켓몬고,유기견보호소,동물제보`
- **개인정보처리방침 URL**: `https://kazisis.github.io/Heartpaws/heartpaws-privacy.html`
- **데이터 삭제 요청 URL**: `https://kazisis.github.io/Heartpaws/heartpaws-data-deletion.html`
- **지원/문의 URL**: `https://kazisis.github.io/Heartpaws/`

---

## 🏁 Phase 5: 최종 심사 제출 및 출시

1. **심사 제출 (App Review Submission)**
   - 심사 메모(Review Notes)에 앱 핵심 사용 흐름과 권한 요청 시점, 심사용 계정 정보 기재
2. **리젝(Reject) 대응 대비**
   - Resolution Center 대응 가이드 준비 (권한 목적 설명 보완, 시연 동영상 준비 등)
3. **출시 모드 선택**
   - *수동 출시(Manually release this version)* 선택 권장: 심사 통과 후 마케팅 일정에 맞춰 원하는 시점에 릴리즈
