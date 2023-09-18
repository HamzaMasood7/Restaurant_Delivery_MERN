import React from "react";
import { Link } from "react-router-dom";
import { AdminNavbar } from "../../components/adminNavbar/AdminNavbar";

export const AdminDashbord = () => {
  return (
    <>
      <AdminNavbar />

      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Categories</h5>
              </div>
              <Link to="/admin/categories" className="btn">
                All Categories
              </Link>
              <Link to="/admin/categories" className="btn">
                Create New Categories
              </Link>
            </div>
          </div>
          <div className="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Items</h5>
              </div>
              <Link to="/admin/items" className="btn">
                All Items
              </Link>

              <Link to="/admin/create-item" className="btn">
                Create New Items
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Order</h5>
              </div>
              <Link to="/admin/order" className="btn">
                Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
