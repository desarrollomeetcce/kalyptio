FROM node:14
  
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app/

WORKDIR /usr/src/app/frontend

EXPOSE 3000

RUN apt-get update
RUN pwd
RUN ls
RUN npm install
CMD ["npm", "start"]