import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import { Footer } from "./component/layout/Footer/Footer";
import { Home } from "./component/Home/Home";
import { Search } from "./component/Product/Search";
import { ProductDetails } from "./component/Product/ProductDetails";
import { Products } from "./component/Product/Products";
import { LoginSignUp } from "./component/User/LoginSignUp";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { UserOptions } from "./component/layout/Header/UserOptions";

import { Profile } from "./component/User/Profile";
import { UpdateProfile } from "./component/User/UpdateProfile";
import { UpdatePassword } from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import ShippingInfo from "./component/Cart/ShippingInfo";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import ProcessOrder from "./component/Admin/ProcessOrder";
import OrderList from "./component/Admin/OrderList";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";

function App() {
  const { isAuthectication, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthectication && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
        <Route exact path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/login" element={<LoginSignUp />}></Route>
        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        <Route
          exact
          path="/account"
          element={isAuthectication && <Profile />}
        ></Route>

        <Route
          exact
          path="/me/update"
          element={isAuthectication && <UpdateProfile />}
        ></Route>
        <Route
          exact
          path="/password/update"
          element={isAuthectication && <UpdatePassword />}
        ></Route>
        <Route
          exact
          path="/password/forgot"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route
          exact
          path="/shipping"
          element={isAuthectication && <ShippingInfo />}
        ></Route>
      </Routes>
      {stripeApiKey && (
        <Routes>
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
          <Route
            exact
            path="/success"
            element={isAuthectication && <OrderSuccess />}
          ></Route>
          <Route
            exact
            path="/orders"
            element={isAuthectication && <MyOrders />}
          ></Route>

          <Route
            exact
            path="/order/confirm"
            element={isAuthectication && <ConfirmOrder />}
          ></Route>
          <Route
            exact
            path="/order/:id"
            element={isAuthectication && <OrderDetails />}
          ></Route>
          <Route
            exact
            path="/admin/dashboard"
            element={isAuthectication && <Dashboard />}
          ></Route>
          <Route
            exact
            path="/admin/products"
            element={isAuthectication && <ProductList />}
          ></Route>
          <Route
            exact
            path="/admin/product"
            element={isAuthectication && <NewProduct />}
          ></Route>
          <Route
            exact
            path="/admin/products/:id"
            element={isAuthectication && <UpdateProduct />}
          ></Route>
          <Route
            exact
            path="/admin/orders"
            element={isAuthectication && <OrderList />}
          ></Route>
          <Route
            exact
            path="/admin/order/:id"
            element={isAuthectication && <ProcessOrder />}
          ></Route>
          <Route
            exact
            path="/admin/users"
            element={isAuthectication && <UsersList />}
          ></Route>
          <Route
            exact
            path="/admin/user/:id"
            element={isAuthectication && <UpdateUser />}
          ></Route>
          <Route
            exact
            path="/admin/reviews"
            element={isAuthectication && <ProductReviews />}
          ></Route>
          <Route
            element={
              window.location.pathname === "/process/payment" ? null : (
                <NotFound />
              )
            }
          />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
