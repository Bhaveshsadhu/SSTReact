import React, { useState, useEffect } from "react";
import { StudentProfileURL, StudentApplicationsURL } from "../settings";
import { ApiCall } from "../Components/ApiCall";

const AllApplication = () => {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationdata = await ApiCall(StudentApplicationsURL);
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
        <div className="col-md-12 mt-5">
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
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            <b>Applications</b>
                          </td>
                        </tr>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Progress</th>
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
                                  {course.course.courseName}
                                </a>
                              </td>
                              <td>{course.course.shortCourseDescription}</td>
                              <td>
                                <div className="progress">
                                  {course.status.status}
                                  {/* <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: "50%" }}
                                        aria-valuenow="50"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-md-4 col-md-offset-4 text-center">
                        <ul className="pagination" id="myPager"></ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Home Tab */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApplication;
