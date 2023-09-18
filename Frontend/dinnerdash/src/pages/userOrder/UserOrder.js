import React from "react";
import { OrderUser } from "../../components/orderUser/OrderUser";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";

export const UserOrder = () => {
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
      <OrderUser />
    </div>
  );
};
