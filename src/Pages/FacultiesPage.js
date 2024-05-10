import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, DEBUG_MODE } from "../settings";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";

const FacultiesPage = () => {
  const title = "Most Popular Courses";
  const [cardsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allCardsData, setAllCardsData] = useState([]);
  const { id } = useParams();
  // const Img = "assets/img/courses.jpg";
  const Img = "/assets/img/courses.jpg";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // console.log("this is facultiesPage");
    fetchDataFromAPI(API_BASE_URL + "/facultyCategory/" + id + "/courses")
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setAllCardsData(response.data);
          setTotalPages(Math.ceil(response.length / cardsPerPage));
        } else {
          console.error("Data is empty or not in expected format.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, allCardsData.length);
    const cardsToShow = allCardsData.slice(startIndex, endIndex);

    return cardsToShow.map((card, index) => (
      <div key={index} className="col mb-4 position-relative">
        <div
          className="card h-100 hover-card"
          style={{ transition: "all 0.3s ease" }}
        >
          {/* bootstrap ribbon */}
          <div class="mpribbon">
            <span>New</span>
          </div>
          {/* End bootstrap ribbon */}
          <img src={Img} className="card-img-top" alt="..." />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold" style={{ fontSize: "1.25rem" }}>
              {card.name.length > 20
                ? `${card.name.substring(0, 20)}...`
                : card.name}
            </h5>
            <p className="card-text" style={{ fontSize: "0.875rem" }}>
              {card.description !== null && card.description.length > 100
                ? `${card.description.substring(0, 100)}...`
                : card.description}
            </p>
            <hr class="my-0" />
            <div className="align-items-end">
              <div className=" d-flex gap-2 mb-2  justify-content-center">
                <div className="flex-grow-1 text-center ">
                  <strong className=" text-dark">{card.faculty.id}</strong>
                </div>

                <div className="flex-grow-1 text-center ">
                  <strong className="text-dark">{card.level}</strong>
                </div>
              </div>
              <hr class="my-0" />
              <div className="d-flex justify-content-between mb-3">
                <h6 className="mb-0 text-warning">Delivery</h6>
                <h6 className=" mb-0 text-warning">{card.deliveryMode}</h6>
              </div>
              <hr class="my-0" />
            </div>

            <strong className=" text-dark">{card.faculty.id}</strong>
            <a
              href={`/courses/${card.id}/${encodeURIComponent(title)}`}
              className="btn btn-primary mt-auto align-self-center"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 5; // Number of pagination links to display

    paginationItems.push(
      <li
        key="prev"
        className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}
      >
        <a
          className="page-link"
          href="#"
          onClick={(event) => handlePaginationClick(currentPage - 1, event)}
          tabIndex="-1"
          aria-disabled="true"
        >
          Previous
        </a>
      </li>
    );

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start and end page numbers if necessary
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(event) => handlePaginationClick(i, event)}
          >
            {i}
          </a>
        </li>
      );
    }

    paginationItems.push(
      <li
        key="next"
        className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
      >
        <a
          className="page-link"
          href="#"
          onClick={(event) => handlePaginationClick(currentPage + 1, event)}
        >
          Next
        </a>
      </li>
    );

    return paginationItems;
  };

  const handlePaginationClick = (page, event) => {
    event.preventDefault(); // Prevent default behavior of reloading the page
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      {/* <h3 className="mb-4 text-center text-primary">Most Popular Courses</h3> */}
      {/* <h3 className="mb-4 text-center text-primary">Most Popular Courses</h3> */}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
        {renderCards()}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  );
};

export default FacultiesPage;
