FROM alpine:3.23

RUN apk --no-cache add nginx=1.28.2-r1

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
