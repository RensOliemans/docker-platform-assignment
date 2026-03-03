# Docker Platform Assignment
Basic platform that supports a web server and reverse proxy, with various levels
of complexity.

See [docs/assignment.md](file:docs/assignment.md) For an explanation
of the program with regard to the desired levels of complexity.

## Running
```sh
docker compose up --build
```

### Scaling up
Optionally you can scale up the amount of webservers that listen for
requests by doing:

```sh
docker compose up --build --scale app=4
```
