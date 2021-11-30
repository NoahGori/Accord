FROM node:12

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend ./

CMD [ "npm", "run", "build"]