import React from "react";

function UserProfileEdit() {
  function displaySelectedImage(event, targetId) {
    // Handle image display logic here if needed
    var selectedImage = document.getElementById(targetId);
    var file = event.target.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        selectedImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, set the image to a default URL or hide the image
      removeFile();
    }
  }

  function removeFile() {
    // Reset the file input
    document.getElementById("customFile1").value = "";

    // Set the image to a default URL or hide the image
    document.getElementById("selectedImage").src =
      "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* Page title */}
          <div className="my-5">
            <h3>My Profile</h3>
            <hr />
          </div>
          {/* Form START */}
          <form className="file-upload">
            <div className="row mb-5 gx-5">
              {/* Contact detail */}
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Contact detail</h4>
                    {/* First Name */}
                    <div className="col-md-6">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="First name"
                        id="firstName"
                      />
                    </div>
                    {/* Last name */}
                    <div className="col-md-6">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Last name"
                        id="lastName"
                      />
                    </div>
                    {/* Phone number */}
                    <div className="col-md-6">
                      <label className="form-label">Phone number *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Phone number"
                        id="phoneNumber"
                      />
                    </div>
                    {/* Mobile number */}
                    <div className="col-md-6">
                      <label className="form-label">Mobile number *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Phone number"
                        id="mobileNumber"
                      />
                    </div>
                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">
                        Email *
                      </label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    {/* Skype */}
                    <div className="col-md-6">
                      <label className="form-label">Skype *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Phone number"
                        id="skype"
                      />
                    </div>
                  </div>{" "}
                  {/* Row END */}
                </div>
              </div>
              {/* Upload profile */}
              <div>
                <div className="mb-4 d-flex justify-content-center">
                  <img
                    id="selectedImage"
                    src=""
                    alt="example image"
                    style={{ width: "300px" }}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div className="btn-group">
                    <label
                      className="btn btn-primary btn-rounded m-1"
                      htmlFor="customFile1"
                    >
                      Upload
                      <input
                        type="file"
                        className="form-control d-none"
                        id="customFile1"
                        onChange={(event) =>
                          displaySelectedImage(event, "selectedImage")
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-danger btn-rounded m-1"
                      onClick={() => removeFile()}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* Row END */}
            {/* Social media detail */}
            {/* ... (unchanged) */}
            {/* change password */}
            {/* ... (unchanged) */}
            {/* Social media detail */}
            <div className="row mb-5 gx-5">
              <div className="col-xxl-6 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Social media detail</h4>
                    {/* Facebook */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fab fa-fw fa-facebook me-2 text-facebook"></i>
                        Facebook *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Facebook"
                        value="http://www.facebook.com"
                      />
                    </div>
                    {/* Twitter */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fab fa-fw fa-twitter text-twitter me-2"></i>
                        Twitter *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Twitter"
                        value="http://www.twitter.com"
                      />
                    </div>
                    {/* Linkedin */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fab fa-fw fa-linkedin-in text-linkedin me-2"></i>
                        Linkedin *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Linkedin"
                        value="http://www.linkedin.com"
                      />
                    </div>
                    {/* Instragram */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fab fa-fw fa-instagram text-instagram me-2"></i>
                        Instagram *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Instragram"
                        value="http://www.instragram.com"
                      />
                    </div>
                    {/* Dribble */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fas fa-fw fa-basketball-ball text-dribbble me-2"></i>
                        Dribble *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Dribble"
                        value="http://www.dribble.com"
                      />
                    </div>
                    {/* Pinterest */}
                    <div className="col-md-6">
                      <label className="form-label">
                        <i className="fab fa-fw fa-pinterest text-pinterest"></i>
                        Pinterest *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Pinterest"
                        value="http://www.pinterest.com"
                      />
                    </div>
                  </div>{" "}
                  {/* Row END */}
                </div>
              </div>

              {/* change password */}
              <div className="col-xxl-6">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="my-4">Change Password</h4>
                    {/* Old password */}
                    <div className="col-md-6">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Old password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    {/* New password */}
                    <div className="col-md-6">
                      <label
                        htmlFor="exampleInputPassword2"
                        className="form-label"
                      >
                        New password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                      />
                    </div>
                    {/* Confirm password */}
                    <div className="col-md-12">
                      <label
                        htmlFor="exampleInputPassword3"
                        className="form-label"
                      >
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* Row END */}
            {/* button */}
            <div className="gap-3 d-md-flex justify-content-md-end text-center">
              <button type="button" className="btn btn-danger btn-lg">
                Delete profile
              </button>
              <button type="button" className="btn btn-primary btn-lg">
                Update profile
              </button>
            </div>
          </form>{" "}
          {/* Form END */}
        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;
