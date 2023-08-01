import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected/protected";
import Navbar from "./compnents/Navbar/navbar";
import Footer from "./compnents/Footer/footer";
import Error from "./Pages/wrongpath/Error";
import Login from "./Pages/login/login";
import Signup from "./Pages/singup/signup";
import { useSelector } from "react-redux";
import SellerSignup from "./Pages/sellerSignUp/sellerSignUp";
import Products from "./Pages/Products/products";
import CreateProduct from "./Pages/CreateProducts/createProduct";
import DetailProduct from "./Pages/detailProducts/detailProduct";
import BuyPorduct from "./Pages/buyProduct/buyProduct";
import Order from "./Pages/Orders/orders";
import Home from "./Pages/home/home";
import DetailOrder from "./Pages/detailOrders/detailOrder";
import UpdateProduct from "./Pages/updateProduct/updateProduct";
import Cart from "./Pages/Cart/cart";
import CartBuy from "./Pages/CartBuy/cartBuy";
import KitchenItem from './Pages/CategoriesHa/kitchenItem/kitchenItem'
import ComputerProduct from './Pages/CategoriesHa/computerProduct/computerProduct'
import Others from "./Pages/CategoriesHa/others/others";
import SmartPhone from "./Pages/CategoriesHa/smartPhone/smartPhone";
import Speakers from "./Pages/CategoriesHa/speakers/speakers";
function App() {
  let isAuth = useSelector((state) => state.user.auth);
  let isSeller = useSelector((state) => state.user.seller);

  return (
    <div className="container">
      <BrowserRouter>
        <div className="layout">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<div className="main"><Home/></div>} />
            <Route
              path="/products"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className="main">
                    <Products />
                  </div>
                </Protected>
              }
            />
            <Route
              path="/product/create"
              exact
              element={
                <Protected isAuth={isAuth} isSeller={isSeller}>
                  <div className="main">
                    <CreateProduct />
                  </div>
                </Protected>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <div className="main">
                  <Login />
                </div>
              }
            />
            <Route
              path="/register"
              exact
              element={
                <div className="main">
                  <Signup />
                </div>
              }
            />
            <Route
              path="/registerseller"
              exact
              element={
                <div className="main">
                  <SellerSignup />
                </div>
              }
            />
            <Route
              path="/product/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                <div className="main">
                  <DetailProduct />
                </div>
                </Protected>
              }
            />
            <Route
              path="/product/update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className="main">
                    <UpdateProduct />
                  </div>
                </Protected>
              }
            />
              <Route
              path="/product/submit/:id"
              exact
              element={
                <div className="main">
                  <BuyPorduct />
                </div>
              }
            />
              <Route
              path="/owner/order/:id"
              exact
              element={
                <div className="main">
                  <Order/>
                </div>
              }
            />
             <Route
              path="/owner/order/detail/:id"
              exact
              element={
                <div className="main">
                  <DetailOrder/>
                </div>
              }
            />
            <Route
              path="/user/product/cart/:id"
              exact
              element={
                <div className="main">
                  <Cart/>
                </div>
              }
            />
             <Route
              path="/user/product/cart/buy"
              exact
              element={
                <div className="main">
                  <CartBuy/>
                </div>
              }
            />
            <Route
              path="/product/kitchenItem"
              exact
              element={
                <div className="main">
                  <KitchenItem/>
                </div>
              }
            />
             <Route
              path="/product/computerproduct"
              exact
              element={
                <div className="main">
                  <ComputerProduct/>
                </div>
              }
            />
            <Route
              path="/product/others"
              exact
              element={
                <div className="main">
                  <Others/>
                </div>
              }
            />
             <Route
              path="/product/speakers"
              exact
              element={
                <div className="main">
                  <Speakers/>
                </div>
              }
            />
             <Route
              path="/product/smartPhone"
              exact
              element={
                <div className="main">
                  <SmartPhone/>
                </div>
              }
            />
            <Route
              path="*"
              exact
              element={
                <div className="main">
                  <Error />
                </div>
              }
            />
          </Routes>

          <div className="footer">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
