import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Card from "./components/Card";
import DashboardLayoutBasic from "./pages/Dashboard/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddToCart from "./pages/AddToCart";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        <Route path="/plant/:plant-slug" element={<AddToCart />} />
        <Route path="/add" element={<AddToCart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
