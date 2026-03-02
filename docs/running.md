# Running the platform

```sh
docker compose up --build
```

## Scaling up
Optionally you can scale up the amount of webservers that listen for
requests by doing:

```sh
docker compose up --build --scale app=4
```
