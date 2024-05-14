import React, { useState, useEffect } from "react";
import { StudentProfileURL, StudentApplicationsURL } from "../settings";
import { ApiCall } from "../Components/ApiCall";

const AllApplication = () => {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiCall(StudentProfileURL);
        const studentId = data.id;
        console.log("student id : " + studentId);
        const applicationdata = await ApiCall(
          StudentApplicationsURL + "?id=" + studentId
        );
        setApplication(applicationdata);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="main-body">
        <div className="col-md-12">
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
                                <a href={`/StudentApplication/${course.id}`}>
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
      </div>
    </div>
  );
};

export default AllApplication;
