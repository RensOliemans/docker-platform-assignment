from flask import Flask

from api.primes import primes_until


app = Flask(__name__)


@app.route("/")
def root():
    return "", 200


@app.route("/health")
def health():
    return {"status": "ok"}, 200


@app.route("/primes-until/<n>")
def primes(n: int):
    try:
        primes: list[int] = primes_until(n)
    except ValueError as e:
        return {"error": str(e)}, 400

    return {"primes": primes}
