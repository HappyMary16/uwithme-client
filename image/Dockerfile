FROM nginx:1.23.3

RUN rm -r /usr/share/nginx/html/*

COPY ./build /usr/share/nginx/html

COPY ./image/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./image/substitute.sh /opt/uwm/substitute.sh

WORKDIR /usr/share/nginx/html/config

CMD /opt/uwm/substitute.sh && nginx -g 'daemon off;'