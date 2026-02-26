FROM alpine:latest

RUN apk add nginx

WORKDIR /app
COPY index.html .
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
