const fs = require('fs');
const _ = require('lodash');
const { proxy } = require('../config/proxy');

/**
 * 根据proxy代理配置，导出对应的nginx.conf
 */
let output = `user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;

  sendfile        on;
  tcp_nopush     on;

  keepalive_timeout  65;

  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }
  gzip  on;
  gzip_vary on;
  gzip_min_length 1000;
  gzip_comp_level 2;
  gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml image/jpeg image/webp image/png application/javascript;

  server {
    listen 31181 ssl;
    server_name  localhost;

    ssl_certificate /etc/nginx/mycert.crt;
    ssl_certificate_key /etc/nginx/mycert.key;
    ssl_session_cache shared:SSL:20m;
    ssl_session_timeout 60m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    add_header Strict-Transport-Security "max-age=31536000;          includeSubDomains;preload";

    error_page 404 /index.html;

    location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
`;

_.forEach(proxy, (option, location) => {
  const proxyTarget = option.target;
  const pathRewrite = option.pathRewrite;
  const proxyAddress = proxyTarget.endsWith('/')
    ? proxyTarget
    : `${proxyTarget}/`;

  if (option.ws) {
    output += `
    location ${location} {
      proxy_pass ${proxyAddress};
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;

      rewrite "${_.entries(pathRewrite)[0][0]}(.*)$" ${
      _.entries(pathRewrite)[0][1]
    }/$1 break;
    }
    `;
  } else {
    output += `
    location ${location} {
      if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE' always;
        add_header 'Access-Control-Allow-Headers' '*' always;
        add_header 'Access-Control-Max-Age' 1728000 always;
        add_header 'Content-Length' 0;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        return 204;
      }

      if ($request_method ~* '(GET|POST|DELETE|PUT)') {
        add_header 'Access-Control-Allow-Origin' '*' always;
      }

      proxy_pass ${proxyAddress};
      proxy_set_header Referer $http_referer;
      proxy_set_header Host $host;

      rewrite "${_.entries(pathRewrite)[0][0]}(.*)$" ${
      _.entries(pathRewrite)[0][1]
    }/$1 break;
    }
  `;
  }
});

output += `
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
  }
}
`;

fs.writeFileSync('docker/nginx.conf', output);
