import React from "react";
import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";
import { OrderDetails } from "../../components/adminOrder/OrderDetails";

export const AdminOrderDetail = () => {
  return (
    <div>
      <AdminNavbar />
      <OrderDetails />
    </div>
  );
};
