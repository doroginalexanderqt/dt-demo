# specify the node base image with your desired version node:<version>
FROM node

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 9111