import logo from "./logo.svg";
import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/products/:category"
          element={<ProductList />}
        ></Route>
        <Route exact path="/product/:id" element={<Product />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
