FROM node:15-alpine as build
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn install --no-progress
COPY . /app

FROM node:15-alpine
WORKDIR /app
COPY --from=build /app /app
COPY package.json /app
COPY yarn.lock /app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn install --production=true --no-progress

EXPOSE 5000
USER node
CMD ["node", "app.js"]