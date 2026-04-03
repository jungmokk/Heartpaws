**🐾 Heartpaws**

Product Requirements Document (PRD) --- MVP v1.1

*Android / React Native (Expo) \| Target: KR & US*

**1. 앱 개요 및 목적**

Heartpaws는 Pokemon Go 스타일의 위치 기반 커뮤니티 앱으로, 사용자가
길고양이·유기견을 발견하고 기록하며 궁극적으로 입양까지 연결하는
서비스입니다.

**대상 지역 및 플랫폼**

-   플랫폼: Android (우선), iOS 추후 대응

-   타겟: 대한민국, 미국

-   Tech Stack: React Native (Expo) + Supabase (PostgreSQL + PostGIS) +
    Google Maps / Naver Map

**2. Android 환경 요구사항 (신규)**

아래 항목은 Android 앱 배포 및 심사 통과에 필수적으로 명시되어야 하는
사항입니다.

**2-1. 최소 사양 및 타겟 SDK**

  ---------------------- ------------------------------------------------
  **항목**               **값**

  minSdkVersion          26 (Android 8.0 Oreo) --- 국내 점유율 고려

  targetSdkVersion       35 (2025년 Google Play 정책 의무)

  compileSdkVersion      35

  빌드 도구              Gradle 8.x + AGP 8.x

  Expo SDK               52 이상 (New Architecture 지원)
  ---------------------- ------------------------------------------------

**2-2. Android 권한 선언 (AndroidManifest.xml)**

아래 권한은 실제 기능 사용 시에만 런타임 요청을 트리거하며, 앱 시작 시
일괄 요청 금지 (Google Play 정책).

  ---------------------------- ---------------- -------------------------
  **권한**                     **용도**         **요청 시점**

  ACCESS_FINE_LOCATION         지도 위치 확인   지도 화면 최초 진입 시

  CAMERA                       동물 사진 촬영   \'발견하기\' 버튼 탭 시

  READ_MEDIA_IMAGES            갤러리 이미지    갤러리 선택 버튼 탭 시
                               선택             

  POST_NOTIFICATIONS           SOS 푸시 알림    SOS 기능 최초 활성화 시

  INTERNET                     Supabase 통신    자동 (사용자 요청 불필요)
  ---------------------------- ---------------- -------------------------

*⚠️ ACCESS_BACKGROUND_LOCATION은 MVP 범위 외. SOS 알림은 FCM 서버 사이드
처리로 해결.*

**2-3. 네트워크 보안 설정**

Android 9(API 28)+ 기본 정책은 HTTP 차단. 아래 설정 필수:

\<!\-- res/xml/network_security_config.xml \--\>

\<network-security-config\>

\<base-config cleartextTrafficPermitted=\"false\"\>

\<trust-anchors\>

\<certificates src=\"system\"/\>

\</trust-anchors\>

\</base-config\>

\</network-security-config\>

Supabase endpoint, Google Maps API, Naver Map API 모두 HTTPS → 별도 예외
불필요.

**2-4. 딥링크 / 인텐트 필터**

Iteration 2의 \'친구 초대 다이나믹 링크\' 기능을 위해 아래 인텐트 필터를
MainActivity에 선언:

\<intent-filter android:autoVerify=\"true\"\>

\<action android:name=\"android.intent.action.VIEW\"/\>

\<category android:name=\"android.intent.category.DEFAULT\"/\>

\<category android:name=\"android.intent.category.BROWSABLE\"/\>

\<data android:scheme=\"https\" android:host=\"heartpaws.app\"/\>

\</intent-filter\>

**3. Iteration 1 --- Core MVP (현재 범위)**

**3-1. 사용자 플로우**

아래 플로우는 Android 기기 기준으로 작성되었습니다.

  -------- ------------------ ---------------------- -------------------------
  **\#**   **화면/단계**      **사용자 액션**        **시스템 처리**

  1        온보딩             앱 최초 실행           위치 권한 요청 (Rationale
                                                     다이얼로그 포함)

  2        메인 지도          지도 탐색              3km 반경 마커 렌더링
                                                     (blurred coords)

  3        발견하기           FAB 탭 → 카메라/갤러리 카메라 권한 런타임 요청
                              선택                   

  4        동물 등록          사진 + 이름 입력 후    좌표 blurring → Supabase
                              저장                   저장

  5        디지털 카드        \'발견자 카드\' 확인   카드 UI 생성 + 네이티브
                                                     공유 시트 호출
  -------- ------------------ ---------------------- -------------------------

