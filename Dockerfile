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
FROM nginx:mainline-alpine3.20-slim AS RUNTIME
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
COPY --from=builder /home/app/dist .
USER nonroot
ENTRYPOINT ["nginx", "-g", "daemon off;"]
