FROM node:16.13.1-alpine
WORKDIR /app
COPY . .
RUN apk update && apk add nginx
RUN yarn && yarn build --output-path ./build
# RUN mv /app/nginx.conf /etc/nginx/conf.d/default.conf
RUN mv /app/build /usr/share/nginx/html
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]