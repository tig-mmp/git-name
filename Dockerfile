FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
COPY vite.config.js ./
RUN yarn install
COPY . .
