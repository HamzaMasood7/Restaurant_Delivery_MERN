import React from "react";
import Profile from "../../components/Profile/Profile";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";

export const UserProfile = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const initialCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (initialCartItems) {
      setCartItemCount(initialCartItems.length);
    }
  }, []);

  return (
    <div>
      <NavbarComponent cartItemCount={cartItemCount} />
      <Profile />
    </div>
  );
};
