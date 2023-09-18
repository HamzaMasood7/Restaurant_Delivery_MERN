import React from "react";
import "./homepage.css";
import { useState, useEffect } from "react";
import { NavbarComponent } from "../../components/navbar/Navbar";
import CategoryFilter from "../../components/categoryFIlter/CategoryFilter";
import myImage from "../../assets/2.avif";

export const HomePage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const divStyle = {
    backgroundImage: `url(${myImage})`,
    backgroundSize: "repeat",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    height: "100%",
  };

  useEffect(() => {
    const initialCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (initialCartItems) {
      setCartItemCount(initialCartItems.length);
    }
  }, []);

  return (
    <>
      <div style={divStyle}>
        <NavbarComponent cartItemCount={cartItemCount} />
        <CategoryFilter setCartItemCount={setCartItemCount} />
      </div>
    </>
  );
};
