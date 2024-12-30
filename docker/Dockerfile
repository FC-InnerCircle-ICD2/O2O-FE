FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
