FROM node:12.13.1-alpine3.10

RUN apk add yarn

RUN mkdir -p /app/src
WORKDIR /app

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install --frozen-lockfile

ADD . /app

CMD ["yarn", "run", "start:dev"]
