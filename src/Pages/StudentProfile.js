import React, { useState, useEffect } from "react";
import { StudentProfileURL, StudentApplicationsURL } from "../settings";
import { useHistory, useParams } from "react-router-dom";
import { ApiCall } from "../Components/ApiCall";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [application, setApplication] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiCall(StudentProfileURL);
        const studentId = data.id;
        // console.log("Student Data : " + JSON.stringify(data));
        const applicationdata = await ApiCall(
          StudentApplicationsURL + "?id=" + studentId
        );
        // console.log("Application Data : " + applicationdata);
        setStudentData(data);

        setApplication(applicationdata);
        // sessionStorage.setItem("ApplicationData", applicationdata);
      } catch (error) {
        console.error(error.message);
        // Handle error appropriately, e.g., set error state
      }
    };

    fetchData();
  }, []);
  const handleApplyNowClick = () => {
    history.push({
      pathname: "/StudentProfileEdit",
      state: { StudentData: studentData },
    });
  };

  return (
    <div className="container">
      <div className="main-body">
        {studentData ? (
          <>
            <nav aria-label="breadcrumb" className="main-breadcrumb">
              <ol className="breadcrumb"></ol>
            </nav>
            {/* Render student profile using studentData */}
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>
                          {studentData.firstName} {studentData.lastName}
                        </h4>
                        <p className="text-secondary mb-1">
                          {studentData.student_id}
                        </p>
                        <p className="text-muted font-size-sm">
                          {studentData.address}
                        </p>
                        <button className="btn btn-primary">Follow</button>
                        <button className="btn btn-outline-primary">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {studentData.firstName} {studentData.lastName}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {studentData.email}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {studentData.phone}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Country</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {studentData.country.countryName}
                        <i
                          className={studentData.country.iconClass}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        {/* <a
                          className="btn btn-info "
                          target=""
                          href="StudentProfileEdit"
                        >
                          Edit
                        </a> */}
                        <button
                          onClick={handleApplyNowClick}
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 offset-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      {/* Courses */}
                      <div className="table-responsive">
                        <table className="table table-hover">
                          {/* Table Header */}
                          <thead>
                            <tr>
                              <td colSpan="5" style={{ textAlign: "center" }}>
                                <b>Applications</b>
                                <hr />
                              </td>
                            </tr>
                            <tr>
                              <th>ID</th>
                              <th>course_id</th>
                              <th>branch_id</th>
                              <th>status_id</th>
                            </tr>
                          </thead>
                          {/* Table Body */}
                          <tbody id="items">
                            {application &&
                              application.map((course) => (
                                <tr key={course.id}>
                                  <td>{course.id}</td>
                                  <td>
                                    <a
                                      href={`/StudentApplication/${course.id}`}
                                    >
                                      {course.course_id}
                                    </a>
                                  </td>
                                  <td>{course.branch_id}</td>
                                  <td>
                                    <div className="progress">
                                      {course.status_id}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <hr />
                        <div className="row">
                          <div className="col-md-4 col-md-offset-4 text-center">
                            <ul className="pagination" id="myPager"></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Home Tab */}

                    {/* Messages Tab */}
                    <div className="tab-pane" id="messages">
                      {/* Messages Content */}
                      <h2></h2>
                      <ul className="list-group">
                        {/* Message items */}
                        {/* These can be added dynamically */}
                        <li className="list-group-item text-muted">Inbox</li>
                        {/* Add more message items */}
                      </ul>
                    </div>
                    {/* /Messages Tab */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Render loading indicator or placeholder while data is being fetched
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
