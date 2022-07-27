FROM node:14
  
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN apt-get update
RUN pwd
RUN ls
RUN npm install

CMD ["npm", "start"]