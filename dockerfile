# 1단계: 빌드 스테이지
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm ci

# 전체 프로젝트 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 2단계: 실행 스테이지
FROM node:22-alpine

# 작업 디렉토리
WORKDIR /app

# 의존성 복사 (프로덕션 의존성만)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 빌드 결과물 복사
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Next.js 서버 실행
CMD ["npm", "run", "start"]
