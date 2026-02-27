FROM alpine:3.23

RUN apk --no-cache add python3=3.12.12-r0 uv=0.10.2-r0 curl=8.17.0-r1

WORKDIR /api
COPY . /api/

RUN uv sync

CMD ["uv", "run", "flask", "--app", "src.api.api:app", "run", "--host=0.0.0.0"]

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --no-progress-meter --fail http://localhost:5000/health
