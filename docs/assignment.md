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

# Intermediate level
```sh
$ curl -i localhost:8001/api/health
{"status":"ok"}
```

Also see
https://github.com/RensOliemans/docker-platform-assignment/actions

# Expert level
## HTTPS
See [file:./limitations.md](limitations.md).

## Logging
http://assignment.rensoliemans.nl:3000. Obviously this is not
production-ready: we would want this to go via the proxy, and port
3000 to not be exposed. See [file:./limitations.md](limitations.md).

## Testing
```sh
cd api
uv run pytest
```

The above tests are done in the CI, as well as `nginx -t`.

## Load balancing
`docker compose up --build --scale app=4` will create 4 `app`
instances. nginx will correctly route this thanks to this config:

```nginx
http {
	upstream backend {
		server app:80;
	}
	...
	server {
		...
		location / {
            proxy_pass http://backend;
        }
	}
}
```

This is enough since Docker handles the network internally. This can
be verified with the following commands:

```sh
$ docker exec assignment-proxy-1 apk add bind-tools  # install dig
$ docker exec assignment-proxy-1 dig app
; <<>> DiG 9.20.20 <<>> app
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 14246
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;app.                           IN      A

;; ANSWER SECTION:
app.                    600     IN      A       172.18.0.10
app.                    600     IN      A       172.18.0.8
app.                    600     IN      A       172.18.0.5
app.                    600     IN      A       172.18.0.9

;; Query time: 1 msec
;; SERVER: 127.0.0.11#53(127.0.0.11) (UDP)
;; WHEN: Mon Mar 02 11:33:15 UTC 2026
;; MSG SIZE  rcvd: 97
```

The proxy will correctly distribute requests to the various
containers. You can verify this by doing

```bash
docker exec assignment-app-1 tail -f /var/log/nginx/access.log
# the same for each app instance

for i in $(seq 1 10); do
	curl localhost:8001
done
```

And see that the requests are distributed accross the various app
instances (using nginx's default round-robin balancing method).

