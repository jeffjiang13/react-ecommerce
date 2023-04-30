import { useEffect } from 'react';
// import { useSelector } from 'react-redux'; // Add this import
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import SearchPage from "./scenes/SearchPage";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProfilePage from "./auth/ProfilePage";
import { checkAndLoadUserFromStorage } from "./features/utils";

import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice'; // Update the path to your authSlice

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Add this line
  const dispatch = useDispatch();

  // ... other code
  useEffect(() => {
    checkAndLoadUserFromStorage(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // You can decode the JWT to get the user object.
      // For simplicity, we assume the user object is stored in the JWT payload.
      const user = JSON.parse(atob(jwt.split(".")[1]));
      dispatch(login({ jwt, user }));
    }
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
