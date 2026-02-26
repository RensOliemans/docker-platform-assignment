FROM alpine:latest

RUN apk add nginx curl

WORKDIR /app
COPY index.html .
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --no-progress-meter --fail http://localhost/
