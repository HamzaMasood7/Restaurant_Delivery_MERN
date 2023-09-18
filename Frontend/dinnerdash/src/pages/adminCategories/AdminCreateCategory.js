import React from "react";
import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";
import { CreateCategory } from "../../components/adminCategories/CreateCategory";

export const AdminCreateCategory = () => {
  return (
    <div>
      <>
        <AdminNavbar />
        <div className="container mt-3">
          <CreateCategory />
        </div>
      </>
    </div>
  );
};
