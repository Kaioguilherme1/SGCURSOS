FROM nginx

COPY . /usr/share/nginx/html/
#COPY ./nginx_conf/ /etc/nginx/

WORKDIR /usr/share/nginx/html/

EXPOSE 80 443

LABEL maintainer="Kaio Guilherme <https://github.com/Kaioguilherme1>"

CMD ["/bin/bash", "-c", "sh init.sh & nginx -g 'daemon off;'"]




