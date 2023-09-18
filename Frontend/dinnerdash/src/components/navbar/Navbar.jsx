import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

export const NavbarComponent = ({ cartItemCount }) => {
  const { logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    var username = user.user.firstName;
    var isAdmin = user && user.user.role === "admin";
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="light" fixed="top" data-bs-theme="light">
        <Container>
          <Link to="/">
            <Navbar.Brand to="/">
              <img
                className="navbar-brand-image"
                src="https://cdn-icons-png.flaticon.com/512/3595/3595458.png"
                alt=""
              />
              Dinner Dash
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link className="text-secondary p-2" to="/">
              Home
            </Link>
            <Link className="text-secondary p-2" to="/cart">
              Cart{" "}
              {cartItemCount > 0 && (
                <Badge pill bg="primary">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Nav>

          <Nav>
            {isAdmin ? (
              <>
                <Link className="text-secondary p-2" to="/admin">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
            {user ? (
              <>
                <Link className="text-secondary p-2" to="/order">
                  Orders
                </Link>
                <Link
                  className="text-secondary p-2"
                  to={`/profile/${user.user._id}`}
                >
                  {username}
                </Link>
                <Nav.Link onClick={handleLogout}>logout</Nav.Link>
              </>
            ) : (
              <>
                <Link className="text-secondary p-2" to="/login">
                  Login
                </Link>
                <Link className="text-secondary p-2" to="/register">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
