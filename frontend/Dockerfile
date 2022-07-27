FROM node:14
  
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app/

WORKDIR /usr/src/app/frontend

RUN apt-get update
RUN pwd
RUN ls
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve","-s", "build"]