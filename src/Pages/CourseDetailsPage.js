import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_BASE_URL, DEBUG_MODE } from "../settings";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // const headers = new Headers();
        // headers.append("Accept", "application/json");
        // headers.append(
        //   "Public-Token",
        //   "743c7a15a3850459adb8c1b9e3bfc744ed3efe26c9d3d808fdf30c9c2fd5c09d"
        // );
        // console.log("course by id url : " + API_BASE_URL + `/courses/${id}`);
        // const response = await fetch(API_BASE_URL + `/courses/${id}`, {
        //   headers: headers,
        //   credentials: "include",
        // });
        const response = await fetchDataFromAPI(
          API_BASE_URL + `/courses/${id}`,
          "GET"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center text-primary">{cardData.courseName}</h3>

      <div className="row g-0">
        <div className="col-lg-6">
          <div className="card">
            <img
              src={`https://via.placeholder.com/150?text=${id}`}
              className="card-img-top"
              alt="Course Image"
              style={{ width: "100%", height: "50%" }}
            />
            <div className="card-body">
              <h5 className="card-title">{cardData.courseName}</h5>
              <p className="card-text">{cardData.courseDescription}</p>
              {/* <button className="btn btn-primary">Enroll Now</button> */}
              <Link to="/registration-form" className="btn btn-primary">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mt-3">
          <div className="container">
            <h3>Reviews</h3>
            <hr className="my-1" />

            <div className="d-flex flex-row reviews justify-content-between">
              <span>courseDelivery</span>
              <div className="rating">
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
              </div>
              <span>{cardData.courseDelivery}</span>
            </div>
            <hr className="my-1" />
            <div className="d-flex flex-row reviews justify-content-between">
              <span>courseCode</span>
              <div className="rating">
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
              </div>
              <span>{cardData.courseCode}</span>
            </div>
            <hr className="my-1" />
            <div className="d-flex flex-row reviews justify-content-between">
              <span>courseFees</span>
              <div className="rating">
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
              </div>
              <span>{cardData.courseFees}</span>
            </div>
            <hr className="my-1" />
            <div className="d-flex flex-row reviews justify-content-between">
              <span>courseLevel</span>
              <div className="rating">
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
                <a href="#">
                  <i className="fas fa-star"></i>
                </a>
              </div>
              <span>{cardData.courseLevel}</span>
            </div>
            <hr className="my-1" />
            {/* Repeat similar structure for other review sections */}
          </div>
          <div class="col-lg-12 mt-5 ms-3">
            <h3>Objectives</h3>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus
            et, commodi vitae sapiente esse laborum nulla enim impedit id. Enim
            blanditiis quae repudiandae, commodi non numquam sint distinctio
            voluptatum odit. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Excepturi delectus numquam quis maxime obcaecati ex, quos
            suscipit unde vitae! Enim ipsa quibusdam placeat corporis excepturi
            velit cum quisquam similique impedit! Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Cum totam pariatur iste odio nostrum
            autem cumque quis ex, veniam ullam possimus doloremque iusto
            explicabo perferendis deleniti atque minima delectus aperiam. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quam, dignissimos
            consequatur delectus atque corporis itaque quia magni cupiditate
            vitae? Autem, dolorum! Numquam cupiditate, sapiente quas fuga sed
            quo eius quisquam!
          </div>
        </div>
      </div>
      <div class="col-lg-12 mt-5 ms-3">
        <h3>Eligibility</h3>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus et,
        commodi vitae sapiente esse laborum nulla enim impedit id. Enim
        blanditiis quae repudiandae, commodi non numquam sint distinctio
        voluptatum odit.
        <ul>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, minima!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, minima!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, minima!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, minima!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, minima!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
