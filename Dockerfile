# 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

# 필요한 시스템 패키지 설치
RUN apk add --no-cache libc6-compat

# 환경변수 설정
ARG NEXT_PUBLIC_API_MOCKING
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_KAKAO_APP_KEY

# .env 파일 생성
RUN echo "NEXT_PUBLIC_API_MOCKING=${NEXT_PUBLIC_API_MOCKING}" > .env && \
    echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" >> .env && \
    echo "NEXT_PUBLIC_KAKAO_APP_KEY=${NEXT_PUBLIC_KAKAO_APP_KEY}" >> .env

# .env 파일 확인
RUN echo "=== .env file contents ===" && cat .env

# 전체 소스 코드 복사
COPY . .

# nodeLinker를 node-modules로 설정
RUN rm .yarnrc.yml && \
    echo "nodeLinker: node-modules" > .yarnrc.yml && \
    echo "yarnPath: .yarn/releases/yarn-4.6.0.cjs" >> .yarnrc.yml

# 기존 캐시 정리 및 의존성 재설치
RUN rm -rf node_modules .yarn/cache .pnp.* && \
    yarn install

# 빌드
ENV NODE_ENV production
RUN yarn build

# 프로덕션 스테이지
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 필요한 파일만 복사
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 보안을 위한 비root 유저 설정
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]