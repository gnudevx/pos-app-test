from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/cart", tags=["cart"])

_cart: List[dict] = []


class CartItem(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int = 1


@router.get("/")
def get_cart():
    total = sum(i["price"] * i["quantity"] for i in _cart)
    return {"items": _cart, "total": round(total, 2)}


@router.post("/add")
def add_to_cart(item: CartItem):
    for existing in _cart:
        if existing["product_id"] == item.product_id:
            existing["quantity"] += item.quantity
            return {"cart": _cart}
    _cart.append(item.model_dump())
    return {"cart": _cart}


@router.delete("/clear")
def clear_cart():
    _cart.clear()
    return {"message": "Cart cleared"}


@router.post("/checkout")
def checkout():
    if not _cart:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = sum(i["price"] * i["quantity"] for i in _cart)
    receipt = {
        "items": list(_cart),
        "total": round(total, 2),
        "timestamp": str(__import__("datetime").datetime.now())
    }
    _cart.clear()
    return {"receipt": receipt, "status": "paid"}
