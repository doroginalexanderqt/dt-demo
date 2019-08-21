FROM godel-demo as builder

FROM nginx:latest

WORKDIR /usr/share/nginx/html

ADD ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build /usr/share/nginx/html