import React, { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import { getOrdersByUserId } from "../../api/order";
import { Link } from "react-router-dom";
import moment from "moment";

export const OrderUser = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userJSON = localStorage.getItem("user");
      const user = JSON.parse(userJSON);
      const token = user.token;
      const userId = user.user._id;

      try {
        const userOrders = await getOrdersByUserId(userId, token);
        setOrders(userOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    };

    fetchData();
  }, []);

  const getOrderStateVariant = (state) => {
    if (state === "completed" || state === "paid") {
      return "success";
    } else if (state === "cancelled") {
      return "danger";
    } else if (state === "ordered") {
      return "warning";
    }
    return "primary";
  };

  const getOrderCardClassName = (state) => {
    if (state === "completed" || state === "paid" || state === "cancelled") {
      return "order-card";
    }
    return "";
  };

  const sortedOrders = orders.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="mt-3 pt-3">
      <h2 className="mt-3 pt-3">Your Orders</h2>
      {sortedOrders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="order-list">
          {sortedOrders.map((order) => (
            <Card
              key={order._id}
              className={`mb-3 ${getOrderCardClassName(order.state)}`}
            >
              <Alert variant={getOrderStateVariant(order.state)}>
                <Card.Body>
                  <Card.Title>Order ID: {order._id}</Card.Title>
                  <Card.Text>
                    <Link to={"/order/" + order._id}>
                      <button className="btn btn-dark">show Details</button>
                    </Link>
                  </Card.Text>
                  <Card.Text>State: {order.state}</Card.Text>
                  <Card.Text>Price {order.total}</Card.Text>
                  <Card.Text>
                    Placed at:{" "}
                    {moment(order.createdAt).format("MMMM D, YYYY at h:mm A")}
                  </Card.Text>
                </Card.Body>
              </Alert>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
