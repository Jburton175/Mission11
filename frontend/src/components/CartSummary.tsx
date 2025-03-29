import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartSummary() {
  const { cart } = useCart();

  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="card shadow-sm p-3 bg-light">
      <h5 className="card-title">Cart Summary</h5>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group mb-3">
          <p>Total Items: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </ul>
      )}

      <button className="btn btn-primary w-100">Proceed to Checkout</button>
    </div>
  );
}

export default CartSummary;
