FROM nginx:1.23.3

RUN rm -r /usr/share/nginx/html/*

COPY ./build /usr/share/nginx/html
COPY ./image/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/config

CMD ["/bin/sh",  "-c", "envsubst < env.template.js > env.js && nginx -g 'daemon off;'"]