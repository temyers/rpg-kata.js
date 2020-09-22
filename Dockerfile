FROM node:11

VOLUME /rpg-kata.js

WORKDIR /rpg-kata.js

RUN npm install
