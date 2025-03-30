import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DashboardLayoutBasic from "./pages/Dashboard/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddToCart from "./pages/AddToCart/AddToCart.jsx";
import ScrollToTop from "./components/ScrollToTop";
import Checkout from "./pages/Checkout/Checkout";
import ViewCart from "./pages/ViewCart/ViewCart.jsx";
import Shop from "./pages/shop/Shop";
import SignIn from "./pages/register/SignIn.jsx";
import Appointments from "./components/Appointments.jsx";
import OnlyAdminPrivateRoutes from "./components/OnlyAdminPrivateRoutes.jsx";
import Services from "./pages/Services/Services.jsx";
import UpdateItems from "./pages/Dashboard/components/UpdateItems/UpdateItems.jsx"; // used to update the components
import PageNotFound from "./pages/PageNotFound.jsx";
import { HelmetProvider } from "react-helmet-async";
import CheckoutRedirect from "./components/CheckoutRedirect.jsx";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productSlug" element={<AddToCart />} />
          <Route element={<CheckoutRedirect />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/cart" element={<ViewCart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route element={<OnlyAdminPrivateRoutes />}>
            <Route path="/edit" element={<UpdateItems />} />
            <Route path="/dashboard" element={<DashboardLayoutBasic />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
