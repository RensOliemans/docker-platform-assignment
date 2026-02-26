# Running the platform

As of now, we build and run manually.

The platform consists of two parts: the webserver and the proxy. I use
`podman` but you can just use `docker` if you want. Since we are not
yet using `docker-compose`, we have to create a network first so that
the containers can talk to each other.

## setup

```sh
podman network create assignment
```

## webserver (app)

```sh
cd app/
podman build --tag assignment-app .
podman run --name app --network assignment --rm assignment-app
```

Note the lack of port exposures.

## proxy

```sh
cd proxy/
podman build --tag assignment-proxy .
podman run --name proxy --network assignment --rm -p 8001:80 assignment-proxy
```

## test it out

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
