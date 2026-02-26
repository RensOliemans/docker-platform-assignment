# Running the platform

There are two ways to build and run the platform: with
`docker-compose` (recommended) and manually. A quick note: we use
`podman` and `podman-compose` in the commands, but it does not matter
whether you use `podman` or `docker`.

## docker-compose

```sh
podman-compose up --build
```

### Scaling up
Optionally you can scale up the amount of webservers that listen for
requests by doing:

```sh
podman-compose up --build --scale app=4
```

In this case compose will create 4 `app` containers: verify using
`podman container ls`. Verify that docker automatically fixes the
network:

```sh
$ podman exec assignment_proxy_1 apk add bind_tools  # install dig
$ podman exec assignment_proxy_1 dig app
; <<>> DiG 9.20.19 <<>> app
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 25134
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: 9fa9f91a2efa886c (echoed)
;; QUESTION SECTION:
;app.                           IN      A

;; ANSWER SECTION:
app.                    0       IN      A       10.89.1.2
app.                    0       IN      A       10.89.1.3
app.                    0       IN      A       10.89.1.5
app.                    0       IN      A       10.89.1.6
```

The proxy will correctly distribute requests to the various
containers. You can verify this by doing

```bash
podman exec assignment_app_1 tail -f /var/log/nginx/access.log
# the same for each app instance

for i in $(seq 1 10); do
	curl localhost:8001
done
```

And see that the requests are distributed accross the various app
instances (using nginx's default round-robin balancing method).

## Manually

The platform consists of two parts: the webserver and the proxy. I use
`podman` but you can just use `docker` if you want. Since we are not
yet using `docker-compose`, we have to create a network first so that
the containers can talk to each other.

### setup

```sh
podman network create assignment
```

### webserver (app)

```sh
cd app/
podman build --tag assignment-app .
podman run --name app --network assignment --rm assignment-app
```

Note the lack of port exposures.

### proxy

```sh
cd proxy/
podman build --tag assignment-proxy .
podman run --name proxy --network assignment --rm -p 8001:80 assignment-proxy
```

## testing

To test that the proxy indeed proxies the request to the webserver:

```sh
$ curl localhost:8001
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
