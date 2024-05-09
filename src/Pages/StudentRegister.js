import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Import useHistory hook
import { StudentRegisterURL } from "../settings";

function StudentRegister() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    studentPassword: "",
    studentFirstName: "",
    studentLastName: "",
    studentPhone: "1234567890",
    studentAddress: "1234 Street Name",
    studentCity: "City",
    studentCountry: "Country",
    studentBirthDate: "2000-01-01",
    studentGender: "Male",
  });

  const history = useHistory(); // Initialize useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Public-Token",
      "743c7a15a3850459adb8c1b9e3bfc744ed3efe26c9d3d808fdf30c9c2fd5c09d"
    );

    try {
      const response = await fetch(StudentRegisterURL, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(formData), // Use formData here
      });

      if (response.ok) {
        // Successful Registration
        console.log("Registration successful!");

        const data = await response.json();
        const tokenId = data.token;
        localStorage.setItem("token", tokenId);

        history.push("/LoginPage"); // Redirect after successful registration
      } else {
        const data = await response.json();
        // Handle errors properly
        console.error("Registration failed:", data.message);
        // setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during Registration:", error);
      // setError("An error occurred during Registration");
    }
  };

  return (
    <div className="container p-5">
      <h1 className="mb-5 fw-bold fs-4">Register</h1>
      <div className="row">
        <form className="col-md-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="form-label fw-semibold"
              htmlFor="studentFirstName"
            >
              First Name
            </label>
            <input
              className="form-control rounded-pill"
              id="studentFirstName"
              type="text"
              name="studentFirstName"
              value={formData.studentFirstName}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="studentLastName">
              Last Name
            </label>
            <input
              className="form-control rounded-pill"
              id="studentLastName"
              type="text"
              name="studentLastName"
              value={formData.studentLastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="studentEmail">
              Email
            </label>
            <input
              className="form-control rounded-pill"
              id="studentEmail"
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="studentPassword">
              Password
            </label>
            <input
              className="form-control rounded-pill"
              id="studentPassword"
              type="password"
              name="studentPassword"
              value={formData.studentPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Add other fields similarly */}

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
                language in their username or profile information
              </li>
              <li>
                Users must not create multiple accounts for the same person.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default StudentRegister;
