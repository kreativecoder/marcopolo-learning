FROM node:15-alpine as build
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install --production=true --no-progress
COPY . /app
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]