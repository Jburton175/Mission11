// my extra bootstrap is contained on my table on the booklist page and on the category filter:
// added bootstrap to make the table dark mode and striped - https://getbootstrap.com/docs/5.0/content/tables/*/
// class from bootstrap that gives the filter a multi select rather than a checkbox - https://getbootstrap.com/docs/5.0/forms/select/

import "./css/App.css";
import BooksPage from "./pages/BooksPage";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmCartPage from "./pages/ConfirmCartPage";
import { CartProvider } from "./context/CartContext";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/addcart/:title/:price/:bookId"
              element={<ConfirmCartPage />}
            />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
