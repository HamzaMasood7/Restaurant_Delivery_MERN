import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { useSignup } from "../../hooks/useSignup";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
  });

  const { signup, error, success } = useSignup();

  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();

    const trimmedFirstName = user.firstName.trim();
    const trimmedLastName = user.lastName.trim();

    if (trimmedFirstName === "") {
      const notify = () => toast.error("Fisrt Name cannot be empty");
      notify();
      return;
    }

    if (trimmedLastName === "") {
      const notify = () => toast.error("Last Name cannot be empty");
      notify();
      return;
    }

    try {
      await signup(
        trimmedFirstName,
        trimmedLastName,
        user.displayName,
        user.email,
        user.password
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      const notify = () => toast.error(error);
      notify();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setUser({
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        password: "",
      });
      const form = document.querySelector("form");
      form.reset();
      const notify = () => toast.success(success + "lll");
      notify();
    }
  }, [success]);
  return (
    <>
      <NavbarComponent />
      <div className="container  login-form border rounded-4">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div className="input-container">
              <input
                type="text"
                placeholder="firstName"
                required
                value={setUser.firstName}
                className="form-control"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <input
                placeholder="lastName"
                required
                value={setUser.lastName}
                className="form-control"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                minLength={2}
                maxLength={32}
                placeholder="displayName"
                value={setUser.displayNameName}
                className="form-control"
                onChange={(e) =>
                  setUser({ ...user, displayName: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                required
                className="form-control"
                placeholder="Email"
                value={setUser.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="input-container">
              <input
                required
                type="password"
                className="form-control"
                placeholder="Password"
                value={setUser.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success m-2">
              Sign up
            </button>
          </form>
          <ToastContainer />
          <Link to="/login" className="btn btn-secondary btn-sm">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
