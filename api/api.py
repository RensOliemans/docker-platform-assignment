import os

from flask import Flask

from primes import primes_until


app = Flask(__name__)


@app.route("/")
def root():
    return "", 200


@app.route("/health")
def health():
    return {"status": "ok"}, 200


@app.route("/primes-until/<int:n>")
def primes(n: int):
    if n < 2:
        return {"error": "n should be larger than 1"}, 400

    primes: list[int] = primes_until(n)
    return {"primes": primes}
