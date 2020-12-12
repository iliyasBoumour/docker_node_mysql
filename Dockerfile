FROM node:latest

WORKDIR /app

ADD package*.json ./


ADD . .

CMD node index.js