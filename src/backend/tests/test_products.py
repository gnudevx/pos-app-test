from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_create_and_get_product():
    r = client.post("/products/", json={
        "name": "Coca Cola", "price": 15000, "stock": 100
    })
    assert r.status_code == 200
    pid = r.json()["id"]
    r2 = client.get(f"/products/{pid}")
    assert r2.status_code == 200
    assert r2.json()["name"] == "Coca Cola"


def test_cart_flow():
    r = client.post("/products/", json={
        "name": "Pepsi", "price": 12000, "stock": 50
    })
    pid = r.json()["id"]
    r2 = client.post("/cart/add", json={
        "product_id": pid, "name": "Pepsi",
        "price": 12000, "quantity": 2
    })
    assert r2.status_code == 200
    r3 = client.post("/cart/checkout")
    assert r3.status_code == 200
    assert r3.json()["receipt"]["total"] == 24000