**3-2. 지도 SDK 라우팅**

-   지역 판별: SIM 국가코드(MCC) 우선, 없으면 IP Geolocation fallback

-   KR → react-native-nmap (Naver Map SDK)

-   US/Other → react-native-maps (Google Maps SDK)

-   Google Maps API Key: AndroidManifest.xml meta-data에 선언 (키 노출
    방지: secrets-gradle-plugin 사용)

**3-3. 좌표 블러링 로직**

-   실제 GPS 좌표는 절대 DB에 저장하지 않음

-   저장 전 50m \~ 100m 반경 랜덤 오프셋 적용

-   오프셋 방향은 균등분포 난수로 결정 (Math.random 또는 crypto 기반)

// utils/location.ts

export function blurCoordinates(lat: number, lng: number) {

const R = 6371000; // 지구 반지름 (m)

const distance = 50 + Math.random() \* 50; // 50\~100m

const bearing = Math.random() \* 2 \* Math.PI;

const dLat = (distance \* Math.cos(bearing)) / R;

const dLng = (distance \* Math.sin(bearing)) / (R \* Math.cos((lat \*
Math.PI) / 180));

return { lat: lat + (dLat \* 180) / Math.PI, lng: lng + (dLng \* 180) /
Math.PI };

}

**3-4. 바텀 시트**

-   라이브러리: \@gorhom/bottom-sheet (Reanimated 3 기반, Android 호환)

-   3km 반경 동물 최대 50건 렌더링 (페이지네이션: cursor-based)

-   FlatList keyExtractor → animal.id (UUID)

**3-5. 바이럴 공유**

-   react-native-view-shot으로 카드 컴포넌트 → PNG 캡처

-   Share.share() (React Native 내장) → Android 네이티브 공유 시트 호출

-   Instagram 미설치 시 예외 처리 필요: 기본 공유 시트로 fallback

**4. QA & 테스트 요구사항**

**4-1. 좌표 블러링 단위 테스트**

// \_\_tests\_\_/location.test.ts

import { blurCoordinates } from \'../utils/location\';

function haversineDistance(a: {lat:number,lng:number}, b:
{lat:number,lng:number}) {

const R = 6371000;

const dLat = ((b.lat - a.lat) \* Math.PI) / 180;

const dLng = ((b.lng - a.lng) \* Math.PI) / 180;

const h = Math.sin(dLat/2)\*\*2 +

Math.cos(a.lat\*Math.PI/180) \* Math.cos(b.lat\*Math.PI/180) \*
Math.sin(dLng/2)\*\*2;

return R \* 2 \* Math.asin(Math.sqrt(h));

}

describe(\'blurCoordinates\', () =\> {

it.each(\[

\[37.5665, 126.9780\], // 서울

\[37.7749, -122.4194\], // 샌프란시스코

\])(\'오프셋이 50m\~100m 이내여야 한다 (%f, %f)\', (lat, lng) =\> {

for (let i = 0; i \< 100; i++) {

const blurred = blurCoordinates(lat, lng);

const dist = haversineDistance({lat, lng}, blurred);

expect(dist).toBeGreaterThanOrEqual(50);

expect(dist).toBeLessThanOrEqual(100);

}

});

});

**4-2. 지도 SDK 라우팅 테스트**

// \_\_tests\_\_/MapRouter.test.tsx

import { render } from \'@testing-library/react-native\';

import MapRouter from \'../components/MapRouter\';

jest.mock(\'react-native-nmap\', () =\> ({

NaverMapView: () =\> null,

}));

jest.mock(\'react-native-maps\', () =\> ({

\_\_esModule: true,

default: () =\> null,

}));

