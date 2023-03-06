FROM node:16.14-alpine

WORKDIR /app-frontend

COPY ./package*.json ./
# COPY . /app-frontend/

RUN npm install

COPY . . 

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]