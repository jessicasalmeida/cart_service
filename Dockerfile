FROM node:18.18.1-alpine

RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/

RUN npm install

ENV DB_CONN_STRING="http://localhost:8000"
ENV DB_NAME="cart_db"
ENV DB_USER="jess"
ENV DB_PASSWORD="fiapfase4!"
ENV ORDER_SERVER="YYYY"
ENV URL="http://localhost:8000"

COPY ./dist/ /usr/src/app/dist
COPY .env /usr/src/app

EXPOSE 8000

CMD ["npm", "start"]
