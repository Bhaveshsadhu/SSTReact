import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tasksData } from "./applicationdata";
import { StudentApplicationsURL } from "../settings";
import { ApiCall } from "../Components/ApiCall";
import AttachedFiles from "../Components/AttachedFiles";

const StudentApplication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [application, setApplication] = useState(null);
  const { id } = useParams();
  const [displayCount, setDisplayCount] = useState(10);
  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedUser, setSelectedUser] = useState("User 1");
  //   const [activityData, setActivityData] = useState([...]); // Initialize your activity data array
  const activityData = [
    {
      userName: "Mark Freeman",
      date: new Date("2024-05-06T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-05-05T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-05-04T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-05-03T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-05-02T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-05-01T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-30T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-29T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-28T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "created",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-27T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    {
      userName: "Mark Freeman",
      date: new Date("2024-04-26T08:00:00").toLocaleString(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
      fileName: "Admission.pdf",
      fileSize: "54 MB",
      status: "updated",
    },
    // Repeat this structure for each entry, updating the date accordingly
  ];

  const statusOptions = ["Pending", "Lodged", "Submitted"];
  const userOptions = ["user1", "user2", "user3"];

  const toggleOrder = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
  };

  const sortedActivityData = [...activityData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return ascendingOrder ? dateA - dateB : dateB - dateA;
  });

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };
  const handleLoadMore = () => {
    // Increase the display count by 10 when "Load More" is clicked
    setDisplayCount(displayCount + 10);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationdata = await ApiCall(
          `${StudentApplicationsURL}/${id}`
        );

        const studentData = JSON.parse(sessionStorage.getItem("studentData"));
        // const applicationDataFromProfile = sessionStorage.getItem("ApplicationData");
        // console.log("Data From Session : ", JSON.stringify(applicationdata));

        setApplication(applicationdata);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="container-fluid border bg-light">
        <div className="row mb-3 mt-2">
          {/* Heading */}
          <div className="col-md-8 ">
            <h1 className="text-end text-secondary">Masters in IT</h1>
          </div>
          {/* End of Heading */}

          {/* start offcanvas */}

          <div className="col-md-4 d-flex justify-content-end ">
            <button
              className="btn btn-outline-secondary "
              type="button"
              onClick={toggleOffcanvas}
            >
              {isOpen ? (
                // <i className="fas fa-angle-double-right"></i>
                <i class="leftarrow fa-solid fa-circle-chevron-up "></i>
              ) : (
                // <i className="fas fa-angle-double-left"></i>
                <i class="rightarrow fa-solid fa-circle-chevron-up fa-lg"></i>
              )}
            </button>

            <div
              className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  onClick={toggleOffcanvas}
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    width: "100%",
                  }}
                >
                  <table className="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasksData.map((task, index) => (
                        <tr className="fw-normal" key={index}>
                          <td className="align-middle">{task.task}</td>
                          <td className="align-middle">
                            <h6 className="mb-0">
                              <span className="badge bg-primary">
                                {task.priority}
                              </span>
                            </h6>
                          </td>
                          <td className="align-middle">
                            <a href="#!" data-mdb-tooltip-init title="Done">
                              <i className="fas fa-check fa-lg text-success me-3"></i>
                            </a>
                            <a href="#!" data-mdb-tooltip-init title="Remove">
                              <i className="fas fa-trash-alt fa-lg text-warning"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* end of offcanvas */}
        </div>
        {/* </div> */}
      </div>
      <div className="container-fluid ">
        <div className="row mb-3 mt-2">
          {/* start Application */}
          <div className="col-md-8 ">
            <div className="card mb-3">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Application
                    </button>
                  </h2>
                  {application && Object.keys(application).length !== 0 ? (
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Application ID</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.id}
                            {/* course_id */}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">course_id</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.course_id}
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">branch_id</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.branch_id}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Application Date</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.applied_date}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Application Comments</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.comments}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Application Reviewed By</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.reviewed_by}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Application Reviewed At</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {application && application.reviewed_at}
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  ) : (
                    <div>No data found</div>
                  )}
                </div>
              </div>
            </div>
            {/* start activity  */}
            <div>
              <div className="d-flex justify-content-between mb-3 mt-2">
                {/* start drop down for Ascending/Descding */}
                <div className="col-12 d-flex m-2 bg-white p-2 rounded shadow-sm border">
                  <div class="d-flex text-center">Activity</div>

                  <div className="dropdown ms-auto ">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="orderDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {ascendingOrder ? "Ascending" : "Descending"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="orderDropdown"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => toggleOrder(true)}
                        >
                          Ascending
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => toggleOrder(false)}
                        >
                          Descending
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* end drop down for Ascending/Descding */}
                  {/* drop down for status */}

                  <div className="dropdown ms-2">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="statusDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedStatus || "Select Status"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="statusDropdown"
                    >
                      {statusOptions.map((status, index) => (
                        <li key={index}>
                          <button
                            className="dropdown-item"
                            onClick={() => handleStatusSelect(status)}
                          >
                            {status}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* end drop down for status */}

                  {/* drop down for users */}

                  <div className="dropdown ms-2 me-2">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedUser || "Select User"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="userDropdown"
                    >
                      {userOptions.map((user, index) => (
                        <li key={index}>
                          <button
                            className="dropdown-item"
                            onClick={() => handleUserSelect(user)}
                          >
                            {user}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* end drop down for users */}
                </div>
              </div>
              <ul className="timeline bg-white pe-2 rounded shadow-sm border">
                {sortedActivityData
                  .slice(0, displayCount)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="feed-item border-bottom pb-3 mb-3"
                    >
                      <div className="d-flex align-items-center justify-content-start">
                        {item.status === "created" ? (
                          <i className="fas fa-file fa-2x"></i>
                        ) : (
                          <i className="fas fa-edit fa-2x"></i>
                        )}

                        <div className="ms-3 activityusertext d-flex flex-column">
                          <div className="d-flex justify-content-between ">
                            <b>
                              <span className="ms-2 text-nowrap">
                                {item.userName}
                              </span>
                            </b>
                            <span className="ms-auto">{item.date}</span>
                          </div>
                          <div className="description ms-2">
                            {item.description}
                          </div>

                          <div className="ms-2 d-flex justify-content-between align-items-center">
                            <div className="nowrap">
                              <i
                                className="fa fa-file-pdf fa-2x"
                                aria-hidden="true"
                              ></i>
                              <a
                                className="link-opacity-50-hover"
                                href={item.fileURL}
                                target="_blank"
                              >
                                <span className="ms-2">{item.fileName}</span>
                              </a>
                              <span className="ms-2">{item.fileSize}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
              {displayCount < activityData.length && (
                <button
                  onClick={handleLoadMore}
                  className="btn btn-outline-secondary"
                >
                  Load More
                </button>
              )}
            </div>
            {/* end of activity */}
          </div>
          {/* End of start Application */}
          {/* upload documents */}
          <div className="col-md-4 ">
            <div className="bg-white p-5 rounded shadow-sm border">
              <div className="dropzone d-block">
                <label htmlFor="files" className="dropzone-container">
                  <div className="file-icon">
                    <i className="fa-solid fa-file-circle-plus text-primary"></i>
                  </div>
                  <div className="text-center pt-3 px-5">
                    <p className="w-80 h5 text-dark fw-bold">
                      Drag your documents, photos or videos here to start
                      uploading.
                    </p>
                    <div className="hr-sect">or</div>
                    <button className="btn btn-primary mb-2">
                      Browse Files
                    </button>
                  </div>
                </label>
                <input
                  id="files"
                  name="files[]"
                  type="file"
                  className="file-input"
                />
              </div>
            </div>
            {/* start Attached documents */}
            <div className="bg-white p-5 rounded shadow-sm border mt-2 d-flex justify-content-start">
              <AttachedFiles />
            </div>

            {/* End Attached documents */}
          </div>
        </div>
      </div>

      {/* start news letters */}
      <div className="container-fluid border bg-light mb-1 p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h5>
              <strong>Subscribe</strong>
            </h5>
            <h6 className="font-alt">
              Get weekly top new jobs delivered to your inbox
            </h6>
            <br />
            <br />

            <form className="form-subscribe" action="#">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control input-lg"
                  placeholder="Your email address"
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-primary btn-lg ms-2"
                    style={{
                      fontSize: "20px",
                      padding: "0.25rem 0.5rem",
                    }}
                    type="submit"
                  >
                    Subscribe
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* end of news letters */}
    </>
  );
};

export default StudentApplication;
