import React, { useState, useEffect } from "react";
import {
  getAllOrders,
  getOrdersByState,
  updateOrderState,
} from "../../api/order";
import { Form, Card, Container, Spinner, Alert, Button } from "react-bootstrap";
import { getToken } from "../../api/auth";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserDetails } from "./UserDetails";

export const GetOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedState, setSelectedState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = getToken();
      await updateOrderState(orderId, "cancelled", token);

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, state: "cancelled" } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMarkAsPaid = async (orderId) => {
    try {
      const token = getToken();
      await updateOrderState(orderId, "paid", token);

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, state: "paid" } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const token = getToken();
      await updateOrderState(orderId, "completed", token);

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, state: "completed" } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderActionButtons = (order) => {
    if (order.state === "cancelled") {
      return <Alert variant="danger">Order is Cancelled</Alert>;
    } else if (order.state === "completed") {
      return <Alert variant="info">Order is Completed</Alert>;
    } else if (order.state === "ordered") {
      return (
        <>
          <Button variant="danger" onClick={() => handleCancelOrder(order._id)}>
            Cancel Order
          </Button>
          <Button variant="success" onClick={() => handleMarkAsPaid(order._id)}>
            Mark as Paid
          </Button>
        </>
      );
    } else if (order.state === "paid") {
      return (
        <>
          <Button variant="danger" onClick={() => handleCancelOrder(order._id)}>
            Cancel Order
          </Button>
          <Button
            variant="success"
            onClick={() => handleCompleteOrder(order._id)}
          >
            Complete Order
          </Button>
        </>
      );
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = getToken();

        if (selectedOption === "all") {
          const fetchedOrders = await getAllOrders(token);
          console.log(fetchedOrders);

          const sortedOrders = fetchedOrders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sortedOrders);
        } else if (selectedOption === "state" && selectedState !== "") {
          try {
            const fetchedOrders = await getOrdersByState(selectedState, token);
            setOrders(fetchedOrders);
          } catch (error) {
            setOrders([]);
            setError("No orders found for the selected state.");
          }
        } else {
          setOrders([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [selectedOption, selectedState]);

  return (
    <Container className="py-4">
      <Form.Group>
        <Form.Label>Filter by:</Form.Label>
        <Form.Control
          as="select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="all">All Orders</option>
          <option value="state">By State</option>
        </Form.Control>
      </Form.Group>

      {selectedOption === "state" && (
        <Form.Group>
          <Form.Label>Select State:</Form.Label>
          <Form.Control
            as="select"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            <option value="ordered">Ordered</option>
            <option value="paid">Paid</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Form.Control>
        </Form.Group>
      )}

      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="mt-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>
                  <Link to={"/admin/order/" + order._id}>
                    <button className="btn btn-dark">show Details</button>
                  </Link>
                </Card.Text>
                <Card.Text>
                  Placed at:{" "}
                  {moment(order.createdAt).format("MMMM D, YYYY at h:mm A")}
                </Card.Text>
                <UserDetails userId={order.userId} />
                <Card.Text>Total: {order.total}</Card.Text>
                {renderActionButtons(order)}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};
