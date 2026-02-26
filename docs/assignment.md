# Basic level
```sh
$ podman-compose up --build --scale app=2
$ curl -i localhost:8001

HTTP/1.1 200 OK
Server: nginx/1.28.2
Date: Thu, 26 Feb 2026 10:03:46 GMT
Content-Type: text/html
Content-Length: 271
Connection: keep-alive
Last-Modified: Thu, 26 Feb 2026 08:46:40 GMT
ETag: "69a00870-10f"
Accept-Ranges: bytes
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: deny
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: no-referrer
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Cache-Control: no-store, max-age=0
X-DNS-Prefetch-Control: off

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hi there</title>
  </head>
  <body>
    <h1>Hi there.</h1>
    <p>I'm running on a web server</p>
  </body>
</html>
```
