FROM alpine:latest

RUN apk add python3 uv

WORKDIR /api
COPY api.py pyproject.toml uv.lock .

RUN uv sync

CMD ["uv", "run", "flask", "--app", "api:app", "run", "--host=0.0.0.0"]
