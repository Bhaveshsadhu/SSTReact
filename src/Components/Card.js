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

        <p className="card-text ">
          {card.description &&
          card.description !== null &&
          card.description.length > 100
            ? `${card.description.substring(0, 70)}...`
            : card.description}
        </p>

        {card.faculty && (
          <>
            <div className="align-items-center">
              <div className="d-flex flex-column align-items-center">
                <div className="badge rounded-pill text-bg-primary text-center mb-1">
                  {card.faculty &&
                    card.faculty.faculty_category &&
                    card.faculty.faculty_category.facultyName}
                  {card.faculty && card.faculty.name && card.faculty.name}
                </div>
                <div className="badge rounded-pill text-bg-primary text-center mb-3">
                  {card.level}
                </div>
              </div>

              {/* old desing */}
              <div className="card-section3 bg-primary-subtle text-primary border-1 rounded-4 text-center p-2 mb-2">
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="mb-0">
                      <strong className="mb-1">Delivery</strong>
                      <p className="ms-2 mb-0 text-muted">
                        {/* <strong className="mb-1">Delivery</strong> */}
                        <ul
                          className="list-unstyled mb-0"
                          // style={{ listStyleType: "disc" }}
                        >
                          {card.deliveryMode.map((mode, index) => (
                            <li key={index} className="text-muted">
                              {mode}
                            </li>
                          ))}
                        </ul>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <div className="mb-0">
                      {/* <p>
                        <strong>Duration</strong>
                      </p> */}
                      <strong>Duration</strong>
                      <p className="mb-0 text-muted mb-2">
                        {card.duration.name} ({card.duration.time} months)
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-0">
                      {/* <p>
                        <strong>Type</strong>
                      </p> */}
                      <strong>Type</strong>
                      <p className="mb-0 text-muted">
                        <ul
                          className="list-unstyled mb-0"
                          // style={{ listStyleType: "disc" }}
                        >
                          {card.type.map((typeItem, index) => (
                            <li key={index}>{typeItem}</li>
                          ))}
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End old desing */}
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
