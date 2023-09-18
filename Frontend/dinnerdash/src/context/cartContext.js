import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0); // State to store the cart item count

  useEffect(() => {
    // Fetch cart items from local storage and update the cart item count
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      setCartItemCount(cartItems.length);
    }
  }, []);

  // Function to update the cart item count
  const updateCartItemCount = (count) => {
    setCartItemCount(count);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
