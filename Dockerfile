FROM node:12.16.2-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN cat package.json
RUN ls /app
RUN npm install

ADD . .

EXPOSE 8080

CMD ["npm", "run", "dev"]