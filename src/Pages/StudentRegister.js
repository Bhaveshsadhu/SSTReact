import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { StudentRegisterURL } from "../settings";
import { ApiCall } from "../Components/ApiCall";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function StudentRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    country_id: 2,
    birth_date: "",
    gender: "Male",
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    message: "",
    isSuccess: false,
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      try {
        const data = await ApiCall(StudentRegisterURL, "POST", {
          body: { formData },
        });

        console.log("Response : " + data);
        if (data.isSuccess) {
          setModalInfo({
            show: true,
            message: data.message,
            isSuccess: true,
          });
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        } else {
          setModalInfo({
            show: true,
            message: data.message,
            isSuccess: false,
          });
        }
      } catch (error) {
        setModalInfo({
          show: true,
          message: "Error during registration. Please try again.",
          isSuccess: false,
        });
        console.error("Error during Registration:", error);
      }
    } else {
      console.log("Form submission failed");
    }
    form.classList.add("was-validated");
  };

  const handleClose = () => setModalInfo({ ...modalInfo, show: false });

  return (
    <div className="container p-5">
      <h1 className="mb-5 fw-bold fs-4">Register</h1>
      <div className="row">
        <form
          className="col-md-6 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control rounded-pill"
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              autoFocus
            />
            <div className="invalid-feedback">
              Please provide a valid first name.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-control rounded-pill"
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid last name.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="form-control rounded-pill"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid email address.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="form-control rounded-pill"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <div className="invalid-feedback">
              Please provide a valid password.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="phone">
              Phone
            </label>
            <input
              className="form-control rounded-pill"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid phone number.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="address">
              Address
            </label>
            <input
              className="form-control rounded-pill"
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid address.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="city">
              City
            </label>
            <input
              className="form-control rounded-pill"
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="birth_date">
              Birth Date
            </label>
            <input
              className="form-control rounded-pill"
              id="birth_date"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid birth date.
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="gender">
              Gender
            </label>
            <select
              className="form-control rounded-pill"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="invalid-feedback">Please select a gender.</div>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 py-2"
            >
              Register
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Already registered?{" "}
              <Link to="/Login" className="fw-semibold">
                Login here
              </Link>
            </p>
          </div>
        </form>

        <aside className="col-md-6">
          <div className="bg-light p-4 rounded">
            <h2 className="fw-bold fs-5">Instructions</h2>
            <ul className="list-unstyled mt-3">
              <li>
                All users must provide a valid email address and password to
                create an account.
              </li>
              <li>
                Users must not use offensive, vulgar, or otherwise inappropriate
                language in their username or profile information.
              </li>
              <li>
                Users must not create multiple accounts for the same person.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <Modal show={modalInfo.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.isSuccess ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalInfo.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentRegister;
