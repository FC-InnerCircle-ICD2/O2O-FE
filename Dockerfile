FROM node:20-alpine

# 필요한 시스템 패키지 설치
RUN apk add --no-cache libc6-compat

WORKDIR /app

# package.json과 Yarn 설정 파일들 복사
COPY package.json .yarnrc.yml ./
COPY .yarn/releases .yarn/releases/
COPY yarn.lock ./

# 의존성 설치
RUN yarn install --immutable

# 소스 코드 복사
COPY . .

# 빌드
RUN yarn build

# 서버 실행
CMD ["yarn", "start"]