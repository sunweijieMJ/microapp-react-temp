FROM it-artifactory.yitu-inc.com/docker-local/ai-center-web/nginx-builder:dba226d

COPY dist /usr/share/nginx/html/

COPY docker/cert /etc/nginx/

COPY docker/nginx.conf /etc/nginx/nginx.conf
