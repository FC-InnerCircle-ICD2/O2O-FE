FROM node:20-alpine

# 필요한 시스템 패키지 설치
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 먼저 package.json만 복사
COPY package.json ./

# Yarn Berry 설정 파일들 복사
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY yarn.lock ./

# 의존성 설치
RUN yarn install --immutable

# 소스 코드 복사
COPY . .

# 빌드
RUN yarn build

# 서버 실행
CMD ["yarn", "start"]