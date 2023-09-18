import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "./login.css";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myImage from "../../assets/2.avif";

export const Login = () => {
  const divStyle = {
    backgroundImage: `url(${myImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    height: "65vh",
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, error } = useLogin();

  useEffect(() => {
    if (error) {
      const notify = () => toast.error(error);
      notify();
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(user.email, user.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavbarComponent></NavbarComponent>

      <div style={divStyle}>
        <div className="container bg-white  login-form border rounded-4">
          <div className="container form">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <button className="btn btn-success m-2">Login</button>
            </form>

            <ToastContainer />
            <Link to="/register" className="btn btn-secondary btn-sm">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
