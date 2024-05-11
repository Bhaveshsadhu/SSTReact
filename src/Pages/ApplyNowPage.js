import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  StudentProfileURL,
  SessionDropdownURL,
  branchDropdownURL,
  ScholarshipsURL,
  createApplicationURL,
} from "../settings";
import { ApiCall } from "../Components/ApiCall";

function ApplyNow() {
  const [studentData, setStudentData] = useState(null);
  const location = useLocation();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const { cardData } = location.state;
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiCall(StudentProfileURL);
        // console.log("student data : " + data);
        const studentId = data.id;
        setStudentData(data);
      } catch (error) {
        console.error(error.message);
        // Handle error appropriately, e.g., set error state
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await ApiCall(SessionDropdownURL + cardData.id);
        // console.log("response : " + response);
        setSessions(response);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [cardData.id]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiCall(branchDropdownURL + cardData.id);
        setBranches(response);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, [cardData.id]);
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await ApiCall(ScholarshipsURL + cardData.id);
        setScholarships(response);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, [cardData.id]);
  const handleScholarshipChange = (event) => {
    setSelectedScholarship(event.target.value);
  };
  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };
  if (!studentData) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async () => {
    try {
      if (!selectedSession || !selectedBranch || !selectedScholarship) {
        const missingFields = [];
        if (!selectedSession) missingFields.push("Session");
        if (!selectedBranch) missingFields.push("Branch");
        if (!selectedScholarship) missingFields.push("Scholarship");

        window.alert(`Please select ${missingFields.join(", ")}.`);
        return;
      }
      const requestBody = {
        student_id: studentData.id,
        course_id: cardData.id,
        branch_id: selectedBranch,
        course_session_id: selectedSession,
        scholarship_id: selectedScholarship ? [selectedScholarship] : [],
      };

      const response = await ApiCall(createApplicationURL, "POST", {
        body: requestBody,
      });
      // console.log("Form data:", JSON.stringify(requestBody));
      // console.log("Response data:", JSON.stringify(response));

      if (response.success) {
        window.alert("Application submitted successfully!");
      } else {
        window.alert(response.message);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };
  return (
    <div className="container mt-2 mb-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <div className="white-box text-center">
                {/* <img
                  src="https://www.bootdey.com/image/430x600/00CED1/000000"
                  className="img-fluid"
                  alt="Chair"
                /> */}
              </div>
            </div>

            {/* student details */}
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
                          {studentData.studentId}
                        </p>
                        <p className="text-muted font-size-sm">
                          {studentData.address}
                        </p>
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
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {studentData.address}
                      </div>
                    </div>
                    <div className="m-3 row">
                      <div className="col-sm-9 text-secondary">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary"
                        >
                          Submit Your Application
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <tr>
                <td>
                  {/* session drop down */}
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle"
                      type="button"
                      id="sessionDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedSession
                        ? sessions.find(
                            (session) => session.id === selectedSession
                          )?.name
                        : "Select Session"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="sessionDropdown"
                    >
                      {sessions &&
                        sessions.map((session) => (
                          <li key={session.id}>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => setSelectedSession(session.id)}
                            >
                              {session.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* End Session Drop down */}
                </td>
                <td>
                  {/* branch drop down */}
                  <div className="dropdown m-2">
                    <button
                      className="btn btn-info dropdown-toggle"
                      type="button"
                      id="branchDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedBranch
                        ? branches.find(
                            (branch) => branch.id === selectedBranch
                          )?.name
                        : "Select Branch"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="branchDropdown"
                    >
                      {branches &&
                        branches.map((branch) => (
                          <li key={branch.id}>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => setSelectedBranch(branch.id)}
                            >
                              {branch.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* End branch drop down */}
                </td>

                <td>
                  {/* Scholarships drop down */}
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle"
                      type="button"
                      id="scholarshipDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedScholarship
                        ? scholarships.find(
                            (scholarship) =>
                              scholarship.id === selectedScholarship
                          )?.name
                        : "Select Scholarship"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="scholarshipDropdown"
                    >
                      {scholarships &&
                        scholarships.map((scholarship) => (
                          <li key={scholarship.id}>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                setSelectedScholarship(scholarship.id)
                              }
                            >
                              {scholarship.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* End Scholarships drop down */}
                </td>
              </tr>
            </div>
            {/* End student Details */}

            {/* course Details */}
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3 className="box-title mt-5">Course Information</h3>
              <div className="table-responsive">
                <table className="table table-striped table-product">
                  <tbody>
                    <tr>
                      <td width="390">Name</td>
                      <td>{cardData.name}</td>
                    </tr>
                    <tr>
                      <td>Code</td>
                      <td>{cardData.code}</td>
                    </tr>
                    <tr>
                      <td>Level</td>
                      <td>{cardData.level}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{cardData.description}</td>
                    </tr>

                    <tr>
                      <td>Delivery Modes</td>
                      <td>
                        <ul>
                          {cardData.deliveryMode.map((mode, index) => (
                            <li key={index}>{mode}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td>Scholarships</td>
                      <td>
                        <ul>
                          {cardData.scholarship.map((scholarship, index) => (
                            <li key={index}>
                              {scholarship.name} - Amount: ${scholarship.amount}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td>
                        {cardData.duration.name} ({cardData.duration.time}{" "}
                        months)
                      </td>
                    </tr>

                    <tr>
                      <td>Types</td>
                      <td>
                        <ul>
                          {cardData.type.map((type, index) => (
                            <li key={index}>{type}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Faculty Name</td>
                      <td>{cardData.faculty.name}</td>
                    </tr>
                    <tr>
                      <td>Head Of Department</td>
                      <td>{cardData.faculty.headOfDepartment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* End Course Details */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyNow;
