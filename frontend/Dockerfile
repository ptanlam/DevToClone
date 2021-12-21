FROM node:16.13.1-alpine as builder
WORKDIR /app

COPY package*.json /app/
RUN yarn add global @angular/cli
RUN yarn
COPY . /app/

ARG BACKEND_URL
ENV backendUrl=$BACKEND_URL

RUN yarn build --output-path ./build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
