# 🍏 Heartpaws iOS App Store 릴리즈 & 심사 완벽 가이드

본 문서는 **Heartpaws(하트포즈)**의 iOS 버전 앱스토어(App Store) 등록, 인앱 결제(IAP) 설정, EAS Build, TestFlight 배포 및 최종 심사 통과를 위한 실전 가이드입니다.

---

## 1. App Store Connect 인앱 결제 (IAP) 등록 가이드

Heartpaws 앱의 수익화 모델(구독 + 코인 충전)을 App Store Connect에 등록하는 규격입니다.

### A. 자동 갱신형 구독 (Auto-Renewable Subscriptions)
* **메뉴 위치**: App Store Connect > Heartpaws > 수익화(Monetization) > 구독(Subscriptions)
* **구독 그룹 생성**: `Heartpaws Subscriptions` (그룹 표시 이름: Heartpaws Premium)
* **구독 상품 등록**:
  - **참조 이름 (Reference Name)**: `Heartpaws Premium (Monthly)`
  - **제품 ID (Product ID)**: `heartpaws_premium_monthly`
  - **가격**: Tier 1 ($0.99 / ₩1,500)
  - **혜택**: 전면/배너 광고 전면 제거, 가상 펫 먹이주기 2배 부스트

### B. 소모성 인앱 결제 (Consumable In-App Purchases)
* **메뉴 위치**: App Store Connect > Heartpaws > 수익화(Monetization) > 인앱 구입(In-App Purchases)
* **상품 목록 등록**:

| 제품 ID (Product ID) | 참조 이름 (Reference Name) | 가격 (Price) | 코인 수량 |
| :--- | :--- | :--- | :--- |
| `coin_starter` | Starter Bone Coins (100) | $0.99 / ₩1,500 | 100 코인 |
| `coin_basic` | Basic Bone Coins (300) | $2.99 / ₩4,400 | 300 코인 |
| `coin_popular` | Popular Bone Coins (750) | $5.99 / ₩8,800 | 750 코인 |
| `coin_value` | Value Bone Coins (1650) | $11.99 / ₩16,000 | 1,650 코인 |
| `coin_premium` | Premium Bone Coins (4000) | $24.99 / ₩33,000 | 4,000 코인 |
| `coin_mega` | Mega Bone Coins (8250) | $49.99 / ₩66,000 | 8,250 코인 |

> [!IMPORTANT]
> **심사 제출 시 유의점**: 인앱 결제 상품은 첫 번째 앱 바이너리 심사 제출 시 반드시 "이 버전과 함께 제출" 체크박스에 포함하여 함께 제출해야 합니다.

---

## 2. App Store Connect 앱 정보 및 메타데이터

* **앱 이름 (30자 이내)**: `Heartpaws - 유기동물 발견 및 입양`
* **부제목 (30자 이내)**: `동네 유기동물 지도 제보 & 입양 커뮤니티`
* **기본 언어**: 한국어 (추가: 영어(미국))
* **기본 카테고리**: 라이프스타일 (Lifestyle) / 2차 카테고리: 소셜 네트워킹 (Social Networking)
* **키워드 (100자 이내)**:
  ```text
  Heartpaws,하트포즈,유기견,유기묘,길고양이,유기동물,포인핸드,동물보호소,강아지입양,고양이입양,반려동물,동물제보
  ```
* **홍보 문구 (Promotional Text)**:
  ```text
  길에서 마주친 작은 생명들, 당신의 사진 한 장이 따뜻한 보금자리를 선물합니다. Heartpaws와 함께 유기동물 구조와 입양에 동참하세요!
  ```
* **필수 URL 모음**:
  - **마케팅 / 지원 URL**: `https://jungmokk.github.io/Heartpaws/`
  - **개인정보 처리방침 (Privacy Policy)**: `https://jungmokk.github.io/heartpaws-privacy.html`
  - **이용약관 / EULA (Terms of Use)**: `https://jungmokk.github.io/heartpaws-terms.html`
  - **데이터 삭제 요청 URL**: `https://jungmokk.github.io/heartpaws-data-deletion.html`

### ⚠️ [중요] 구독 EULA 설명(Description) 삽입 가이드
App Store Review Guideline 3.1.2에 따라, 자동 갱신형 구독을 제공하는 앱은 **앱 설명(Description)란 맨 하단에** 반드시 아래의 고지문을 복사해서 붙여넣어야 합니다. (누락 시 심사 거절)

```text
[Subscription Terms & Legal]
• Title of Service: Heartpaws Premium (Monthly)
• Length of Subscription: 1 Month (Auto-Renewable)
• Payment will be charged to your iTunes Account at confirmation of purchase.
• Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
• Account will be charged for renewal within 24-hours prior to the end of the current period.
• You can manage or cancel your subscriptions anytime in your Apple ID Account Settings after purchase.

• Terms of Use (EULA): https://jungmokk.github.io/heartpaws-terms.html
• Privacy Policy: https://jungmokk.github.io/heartpaws-privacy.html
```

---

## 3. 심사용 데모 계정 및 심사 메모 (App Review Information)

심사관이 로그인 없이도 둘러볼 수 있지만, 소셜 로그인 기능을 온전히 검증할 수 있도록 테스트 정보를 제공합니다.

* **로그인 필요 여부**: 체크
* **사용자 이름 (Username)**: `review@heartpaws.app`
* **비밀번호 (Password)**: `Review1234!`
* **심사 메모 (Review Notes)**:
  ```text
  [App Overview]
  Heartpaws is a location-based stray/abandoned animal reporting and adoption support app.
  
  [Permissions Usage]
  1. Location (When In Use): Used to display nearby shelters, rescued animals, and set the discovery pin on the map.
  2. Camera: Used by users to take photos of stray animals on the spot.
  3. Photo Library: Used to upload animal photos and save generated adoption posters.
  4. App Tracking Transparency: Used for personalized ads via Google AdMob (shown to free users).
  
  [Account Deletion]
  Users can delete their account and associated data immediately in Profile > Settings > Delete Account.
  ```

---

## 4. EAS Build & 배포 명령어 가이드

### A. 시뮬레이터 빌드 (Mac 로컬 테스트용)
```bash
cd mobile
eas build --platform ios --profile preview-simulator
```

### B. TestFlight / App Store 정식 빌드
```bash
cd mobile
eas build --platform ios --profile production
```
*(EAS가 Apple Developer 계정과 연동되어 Distribution Certificate 및 Provisioning Profile을 자동 생성합니다.)*

### C. App Store Connect 자동 제출
```bash
cd mobile
eas submit --platform ios
```

---

## 5. Apple 심사 리젝(Reject) 방지 체크리스트

1. [x] **암호화 수출 규정 준수**: `ITSAppUsesNonExemptEncryption: false` 설정 완료
2. [x] **백그라운드 위치 권한 제거**: 사용 중 위치 권한(`NSLocationWhenInUseUsageDescription`)만 명시
3. [x] **사진 보관함 저장 권한 추가**: `NSPhotoLibraryAddUsageDescription` 선언 완료
4. [x] **태블릿 전용 심사 간소화**: `supportsTablet: false`로 iPhone 규격 집중
5. [x] **회원 탈퇴 및 데이터 삭제**: 인앱 탈퇴 기능 구현 및 웹 삭제 요청 안내 페이지 연결
6. [x] **구독 결제 EULA 약관 고지**: Description 하단에 `[Subscription Terms & Legal]` 문구 및 `Terms of Use (EULA)` 링크 추가
