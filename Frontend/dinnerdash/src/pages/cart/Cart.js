import React from "react";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { CartItems } from "../../components/cartItems/CartItems";
import { useState, useEffect } from "react";

export const Cart = () => {
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
      <CartItems />
    </div>
  );
};
