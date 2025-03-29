import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
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
    <div>
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: CartItem) => (
            <li key={item.bookId}>
              {item.title}: ${item.price.toFixed(2)} x {item.quantity || 1}
            </li>
          ))}
        </ul>
      )}

      <h3>Total Items: {totalQuantity}</h3>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

      <button onClick={() => navigate("/")}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
