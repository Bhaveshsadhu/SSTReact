import React, { useState, useEffect } from "react";
import {
  API_BASE_URL,
  FeaturedCourses_cardsPerPage,
  LANDING_PAGE_URL,
} from "../settings";
import { fetchDataFromAPI } from "./fetchDataFromAPI ";
import Card from "./Card";
// const cachedData = {};
const FeaturedCourses = ({ cachedData }) => {
  const title = "Most Popular Courses";
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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
      setCardsPerRow(FeaturedCourses_cardsPerPage["largeScreen"]); // Large screen
    } else if (screenWidth >= 768) {
      setCardsPerRow(FeaturedCourses_cardsPerPage["mediumScreen"]); // Medium screen
    } else if (screenWidth >= 576) {
      setCardsPerRow(FeaturedCourses_cardsPerPage["smallScreen"]); // Small screen
    } else {
      setCardsPerRow(FeaturedCourses_cardsPerPage["extraSmallScreen"]); // Extra small screen
    }
  };

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
      setAllCardsData(cachedData.featuredCourses);
      setTotalPages(Math.ceil(cachedData.featuredCourses.length / cardsPerRow));
      setLoading(false);
      // Print message indicating data is from cache
      console.log("This is calling from FEATUREDCOURSES_Data : Cached Data");
    } else {
      // Data is not cached, fetch it from API
      fetchDataFromAPI(LANDING_PAGE_URL, "GET")
        .then((data) => {
          if (data && Array.isArray(data.featuredCourses)) {
            // Cache the fetched data
            cachedData = data;
            setAllCardsData(data.featuredCourses);
            setTotalPages(Math.ceil(data.featuredCourses.length / cardsPerRow));
            setLoading(false);
            // Print message indicating data is from API
            console.log("This is calling from FEATUREDCOURSES_Data : API Data");
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
    const startIndex = activeIndex;
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

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? allCardsData.length - 3 : prevIndex - 3
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex >= allCardsData.length - 3 ? 0 : prevIndex + 3
    );
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="row">
        {/* <div class="d-md-flex justify-content-center align-items-center mb-4">
          <h6 class="section-title  text-center  px-3 mt-3">
            Featured Courses
          </h6>
        </div> */}
        <div className="col-md-6">
          <h3 className="mb-4 text-primary">Featured Courses</h3>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-primary mb-3 me-1"
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0} // Disable if activeIndex is 0
          >
            <i className="fa fa-arrow-left"></i>
          </button>
          <button
            className="btn btn-primary mb-3"
            type="button"
            onClick={handleNext}
            disabled={activeIndex >= allCardsData.length - cardsPerRow} // Disable if at last page
          >
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div className={`row g-4`}>{renderCards()}</div>
    </div>
  );
};

export default FeaturedCourses;
