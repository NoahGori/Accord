FROM node:17

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/src/. ./src/.

CMD [ "npm", "start"]