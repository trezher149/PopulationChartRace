FROM node:18.20.4-alpine3.20

WORKDIR /app

COPY . /app

RUN npm install; node dataInit.js

EXPOSE 7000


CMD ["npm", "run", "dev"]