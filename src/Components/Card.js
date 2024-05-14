import React from "react";
import NewRibbon from "./NewRibbon";
import FeaturedRibbon from "./FeaturedRibbon";

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
        {card.facultyCategory && (
          <a
            href={`/facultyCategory/${card.facultyCategory.id}/courses`}
            className="btn btn-primary mt-auto align-self-center"
          >
            Read More
          </a>
        )}
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
              <div className="card-section3 bg-primary-subtle text-primary border-1 rounded-4 text-center p-1 mb-2">
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="delievery">
                      <a
                        href="#"
                        id="delieveryMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="profile-link ms-2"
                      >
                        <img
                          href="#"
                          id="delieveryMenuLink"
                          src="/assets/img/online-learning.png"
                          height={50}
                          width={50}
                          alt="Delivery Mode"
                          title="Delivery Mode"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end m-3 p-3"
                        aria-labelledby="delieveryMenuLink"
                      >
                        <strong>Delievery Modes</strong>
                        <ul
                          className="list-unstyled mb-0 p-3"
                          style={{
                            display: "flex",
                            listStyle: "none",
                            padding: 0,
                          }}
                        >
                          {card.deliveryMode.map((mode, index) => (
                            <li
                              key={index}
                              className="text-muted"
                              style={{ marginRight: "10px" }}
                            >
                              {mode.toUpperCase() === "ONLINE" && (
                                <img
                                  src="/assets/img/online-course.png"
                                  height={50}
                                  width={50}
                                  alt={mode}
                                  title={mode}
                                />
                              )}
                              {mode.toUpperCase() === "HYBRID" && (
                                <img
                                  src="/assets/img/webinar.png"
                                  height={50}
                                  width={50}
                                  alt={mode}
                                  title={mode}
                                />
                              )}
                              {mode.toUpperCase() === "IN-CLASS" && (
                                <img
                                  src="/assets/img/training.png"
                                  height={50}
                                  width={50}
                                  alt={mode}
                                  title={mode}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="col-md-4 ">
                    <div className="mb-0">
                      <strong>Duration</strong>
                      <p className="mb-0 text-muted mb-2">
                        {card.duration.name} ({card.duration.time} months)
                      </p>
                    </div>
                  </div> */}
                  <div className="col-md-4 ">
                    <div className="delievery">
                      <a
                        href="#"
                        id="delieveryMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="profile-link ms-2"
                      >
                        <img
                          href="#"
                          id="delieveryMenuLink"
                          src="/assets/img/in-process.png"
                          height={50}
                          width={50}
                          alt="Duration"
                          title="Duration"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end m-3 p-3"
                        aria-labelledby="delieveryMenuLink"
                      >
                        <strong>Duration</strong>

                        <ul
                          className="list-unstyled mb-0 p-3"
                          style={{
                            display: "flex",
                            listStyle: "none",
                            padding: 0,
                          }}
                        >
                          {card.deliveryMode.map((mode, index) => (
                            <li
                              key={index}
                              className="text-muted"
                              style={{ marginRight: "10px" }}
                            >
                              {/* {
                                Math.floor(card.duration.time / 12);//year
                                (card.duration.time % 12);//Remaining Months
                              } */}
                              {mode.toUpperCase() === "IN-CLASS" && (
                                <img
                                  src="/assets/img/training.png"
                                  height={50}
                                  width={50}
                                  alt={mode}
                                  title={mode}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-4 ">
                    <div className="delievery">
                      <a
                        href="#"
                        id="delieveryMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="profile-link ms-2"
                      >
                        <img
                          href="#"
                          id="delieveryMenuLink"
                          src="/assets/img/part-time.png"
                          height={50}
                          width={50}
                          alt="Type"
                          title="Type"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end m-3 p-3 "
                        aria-labelledby="delieveryMenuLink"
                      >
                        <strong>Type</strong>
                        <ul
                          className="list-unstyled mb-0 p-3"
                          style={{
                            display: "flex",
                            listStyle: "none",
                            padding: 0,
                          }}
                        >
                          {card.type.map((typeItem, index) => (
                            <li key={index} style={{ marginRight: "10px" }}>
                              {typeItem.toUpperCase() === "FULL-TIME" && (
                                <img
                                  src="/assets/img/working-hours.png"
                                  height={25}
                                  width={25}
                                  alt={typeItem}
                                  title={typeItem}
                                />
                              )}
                              {typeItem.toUpperCase() === "PART TIME" && (
                                <img
                                  src="/assets/img/part-time.png"
                                  height={25}
                                  width={25}
                                  alt={typeItem}
                                  title={typeItem}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* End old desing */}
            </div>
            <a
              href={`/courses/${card.id}`}
              className="btn btn-primary mt-auto align-self-center"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