describe(\'MapRouter\', () =\> {

it(\'KR 지역에서 NaverMapView를 렌더링한다\', () =\> {

const { UNSAFE_getByType } = render(\<MapRouter region=\"KR\" /\>);

expect(UNSAFE_getByType(require(\'react-native-nmap\').NaverMapView)).toBeTruthy();

});

it(\'US 지역에서 Google MapView를 렌더링한다\', () =\> {

const { UNSAFE_getByType } = render(\<MapRouter region=\"US\" /\>);

expect(UNSAFE_getByType(require(\'react-native-maps\').default)).toBeTruthy();

});

});

**4-3. 추가 테스트 케이스 (MVP)**

  ------------------ ------------------ ----------------- ---------------
  **테스트 ID**      **시나리오**       **기대 결과**     **우선순위**

  TC-01              위치 권한 거부 후  권한 안내 배너    P0
                     지도 진입          표시              

  TC-02              오프라인 상태에서  로컬 큐에 저장 후 P1
                     동물 등록 시도     재시도            

  TC-03              Android 14 사진    선택한 이미지만   P0
                     권한 (선택 허용)   접근 가능         

  TC-04              Instagram 미설치   기본 공유 시트로  P1
                     기기에서 공유      fallback          

  TC-05              마커 100개 이상    FPS 30 이상 유지  P2
                     렌더링 성능                          
  ------------------ ------------------ ----------------- ---------------

**5. Iteration 2 --- 게임화 & 리텐션**

-   RPG 레벨 시스템: 100 EXP = 1 LV (상한 없음)

-   일일 인터랙션 제한: 유저 ID + 동물 ID + 날짜 조합 Unique 제약 (DB)

-   딥링크 초대: Firebase Dynamic Links (Android App Links 방식)

-   QA: EXP +10 후 LV 임계값 교차 시 UI 즉시 반영 여부

**6. Iteration 3 --- 수익화 & 입양 (Oasis)**

-   AdMob: Google Mobile Ads SDK (Expo plugin: expo-ads-admob 또는
    react-native-google-mobile-ads)

-   리워드 광고 콜백: onAdDismissedFullScreenContent 후 +50 EXP 처리

-   입양 신청: Webview (react-native-webview) → 외부 폼 연결

-   쉼터 마커 CSV 임포트: Supabase Edge Function으로 서버 사이드 처리

**7. My Pet & SOS Alert**

**7-1. Android 알림 처리**

-   FCM (Firebase Cloud Messaging) 서버 사이드 → Supabase Edge
    Function에서 푸시 트리거

-   Android 13(API 33)+ POST_NOTIFICATIONS 런타임 권한 필수

-   알림 채널(NotificationChannel) 생성: SOS_ALERT (HIGH importance),
    GENERAL (DEFAULT)

-   SOS 알림 클릭 시 딥링크로 해당 동물 프로필 화면 진입

**7-2. 반경 쿼리**

-   PostGIS ST_DWithin으로 5km 반경 유저 FCM 토큰 조회

-   토큰 저장: 앱 시작 시 FCM 토큰 갱신 후 Supabase profiles 테이블
    upsert

**8. 빌드 & 릴리즈 체크리스트 (Android)**

  ---- ----------------------------------------- ------------- -----------
       **항목**                                  **담당**      **상태**

  ☐    Google Play Console 앱 생성 및 패키지명   개발          \-
       확정 (com.heartpaws.app)                                

  ☐    Keystore 생성 및 보안 보관 (CI 시크릿     개발          \-
       저장)                                                   

  ☐    Google Maps API Key 발급 및 앱 서명 SHA-1 개발          \-
       등록                                                    

  ☐    Naver Map API Key 발급 (앱 ID 등록)       개발          \-

  ☐    개인정보처리방침 URL 등록 (위치 정보 수집 법무/기획     \-
       명시)                                                   

  ☐    targetSdkVersion 35 검증 (API 동작        QA            \-
       테스트)                                                 

  ☐    앱 번들(AAB) 생성 및 Play 내부 테스트     개발          \-
       트랙 업로드                                             
  ---- ----------------------------------------- ------------- -----------

*Heartpaws PRD v1.1 \| Last Updated: 2026-02*
