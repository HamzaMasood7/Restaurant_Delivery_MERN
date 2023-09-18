import React from "react";
import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";
import { CreateItem } from "../../components/adminItems/CreateItem";

export const AdminItems = () => {
  return (
    <div>
      <AdminNavbar />

      <div className="container">
        <h1 className="mt-3">Create Items</h1>
        <CreateItem />
      </div>
    </div>
  );
};
