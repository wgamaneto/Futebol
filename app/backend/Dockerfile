FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . /app-backend/

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "dev" ]
