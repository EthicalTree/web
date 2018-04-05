FROM node:9.10-alpine

ENV HOME /app

ADD package.json /app/
ADD package-lock.json /app/

RUN apk --update add --virtual build-dependencies build-base linux-headers && \
  npm install -g npm-run-all && \
  cd /app && \
  npm install

WORKDIR /app
ENV PATH="./node_modules/.bin:${PATH}"

CMD ["npm", "start"]
