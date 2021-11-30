FROM node:17

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/src/. ./src/.

COPY ./backend/tests/. ./tests/.

CMD [ "npm", "start"]