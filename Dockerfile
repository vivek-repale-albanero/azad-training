FROM node:14.21.3-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 2030

ENTRYPOINT [ "npm" ]

CMD [ "run", "serve" ]