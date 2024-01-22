FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY /dist/ .

EXPOSE 8000

CMD ["npm", "start"]
