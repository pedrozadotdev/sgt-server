# Build stage
FROM node:lts-alpine as build

RUN apk update; \
  apk add git;  \
  apk add yarn; \
  apk add python2;
WORKDIR /tmp
COPY package*.json ./
RUN yarn install --silent
COPY . .
RUN yarn build

# Release stage
FROM node:lts-alpine as release

RUN apk update; \
  apk add git;  \
  apk add yarn;

WORKDIR /parse-server

COPY package*.json ./

RUN yarn install --production --ignore-scripts --silent

COPY --from=build /tmp/dist ./

ENV PORT=1337

USER node
EXPOSE $PORT

ENTRYPOINT ["node", "./server"]
