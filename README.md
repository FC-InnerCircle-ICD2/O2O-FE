## 로컬 환경 실행 방법
1. **설치**
     ```bash
      yarn install
      ```

2. **yarn 설정**
   ```bash
   yarn dlx @yarnpkg/sdks vscode
   ```
   💡 yarn 설정 후 prettier 적용이 안될 시에 에디터를 껐다가 다시 킨다.(선택)

3. **실행**
   ```bash
   yarn dev
   ```





## 도커 환경 실행 방법

1. **이미지 빌드**  
   아래 명령어를 실행하여 Docker 이미지를 빌드합니다.

   ```bash
   ./docker/build.sh
   ```

2. **개발서버 실행**  
   아래 명령어를 실행하여 Docker 컨테이너를 실행합니다.

   ```bash
   ./docker/run.sh
   ```

3. 접속하기<br/>
   브라우저에서 <a href="http://localhost:3000">http://localhost:3000</a> 접속

