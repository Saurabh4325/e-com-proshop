import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import store from "./store/configureStore";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PrivateRoute from "./screens/PrivateRoute";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfileScreen from "./screens/ProfileScreen";
import DashboardScreen from "./screens/admin/DashboardScreen";
import AdminRoute from "./screens/AdminRoute";
import OrderlistScreen from "./screens/admin/OrderlistScreen";
import ProductlistScreen from "./screens/admin/ProductlistScreen";
import UserlistScreen from "./screens/admin/UserlistScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index={true} path="/" element={<HomeScreen />} />
                <Route path="/page/:pageNumber" element={<HomeScreen />} />
                <Route path="/search/:keyword" element={<HomeScreen />} />
                <Route
                  path="/search/:keyword/page/:pageNumber"
                  element={<HomeScreen />}
                />
                <Route path="product/:id" element={<ProductScreen />} />
                <Route path="cart" element={<CartScreen />} />
                <Route path="login" element={<LoginScreen />} />
                <Route path="register" element={<RegisterScreen />} />

                <Route path="" element={<PrivateRoute />}>
                  <Route path="shipping" element={<ShippingScreen />} />
                  <Route path="payment" element={<PaymentScreen />} />
                  <Route path="placeorder" element={<PlaceorderScreen />} />
                  <Route path="order/:id" element={<OrderScreen />} />
                  <Route path="profile" element={<ProfileScreen />} />
                </Route>

                <Route path="" element={<AdminRoute />}>
                  <Route path="admin/dashboard" element={<DashboardScreen />}>
                    <Route path="productlist" element={<ProductlistScreen />} />
                    <Route
                      path="/admin/dashboard/productlist/:pageNumber"
                      element={<ProductlistScreen />}
                    />
                    <Route path="orderlist" element={<OrderlistScreen />} />
                    <Route
                      path="orderlist/:pageNumber"
                      element={<OrderlistScreen />}
                    />
                    <Route path="userlist" element={<UserlistScreen />} />
                    <Route
                      path="/admin/dashboard/product/:id/edit"
                      element={<ProductEditScreen />}
                    />
                    <Route
                      path="/admin/dashboard/user/:id/edit"
                      element={<UserEditScreen />}
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
