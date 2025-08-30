import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./pages/Listings.jsx";
import { Toaster } from 'react-hot-toast';
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Navbar from "./components/Navbar.jsx";
import WishList from "./pages/WIshList.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import About from "./pages/About.jsx";
import CancellationRefund from "./pages/CancellationRefund.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import ShippingDelivery from "./pages/ShippingDelivery.jsx";
import Privacy from "./pages/Privacy.jsx";
import ScrollToTop from "./components/ScrollTOTop.jsx";
import Search from "./pages/Search.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import Category from "./pages/Category.jsx";
import { ThemeProvider } from './contexts/ThemeContext';
import CookieConsent from "./components/CookieConsent.jsx";
import Chatbot from "./components/Chatbot.jsx";
import './styles.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser.email); // or `parsedUser` if you need full object
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse user:", err);
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    }
  }, []);

  return (
  <ThemeProvider>
    <Router>
       <ScrollToTop />
       <Chatbot/>
      <Toaster position="top-right" />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/* <Breadcrumbs /> */}
      <Routes>

        <Route
          path="/"
          element={
            <Listings
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/categories/:name" element={<Category />} />
        <Route
          path="/product/:id"
          element={
            <ProductPage
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          }
        />
      </Routes>
      <Footer/>
      <CookieConsent/>
    </Router>
  </ThemeProvider>
  );
}
