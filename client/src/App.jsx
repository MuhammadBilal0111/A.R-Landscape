import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Card from "./components/Card";
import DashboardLayoutBasic from "./pages/Dashboard/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
