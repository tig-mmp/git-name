FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
EXPOSE 5173
CMD ["yarn", "dev"]
