FROM node:12

MAINTAINER Subu

WORKDIR /app

COPY ../../strapi-development/ /app

RUN npm install pg

RUN npm install

RUN npm install pm2@latest -g

RUN yarn build

EXPOSE 1337

CMD ["pm2-runtime", "ecosystem.config.js"]