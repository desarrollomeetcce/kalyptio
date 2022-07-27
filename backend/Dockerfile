FROM node:14
  
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/backend

COPY . /usr/src/app/backend

WORKDIR /usr/src/app/backend
RUN apt-get update
RUN pwd
RUN ls
RUN npm install

CMD ["npm", "start"]