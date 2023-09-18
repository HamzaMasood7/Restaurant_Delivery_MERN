import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import NavDropdown from "react-bootstrap/NavDropdown";

export const AdminNavbar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Navbar bg="success" data-bs-theme="light">
        <Container>
          <Link to="/admin/" className="text-white btn">
            Admin Dashbord
          </Link>
          <Nav className="me-auto">
            <NavDropdown title="Category">
              <NavDropdown.Item>
                <Link to="/admin/categories" className=" btn">
                  Category
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/admin/create-category" className=" btn">
                  Create Category
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Items">
              <NavDropdown.Item>
                <Link to="/admin/items" className=" btn">
                  Items
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/admin/create-item" className=" btn">
                  Create Items
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/admin/order" className="text-white btn">
              Order
            </Link>

            <Nav.Link></Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="text-white" onClick={handleLogout}>
              logout
            </Nav.Link>
            <Nav.Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
