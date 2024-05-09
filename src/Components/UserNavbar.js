import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FacultyDropdown from "./FacultyDropdown";

const UserNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const logoImg = "../assets/img/logo192.png";

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
            <img src={logoImg} alt="Logo" height="30" />
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
                <FacultyDropdown cachedData={""} />
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
              <div className="dropdown">
                <a
                  href="#"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="profile-link ms-2"
                >
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Profile"
                    className="profile-image"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/Studentprofile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/allApplication">
                      Applications
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
