# Stage One 
FROM node:20.9.0 AS builder
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/app
USER node
COPY --chown=node:node . .
RUN npm install
RUN npm run build

# Stage Two
FROM nginx:mainline-alpine3.20-slim
RUN apt-get update && \
    apt-get install -y \
    libapache2-mod-security2 && \
    apt-get clean
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /home/app/dist .
COPY modsecurity.conf /etc/modsecurity/modsecurity.conf

COPY crs /etc/modsecurity/crs

RUN echo "Include /etc/modsecurity/modsecurity.conf" >> /etc/nginx/nginx.conf && \
    echo "Include /etc/modsecurity/crs/*.conf" >> /etc/nginx/nginx.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

