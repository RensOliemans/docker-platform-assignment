FROM alpine:latest

RUN apk add python3 uv curl

WORKDIR /api
COPY api.py pyproject.toml uv.lock .

RUN uv sync

CMD ["uv", "run", "flask", "--app", "api:app", "run", "--host=0.0.0.0"]

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --no-progress-meter --fail http://localhost:5000/health
