# Stage One 
FROM node:20.9.0 AS builder
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/app
USER node
COPY --chown=node:node ./package.json .
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# Stage Two
FROM owasp/modsecurity-crs:nginx AS runtime

WORKDIR /usr/share/nginx/html

USER root

RUN rm -rf ./*

RUN touch /var/log/nginx/app_sec.log
RUN chown nginx:nginx /var/log/nginx/app_sec.log
RUN chmod 604 /var/log/nginx/app_sec.log

RUN touch /var/run/nginx.pid
RUN mkdir -p /var/run/nginx
RUN chown nginx:nginx /var/run/nginx.pid

RUN chown nginx:nginx /var/run/nginx

USER nginx

COPY --from=builder /home/app/dist .


ENTRYPOINT ["nginx", "-g", "daemon off;"]
