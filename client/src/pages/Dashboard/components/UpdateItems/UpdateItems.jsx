import React from "react";
import { useLocation } from "react-router-dom";

function UpdateItems() {
  const itemDetail = useLocation().state;

  return <div>{itemDetail}</div>;
}

export default UpdateItems;
