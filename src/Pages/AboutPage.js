import React from "react";

const AboutPage = () => {
  return (
    <div id="about" className="aboutsection">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="section-header ">
              <h2 className="text-center">Welcome to Edusite</h2>
              <p className="lead">
                Libris vivendo eloquentiam ex ius, nec id splendide abhorreant.
              </p>
            </div>

            <div className="feature">
              <i className="feature-icon fa fa-flask"></i>
              <div className="feature-content">
                <h4>Online Courses</h4>
                <p>
                  Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et
                  his suas veniam nominati.
                </p>
              </div>
            </div>

            <div className="feature">
              <i className="feature-icon fa fa-users"></i>
              <div className="feature-content">
                <h4>Expert Teachers</h4>
                <p>
                  Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et
                  his suas veniam nominati.
                </p>
              </div>
            </div>

            <div className="feature">
              <i className="feature-icon fa fa-comments"></i>
              <div className="feature-content">
                <h4>Community</h4>
                <p>
                  Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et
                  his suas veniam nominati.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-img">
              <img
                src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg"
                className="img-fluid"
                alt="about"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
