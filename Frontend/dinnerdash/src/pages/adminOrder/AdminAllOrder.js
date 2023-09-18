import React from "react";
import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";
import { GetOrder } from "../../components/adminOrder/GetOrder";

export const AdminAllOrder = () => {
  return (
    <div>
      <AdminNavbar />
      <GetOrder />
    </div>
  );
};
