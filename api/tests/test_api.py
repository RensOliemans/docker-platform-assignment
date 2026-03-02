import pytest

from api.api import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_primes_until_valid(client):
    response = client.get("/primes-until/10")
    assert response.status_code == 200
    assert response.json == {"primes": [2, 3, 5, 7]}


def test_primes_until_negative(client):
    response = client.get("/primes-until/-1")
    assert response.status_code == 400
    assert "error" in response.json


def test_primes_until_nonnumber(client):
    response = client.get("/primes-until/abc")
    assert response.status_code == 400
    assert "error" in response.json


def test_primes_until_too_small(client):
    response = client.get("/primes-until/1")
    assert response.status_code == 400
    assert "error" in response.json
