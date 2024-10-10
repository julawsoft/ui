# Stage One 
FROM node:18.20.4 as builder
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/app
USER node
COPY --chown=node:node . .
RUN npm install -f
RUN npm run build

# Stage Two
FROM nginx:1.22-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /home/app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
