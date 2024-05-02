FROM node:18.12.1

RUN mkdir -p /usr/src/

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g cross-env

RUN npm install

COPY . .

EXPOSE ${AUTH_API_PORT} ${DATABASE_PORT}

CMD ["npm", "run", "dev"]