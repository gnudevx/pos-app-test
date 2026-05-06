from fastapi import APIRouter, HTTPException
from app.models.product import Product, ProductCreate
from typing import List

router = APIRouter(prefix="/products", tags=["products"])

# In-memory store for demo
_db: dict[int, dict] = {}
_next_id = 1


@router.get("/", response_model=List[Product])
def list_products():
    return [Product(id=k, **v) for k, v in _db.items()]


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int):
    if product_id not in _db:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(id=product_id, **_db[product_id])


@router.post("/", response_model=Product)
def create_product(product: ProductCreate):
    global _next_id
    _db[_next_id] = product.model_dump()
    created = Product(id=_next_id, **_db[_next_id])
    _next_id += 1
    return created


@router.delete("/{product_id}")
def delete_product(product_id: int):
    if product_id not in _db:
        raise HTTPException(status_code=404, detail="Product not found")
    del _db[product_id]
    return {"deleted": product_id}
