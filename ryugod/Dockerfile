FROM node:16

WORKDIR /app
COPY public public
COPY src src
COPY babel.config.js babel.config.js
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY vue.config.js vue.config.js

RUN npm i
EXPOSE 8080
CMD npm run serve

