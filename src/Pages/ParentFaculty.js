import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiCall } from "../Components/ApiCall";
import Card from "../Components/Card";
import LoadingSpinner from "../Components/LoadingSpinner"; // Assuming you have a LoadingSpinner component
import {
  API_BASE_URL,
  MostPopularCourses_cardsPerPage,
  allCourses,
} from "../settings";
let facultyName = "";
const ParentFaculty = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { facultyId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allCardsData, setAllCardsData] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(4);

  const Img = "../assets/img/courses.jpg";

  useEffect(() => {
    fetchData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = () => {
    ApiCall(allCourses)
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          const filteredData = data.data.filter(
            (item) => item.faculty_id === parseInt(facultyId)
          );
          setAllCardsData(filteredData);

          facultyName = filteredData[0].faculty.faculty_category.facultyName;
          setTotalPages(Math.ceil(filteredData.length / cardsPerRow));
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      setCardsPerRow(MostPopularCourses_cardsPerPage["largeScreen"]);
    } else if (screenWidth >= 768) {
      setCardsPerRow(MostPopularCourses_cardsPerPage["mediumScreen"]);
    } else if (screenWidth >= 576) {
      setCardsPerRow(MostPopularCourses_cardsPerPage["smallScreen"]);
    } else {
      setCardsPerRow(MostPopularCourses_cardsPerPage["extraSmallScreen"]);
    }
  };

  const renderCards = () => {
    if (loading) {
      return <LoadingSpinner />;
    } else if (error || allCardsData.length === 0) {
      return <div className="no-data">No data</div>;
    } else {
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
    }
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
        <h3 className="mb-4 text-primary">{facultyName}</h3>
      </div>

      <div
        className={`row g-4 ${
          loading || error || allCardsData.length === 0
            ? "justify-content-center align-items-center"
            : ""
        }`}
      >
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

export default ParentFaculty;
