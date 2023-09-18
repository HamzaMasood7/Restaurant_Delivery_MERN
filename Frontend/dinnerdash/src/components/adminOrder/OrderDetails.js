import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrdersById } from "../../api/order";
import { fetchItemById } from "../../api/Items";
import { getUserById } from "../../api/user";
import { Link } from "react-router-dom";
import moment from "moment";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);
  const [fetchUser, setFetchUser] = useState(null);
  //const readableTime = moment(order.createdAt).format("MMMM D, YYYY at h:mm A");

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userJSON = localStorage.getItem("user");
        const { token } = JSON.parse(userJSON);

        const fetchedOrder = await getOrdersById(orderId, token);
        setOrder(fetchedOrder);

        const user = await getUserById(fetchedOrder.userId, token);
        fetchItemDetails(fetchedOrder.items);
        setFetchUser(user);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchItemDetails = async (items) => {
      try {
        const userJSON = localStorage.getItem("user");
        const { token } = JSON.parse(userJSON);

        const itemPromises = items.map((item) =>
          fetchItemById(item.item, token)
        );
        const resolvedItemDetails = await Promise.all(itemPromises);
        setItemDetails(resolvedItemDetails);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-3 pt-3">
      <h2 className="mt-3">Order Details</h2>
      {order && (
        <div className="row">
          <div className="col-md-12">
            <h3
              className={`mt-4 ${
                order.state === "paid"
                  ? "text-success"
                  : order.state === "completed"
                  ? "text-success"
                  : order.state === "cancelled"
                  ? "text-danger"
                  : "text-warning"
              }`}
            >
              Order ID: {order._id} - {order.state.toUpperCase()}
            </h3>
            <p className="mt-3">Items:</p>
            <ul className="list-group">
              {itemDetails.map((item, index) => {
                const orderItem = order.items[index];
                return (
                  <li key={orderItem._id} className="list-group-item">
                    <Link to={"/item/" + item._id}>
                      <h4>{item.title}</h4>
                    </Link>
                    <p>Description: {item.description}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {orderItem.quantity}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3">Total Price: Rs.{order.total}</p>
            <p className="mt-3">Ordered by: {fetchUser.email}</p>
            <p className="mt-3">
              Ordered at:{" "}
              {moment(order.createdAt).format("MMMM D, YYYY at h:mm A")}
            </p>
            <p className="mt-3">
              {fetchUser.firstName + " " + fetchUser.lastName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
