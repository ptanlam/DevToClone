FROM node:16.13.1-alpine
WORKDIR /app

COPY package*.json .
RUN apk update && apk add nginx && yarn

COPY . .
RUN yarn build --output-path ./build

RUN mkdir /etc/nginx/conf.d && \
  mv /app/nginx.conf /etc/nginx/conf.d/default.conf && \
  mv /app/build /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]