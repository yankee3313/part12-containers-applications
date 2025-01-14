FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]