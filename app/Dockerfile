FROM alpine:3.23

RUN apk --no-cache add nginx=1.28.2-r1 curl=8.17.0-r1

WORKDIR /app
COPY index.html .
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --no-progress-meter --fail http://localhost/
