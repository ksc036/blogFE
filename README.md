# 📘 log404-web

**log404-web**은 웹 애플리케이션에서 개인 블로그 플랫폼인 [log404-server](https://github.com/ksc036/log404-server)의 프론트엔드 애플리케이션입니다. 이 프로젝트는 Next.js를 기반으로 하여 사용자에게 직관적인 UI를 제공합니다.

[log404 바로가기](https://log404.com)

---

## 🛠️ 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org/)
- **언어**: TypeScript
- **스타일링**: CSS Modules
- **상태 관리**: React Query, Redux
- **API 통신**: Axios
- **기타**: ESLint, Prettier 통한 코드 품질 관리

---

## 📂 프로젝트 구조

해당 프로젝트는 FSD (Feature-Sliced Design) 아키텍처를 기반으로 구성되어 있습니다.
또한, Next.js의 App Router 방식을 사용하므로, 폴더 구조는 app/ 디렉토리를 중심으로 구성됩니다.

```
log404-web/
├── .github/workflows/   # CI/CD 워크플로우 정의
├── public              #정적파일경로로
├── src
│   ├── app
│   ├── entities
│   ├── features
│   ├── shared
│   ├── widgets
```

---

## 🚀 시작하기

### 1. 레포지토리 클론

```bash
git clone https://github.com/ksc036/log404-web.git
cd log404-web
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음과 같은 환경 변수를 설정합니다:

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_S3_URL=https://minio.ksc036.store
NEXT_PUBLIC_DOMAIN=
```

> `NEXT_PUBLIC_API_URL`은 백엔드 서버의 API 엔드포인트를 가리킵니다.

### 4. 개발 서버 실행

```
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인할 수 있습니다.

---

## 🐳 k8s 자동 배포

### 개발 환경

```
git tag dev-vx.x.x
git push origin dev-vx.x.x
```

### 프로덕션 환경

```
git tag prod-vx.x.x
git push origin prod-vx.x.x
```

## 📬 API 엔드포인트

https://www.notion.so/API-1d85bcc0d681804a83a4ed231071da5d

## 📄 라이선스

[MIT](LICENSE)

---
