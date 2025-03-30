import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
function CheckoutRedirect() {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/shop");
    }
  }, [items, navigate]);

  // If the cart has items, render the child route (CheckoutPage) using Outlet
  return <Outlet />;
}

export default CheckoutRedirect;
