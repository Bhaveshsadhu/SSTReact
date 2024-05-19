import React from "react";

function ContactPage() {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      console.log("Form submitted successfully");
    } else {
      console.log("Form submission failed");
    }
    form.classList.add("was-validated");
  };

  return (
    <>
      <section className="contact3 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow">
                <img
                  src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg"
                  className="img-fluid"
                  alt="Contact"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-box ml-3">
                <h1 className="font-weight-light mt-2">Quick Contact</h1>
                <form
                  className="mt-4 needs-validation"
                  noValidate
                  onSubmit={handleFormSubmit}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mt-2">
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid name.
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mt-2">
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid email address.
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mt-2">
                        <input
                          className="form-control"
                          type="tel"
                          id="Phone"
                          name="Phone"
                          placeholder="Phone"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid phone number.
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mt-2">
                        <textarea
                          className="form-control"
                          rows="3"
                          id="Message"
                          name="Message"
                          placeholder="Message"
                          required
                        ></textarea>
                        <div className="invalid-feedback">
                          Please provide a message.
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn btn-danger-gradient mt-3 btn-primary border-0 px-3 py-2"
                      >
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card mt-4 border-0 mb-4">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="card-body d-flex align-items-center c-detail ps-0">
                      <div className="me-3">
                        <img
                          src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"
                          alt="Address"
                        />
                      </div>
                      <div>
                        <h6 className="font-weight-medium">Address</h6>
                        <p>
                          601 Sherwood Ave.
                          <br /> San Bernandino
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="card-body d-flex align-items-center c-detail">
                      <div className="me-3">
                        <img
                          src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"
                          alt="Phone"
                        />
                      </div>
                      <div>
                        <h6 className="font-weight-medium">Phone</h6>
                        <p>
                          251 546 9442
                          <br /> 630 446 8851
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="card-body d-flex align-items-center c-detail">
                      <div className="me-3">
                        <img
                          src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"
                          alt="Email"
                        />
                      </div>
                      <div>
                        <h6 className="font-weight-medium">Email</h6>
                        <p>
                          info@wrappixel.com
                          <br /> 123@wrappixel.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
