import React, { useState, useEffect } from "react";
import { MostPopularCourses_cardsPerPage, LANDING_PAGE_URL } from "../settings";
import { fetchDataFromAPI } from "./fetchDataFromAPI ";

import Card from "./Card";
// const cachedData = {};
const MostPopularCourses = ({ cachedData }) => {
  const title = "Most Popular Courses";
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      setCardsPerRow(MostPopularCourses_cardsPerPage["largeScreen"]); // Large screen
    } else if (screenWidth >= 768) {
      setCardsPerRow(MostPopularCourses_cardsPerPage["mediumScreen"]); // Medium screen
    } else if (screenWidth >= 576) {
      setCardsPerRow(MostPopularCourses_cardsPerPage["smallScreen"]); // Small screen
    } else {
      setCardsPerRow(MostPopularCourses_cardsPerPage["extraSmallScreen"]); // Extra small screen
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allCardsData, setAllCardsData] = useState([]);
  const Img = "assets/img/courses.jpg";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    if (cachedData) {
      // Data is already cached, use it
      setAllCardsData(cachedData.popularCourses);
      setTotalPages(Math.ceil(cachedData.popularCourses.length / cardsPerRow));
      setLoading(false);
      // Print message indicating data is from cache
      console.log("This is calling from MOST_POPULAR_COURSES : Cached Data");
    } else {
      // Data is not cached, fetch it from API
      fetchDataFromAPI(LANDING_PAGE_URL, "GET")
        .then((data) => {
          console.log("This is calling from MOST_POPULAR_COURSES : API Data");
          if (data && Array.isArray(data.popularCourses)) {
            // Cache the fetched data
            // cachedData[LANDING_PAGE_URL] = data;
            cachedData = data;
            setAllCardsData(data.popularCourses);
            setTotalPages(Math.ceil(data.popularCourses.length / cardsPerRow));
            setLoading(false);
            // Print message indicating data is from API
            console.log("MOST_POPULAR_COURSES_Data is coming from API");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  };

  // const renderLoader = () => {
  //   return (
  //     <div className="d-flex justify-content-center mt-5">
  //       <div className="spinner-border text-primary" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // };

  const renderCards = () => {
    if (loading) {
      // return renderLoader();
    }
    if (!allCardsData) {
      return null;
    }
    const startIndex = (currentPage - 1) * cardsPerRow;
    const endIndex = Math.min(startIndex + cardsPerRow, allCardsData.length);
    const cardsToShow = allCardsData.slice(startIndex, endIndex);

    return cardsToShow.map((card, index) => (
      <div
        key={index}
        className={`col mb-4 position-relative col-${12 / cardsPerRow}`}
      >
        <Card card={card} Img={Img} />
      </div>
    ));
  };

  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 5;

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

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

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
    event.preventDefault();
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="col-md-6">
        <h3 className="mb-4  text-primary">Most Popular Courses</h3>
      </div>
      <div className={`row g-4`}>{renderCards()}</div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  );
};

export default MostPopularCourses;
