### 기술스택

Node v.22.13.0 (LTS)  
언어/프레임워크 : `typescript` `nextjs@15`  
UI 라이브러리/프레임워크 : `tailwind` `shadcn/ui` `framer-motion`  
상태 관리 라이브러리: `zustand` `tanstack@react-query`  
테스트도구 : `storybook` `vitest`  
데이터검증 : `zod`  
패키지매니저 : `pnpm`  
지도: `kakao maps api`

### 아키텍쳐

root/  
├── app/ # Next.js 라우팅 처리 (app directory 구조)  
├── api/ # react-query로 데이터 패칭 관련 파일  
├── styles/ # 스타일 관련 파일 (글로벌 스타일, CSS 변수)  
├── components/ # 공통 컴포넌트 모음  
│ ├── common/ # Footer, Header 등 여러 페이지에서 공통으로 사용하는 컴포넌트  
│ ├── ui/ # shadcn/ui 명령어로 생성된 UI 컴포넌트  
├── hooks/ # 재사용 가능한 React 커스텀 훅  
├── interfaces/ # TypeScript 인터페이스 및 타입 정의 파일  
├── types/ # interfaces와 비슷하지만, 전역적으로 사용하는 유틸리티 타입, 단순 타입 정의 관리.  
├── lib/ # 데이터 포멧 관련, 유틸리티 함수, API 통신 모듈  
├── mocks/ # Mock 데이터 및 관련 설정 파일 (e.g., MSW, JSON mock)  
├── store/ # 상태 관리와 관련된 모든 파일을 저장.  
├── constants/ # 프로젝트 전역에서 사용하는 상수 값  
├── config/ # 프로젝트 설정 관련 파일 (e.g., 환경 변수, 라우팅 설정, DB)

`도메인별로 관심사를 분리`, 유저 마이페이지 관련 도메인이라고 가정했을 때 app-mypage / components-mypage 폴더를 각각 생성하여 코드 작성

vitest 코드는 해보고 싶은 페이지나, 필요한 로직에 자율적으로 작성  
storybook 코드는 ui test를 할 코드와 동일한 위치에 작성

### 기능명세서

<img width="991" alt="Image" src="https://github.com/user-attachments/assets/8b3bf594-659a-46ae-b0d6-31144bc5c2a5" />
