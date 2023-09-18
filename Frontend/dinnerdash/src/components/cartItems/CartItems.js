import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { createOrder } from "../../api/order";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = localStorage.getItem("user");

  const handleItemQuantityChange = (itemId, quantity) => {
    if (quantity === 0) {
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleCreateOrder = async () => {
    if (cartItems.length === 0) {
      const notify = () => toast.error("Cart is empty!");
      notify();
      return;
    }

    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const userId = user.user._id;

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = {
      userId: userId,
      items: cartItems.map((item) => ({
        item: item._id,
        quantity: item.quantity,
      })),
      state: "ordered",
      total: totalPrice,
    };

    try {
      await createOrder(userId, order, token);

      const notify = () => toast.success("Order Placed!");
      notify();

      setCartItems([]);
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Failed to create order:", error.message);
      const notify = () => toast.error("Error placing order, try again!");
      notify();
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(storedCartItems);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2 className="display-3 mt-3 pt-3">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item._id} className="list-group-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
              <div>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleItemQuantityChange(item._id, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleItemQuantityChange(item._id, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <Button variant="primary" onClick={handleCreateOrder}>
          Place Order
        </Button>
      ) : (
        <>
          <Link className="btn" to="/login">
            <h1>Sign in to PLace Order</h1>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartItems;
