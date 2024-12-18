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
import SignUp from "./pages/register/SignUp.jsx";
import SignIn from "./pages/register/SignIn.jsx";
import Appointments from "./components/Appointments.jsx";
import OnlyAdminPrivateRoutes from "./components/OnlyAdminPrivateRoutes.jsx";
import Button from "./pages/Button.jsx";
import Services from "./pages/Services/Services.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant/:plantSlug" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route element={<OnlyAdminPrivateRoutes />}>
          <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
