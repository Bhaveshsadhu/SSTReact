import React from "react";
import NewRibbon from "./NewRibbon";
import FeaturedRibbon from "./FeaturedRibbon"; // Ensure you have the correct path to FeaturedRibbon component

const Card = ({ card, Img }) => {
  return (
    <div className="card h-100 hover-card">
      <NewRibbon createdAt={card.created_at} />
      <FeaturedRibbon isFeatured={card.isFeatured} />
      <img src={Img} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold" title={card.courseName}>
          {!card.courseName ||
          card.courseName === "" ||
          card.courseName === undefined
            ? card.name
            : card.courseName}
        </h5>
        {/* for faculty  */}

        {card.faculty_category && (
          <h5 className="card-title fw-bold mb-1">
            {card.faculty_category.facultyName &&
            typeof card.faculty_category.facultyName === "string" &&
            card.faculty_category.facultyName.length > 20
              ? `${card.faculty_category.facultyName.substring(0, 30)}`
              : card.faculty_category.facultyName}
          </h5>
        )}

        {card.faculty_category &&
          card.faculty_category.shortFacultyDescription && (
            <p
              className="card-text flex-grow-1"
              style={{ fontSize: "0.875rem" }}
            >
              {card.faculty_category.shortFacultyDescription.length > 100
                ? `${card.faculty_category.shortFacultyDescription.substring(
                    0,
                    100
                  )}...`
                : card.faculty_category.shortFacultyDescription}
            </p>
          )}

        <p className="card-text mt-auto">
          {card.courseDescription &&
          card.courseDescription !== null &&
          card.courseDescription.length > 100
            ? `${card.courseDescription.substring(0, 70)}...`
            : card.courseDescription}
        </p>
        <p className="card-text mt-auto">
          {card.shortDescription &&
          card.shortDescription !== null &&
          card.shortDescription.length > 100
            ? `${card.shortDescription.substring(0, 70)}...`
            : card.shortDescription}
        </p>
        <p className="card-text mt-auto">
          {card.shortCourseDescription &&
          card.shortCourseDescription !== null &&
          card.shortCourseDescription.length > 100
            ? `${card.shortCourseDescription.substring(0, 70)}...`
            : card.shortCourseDescription}
        </p>
        {/* <p className="pb-3">{card.level}</p> */}
        {/* <hr className="mt-auto" /> */}
        {card.faculty && (
          <>
            <hr />
            <div className="align-items-end">
              <table className="table table-borderless">
                <tbody>
                  {(card.faculty.faculty_category || card.faculty.name) && (
                    <tr>
                      <th scope="row" className="px-0 pb-1">
                        <i className="fa fa-laptop-code fa-lg"></i>
                      </th>

                      {/* <th scope="row" className="px-0 pb-1">
                      <i className="fa fa-laptop-code fa-lg "></i>
                    </th> */}

                      <td className="pb-3 ">
                        {card.faculty &&
                          card.faculty.faculty_category &&
                          card.faculty.faculty_category.facultyName}
                        {card.faculty && card.faculty.name && card.faculty.name}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row" className="px-0  pt-2">
                      <i className="fa fa-graduation-cap fa-lg "></i>
                    </th>
                    <td className="pb-3">
                      {card.courseLevel}
                      {card.level}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="d-flex justify-content-between pt-2 text-center text-uppercase living-coral-text">
                <div>
                  {card.courseDelivery &&
                    (() => {
                      const courseDeliveryUpperCase =
                        card.courseDelivery.toUpperCase();
                      let iconClassName = "";
                      let deliveryMethod = "";

                      if (courseDeliveryUpperCase === "ON-CAMPUS") {
                        iconClassName = "fa fa-users fa-lg ";
                        deliveryMethod = "ON-CAMPUS";
                      } else if (courseDeliveryUpperCase === "HYBRID") {
                        iconClassName = "fa fa-exchange fa-lg ";
                        deliveryMethod = "Hybrid";
                      } else if (courseDeliveryUpperCase === "ONLINE") {
                        iconClassName = "fa fa-desktop fa-lg ";
                        deliveryMethod = "Online";
                      }

                      return (
                        <div>
                          <i className={iconClassName}></i>
                          <p className="mb-0">{deliveryMethod}</p>
                        </div>
                      );
                    })()}
                  {card.delivery &&
                    (() => {
                      const courseDeliveryUpperCase =
                        card.delivery.toUpperCase();
                      let iconClassName = "";
                      let deliveryMethod = "";

                      if (courseDeliveryUpperCase === "ON-CAMPUS") {
                        iconClassName = "fa fa-users fa-lg ";
                        deliveryMethod = "ON-CAMPUS";
                      } else if (courseDeliveryUpperCase === "HYBRID") {
                        iconClassName = "fa fa-exchange fa-lg ";
                        deliveryMethod = "Hybrid";
                      } else if (courseDeliveryUpperCase === "ONLINE") {
                        iconClassName = "fa fa-desktop fa-lg ";
                        deliveryMethod = "Online";
                      }

                      return (
                        <div>
                          <i className={iconClassName}></i>
                          <p className="mb-0">{deliveryMethod}</p>
                        </div>
                      );
                    })()}
                </div>
                <div>
                  {(card.duration.durationName || card.duration.name) && (
                    <>
                      <i className="fas fa-clock-cap fa-lg"></i>
                      <p className="">
                        {card.duration.durationName}
                        {card.duration.name}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  {(card.duration.type || card.type) && (
                    <>
                      <i className="fas fa-calendar fa-lg"></i>
                      <p className="">
                        {card.duration.type}
                        {card.type}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <a
          href={`/courses/${card.id}`}
          className="btn btn-primary mt-auto align-self-center"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;
