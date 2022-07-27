FROM node:14
  
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/frontend

COPY . /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

RUN apt-get update
RUN npm install
RUN pwd
RUN ls
CMD ["npm", "start"]