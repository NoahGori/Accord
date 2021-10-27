FROM node:17

WORKDIR /app

COPY ./bot/package*.json ./

RUN npm install

COPY ./bot/src/. ./src/.

CMD [ "npm", "run", "start-dev"]