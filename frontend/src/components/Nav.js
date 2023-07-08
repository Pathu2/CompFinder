import React from "react";
import { BrowserRouter, Link, Routes, useNavigate } from "react-router-dom";
function Nav() {
  const auth = localStorage.getItem("user");
  const nagivate = useNavigate();
  const loggedout = () => {
    console.log("Logout Successfull");
    localStorage.clear();
    nagivate("/signup");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-primary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CompFinder
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/event"
                  >
                   Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/add-event"
                  >
                    Add Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    onClick={loggedout}
                    aria-current="page"
                    to="/signup"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
