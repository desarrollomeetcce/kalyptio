FROM node:14
  
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app/

WORKDIR /usr/src/app/frontend
COPY ./.env /usr/src/app/frontend/.env

RUN apt-get update
RUN pwd
RUN ls
RUN npm install
#RUN npm run build
