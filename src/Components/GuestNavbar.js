import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FacultyDropdown from "./FacultyDropdown";

const GuestNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const logoImg = "/assets/img/AV-full.png";

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      alert("Please enter a search term.");
    } else {
      history.push(`/search/${searchTerm}`);
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg usernavbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="Logo" height="50" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Faculties
                </a>
                <FacultyDropdown />
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <form
                className="form-inline me-2"
                method="get"
                id="searchForm"
                onSubmit={handleSearch}
              >
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-primary text-white"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </form>
              <div className="text-end ms-3">
                <Link
                  className="btn btn-outline-primary text-white me-2"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-primary text-white"
                  to="/StudentRegister"
                >
                  Sign-up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default GuestNavbar;
