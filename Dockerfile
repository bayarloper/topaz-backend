FROM node:lts as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . . 
# Build production image
FROM dependencies as builder
EXPOSE 3001
CMD node server.js