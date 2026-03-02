# Limitations
There are two major limitations to the current implementation: lack of HTTPS, and Grafana
not going through the proxy. This is both due to me not having enough nginx experience yet
(I use Caddy "at home").

## HTTPS
Any production-ready application has to use HTTPS. However, I could only get HTTPS to work
with a lot of manual configuration: run `certbot` on the server manually, and this would
include running `certbot renew` every three months (or in a cron, of course.)

My initial approach added a `certbot` service in docker-compose, which shares volumes with
the `proxy` container. The volumes it shared would point to `/etc/letsencrypt/...`;
`certbot` would place certificates here; `proxy` would read them.

This needs to be run on the server, and cannot be run on my development machine or on a
GitHub runner. This is because obtaining an SSL certificate has to have certbot listening
on `domain:80/.well-known/acme-challenge/` - my laptop or a GitHub runner doesn't listen
on `domain:80`.

This is a problem for two reasons:
1. I have `nginx -t` in my CI tests. This will lint `proxy/nginx.conf`, and will fail
   because the conf points to a certificate file, which is not present on the GitHub
   runner.
2. My local development setup would not work, for the same reason.

There are two solutions that come to my mind right now:
1. Fix certbot properly, remove `nginx -t` in tests (or create a dummy certificate file),
   accept that local development does not work (since `nginx` still wants to see the
   cert).
2. Create a self-signed certificate manually on both my server and my development machine.

Both are suboptimal, but better than plain HTTP. However, because I don't use nginx and
have not too much experience, this was taking more and more time: I continued with the
other tasks.

## Grafana listening on port 3000
Also due to little nginx experience, I was having some trouble with redirect loops. My
initial setup had the following block in my `proxy/nginx.conf`:

```nginx
location /logs/ {
    proxy_pass http://grafana;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarde-Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

And the following config in my `logging/docker-compose.yml`:

```docker-compose
grafana:
 image: grafana/grafana:${GRAFANA_VERSION:-12.4.0}
 environment:
   - GF_SERVER_ROOT_URL=http://${DOMAIN}/logs
   - GF_SERVER_SERVE_FROM_SUB_PATH=true
```

where `DOMAIN` is in my `.env` file. I expected this to work, but http://DOMAIN/logs/
would be proxied to Grafana, which would redirect to http://DOMAIN/logs/: an infinite
loop. I do not know why Grafana did this, and I do not know how to prevent this in nginx.

The outcome of this is pretty bad: it currently listens on port 3000, without going
through the proxy. However, I expect the solution to be pretty simple for someone that
knows nginx and grafana. I do not and spent a fair amount of time of messing around with
trailing slashes, `proxy_redirect`, etc. Usually, I would at this point ask someone with
experience with nginx and grafana, and continue with other tasks.
