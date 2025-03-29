import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function ConfirmCartPage() {
  const navigate = useNavigate();
  const { title, price, bookId } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "No Book Found",
      price: Number(price) || 0,
      quantity: 1,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <h2>
        Confirm add to cart for {title} - ${price}
      </h2>
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
      <br />
      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </>
  );
}

export default ConfirmCartPage;
