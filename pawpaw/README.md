# 🐾 포포 (PoPo)

> 유기견·유기묘 목격 제보, 실종 동물 찾기, 임시보호 커뮤니티 웹앱

---

## 📌 프로젝트 소개

**포포(PoPo)** 는 유기동물을 위한 지역 커뮤니티 플랫폼입니다.  
목격 제보, 실종 동물 찾기, 임시보호 모집 세 가지 기능을 하나의 앱에서 제공합니다.

| 탭 | 기능 |
|---|---|
| 👀 목격 제보 | 유기견·묘를 발견했을 때 위치·상황을 실시간으로 제보 |
| 🔍 찾아요 | 잃어버린 반려동물 찾기 게시판 |
| 🏠 임시보호 | 임시보호 제공자·희망자 매칭 커뮤니티 |

---

## 🛠 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite |
| 스타일링 | CSS-in-JS (전역 CSS 상수) |
| 이미지 | Vite 정적 asset import |

---

## 📁 프로젝트 구조

```
pawpaw/
├── public/
├── src/
│   ├── assets/
│   │   └── photo/          # 동물 사진 이미지
│   │       ├── cat1.png
│   │       ├── cat2.png
│   │       ├── cat3.png
│   │       ├── dog1.png
│   │       ├── dog2.png
│   │       └── dog3.png
│   ├── App.tsx             # 메인 컴포넌트 (전체 앱)
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 시작하기

### 필수 환경
- Node.js 18 이상
- npm 9 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/pawpaw.git
cd pawpaw

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

---

## 🖼 이미지 파일 설정

`src/assets/photo/` 폴더에 아래 파일명으로 이미지를 넣어주세요.

```
cat1.png  cat2.png  cat3.png
dog1.png  dog2.png  dog3.png
```

> ⚠️ **주의:** Vite는 파일명에 공백·괄호가 포함된 경우 import 오류가 발생합니다.  
> `cat (1).png` 처럼 공백이나 괄호가 있으면 반드시 `cat1.png` 형식으로 변경해주세요.

이미지를 추가하려면 `App.tsx` 상단 import 부분에 파일을 추가하고 배열에 넣으면 됩니다.

```ts
import dog4 from "../assets/photo/dog4.png";
const DOG_IMGS: string[] = [dog1, dog2, dog3, dog4]; // 추가
```

---

## ✨ 주요 기능

### 게시글 카드
- 동물 사진 **이미지 캐러셀** (이전/다음 버튼, 도트 인디케이터)
- 종류(강아지/고양이), 품종, 위치, 시간 표시
- 🚨 긴급 배지 / ✅ 해결됨 배지

### 필터
- 강아지 / 고양이 / 전체 종류 필터
- 긴급 게시글만 보기

### 글 작성
- 사진 여러 장 첨부 (업로드 즉시 미리보기)
- 종류, 품종, 위치, 내용, 연락처 입력
- 탭별 전용 필드 (사례금 / 보호기간)
- 긴급 토글 스위치

### 상세 모달
- 하단 슬라이드업 애니메이션
- 연락처 원터치 확인

### 반응형
- 모바일(480px 이하)에서 헤더 자동 축소
- 전체 너비 최적화 레이아웃

---

## 🎨 디자인 시스템

| 항목 | 값 |
|---|---|
| 포인트 컬러 | `#FF6B00` (오렌지) |
| 배경 | `#FFF8F4` (크림 화이트) |
| 긴급 컬러 | `#E53935` (레드) |
| 해결 컬러 | `#2E7D32` (그린) |
| 폰트 | Apple SD Gothic Neo / Noto Sans KR |

CSS는 `App.tsx` 내 `GLOBAL_CSS` 상수에 BEM 방식으로 관리됩니다.

---

## 🔮 향후 개발 계획

- [ ] Firebase Firestore 연동 — 실시간 데이터 저장
- [ ] Firebase Auth — 카카오 / 네이버 소셜 로그인
- [ ] Firebase Storage — 사진 업로드 클라우드 저장
- [ ] 카카오맵 API 연동 — 목격 위치 지도 핀 표시
- [ ] 푸시 알림 — 내 지역 긴급 제보 알림
- [ ] 입양 연결 기능

---

## 📄 라이선스

MIT License © 2025 PoPo Team
