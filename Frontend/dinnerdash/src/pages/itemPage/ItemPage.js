import React from "react";
import { ItemDetail } from "../../components/itemDetail/ItemDetail";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";

export const ItemPage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const initialCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (initialCartItems) {
      setCartItemCount(initialCartItems.length);
    }
  }, []);

  return (
    <div className="mt-3 pt-3">
      <NavbarComponent cartItemCount={cartItemCount} />
      <ItemDetail />
    </div>
  );
};
