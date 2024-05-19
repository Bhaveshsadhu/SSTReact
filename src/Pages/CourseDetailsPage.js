import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API_BASE_URL, DEBUG_MODE } from "../settings";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";

const CourseDetailsPage = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetchDataFromAPI(
          API_BASE_URL + `/course/${id}`,
          "GET"
        );

        setCardData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleApplyNowClick = () => {
    console.log("Button Clicked and IsLogginIn is : " + isLoggedIn);
    if (isLoggedIn) {
      history.push({
        pathname: "/ApplyNow",
        state: { cardData: cardData },
      });
    } else {
      history.push("/login");
    }
  };

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-2 mb-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <div className="white-box text-center">
                <img
                  src="https://www.bootdey.com/image/430x600/00CED1/000000"
                  className="img-fluid"
                  alt="Chair"
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6">
              <h4 className="box-title mt-5">{cardData.name}</h4>
              <p>{cardData.description}</p>

              <button onClick={handleApplyNowClick} className="btn btn-primary">
                Apply Now
              </button>
              <h3 className="box-title mt-5">Key Highlights</h3>
              <ul className="list-unstyled">
                <li>
                  <strong>Delivery Modes:</strong>
                  <ul>
                    {cardData.deliveryMode.map((mode, index) => (
                      <li key={index}>{mode}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Scholarships:</strong>
                  <ul>
                    {cardData.scholarship.map((scholarship, index) => (
                      <li key={index}>
                        {scholarship.name} - Amount: ${scholarship.amount}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Duration:</strong> {cardData.duration.name} (
                  {cardData.duration.time} months)
                </li>
              </ul>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3 className="box-title mt-5">General Info</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
