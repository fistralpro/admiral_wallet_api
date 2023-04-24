FROM node:lts-alpine3.17

# Create app directory
WORKDIR /usr/src

COPY ./package*.json /usr

RUN npm i

COPY ./src /usr/src

WORKDIR /usr/src

# will pick up env file from docker compose
CMD npm start