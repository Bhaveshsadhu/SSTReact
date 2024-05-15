import React, { useState, useEffect, useRef } from "react";
import {
  API_BASE_URL,
  MostAppliedFaculties_cardsPerPage,
  LANDING_PAGE_URL,
} from "../settings";
import { fetchDataFromAPI } from "./fetchDataFromAPI ";
import Card from "./Card";

const MostAppliedFaculties = ({ cachedData }) => {
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [totalPages, setTotalPages] = useState(0);
  const [allCardsData, setAllCardsData] = useState([]);
  const Img = "assets/img/most.png";

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(autoSlide, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["largeScreen"]);
    } else if (screenWidth >= 768) {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["mediumScreen"]);
    } else if (screenWidth >= 576) {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["smallScreen"]);
    } else {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["extraSmallScreen"]);
    }
  };

  const fetchData = () => {
    setLoading(true);

    if (cachedData) {
      console.log("This is call for MostappliedFaculties :Cached data");
      setAllCardsData(cachedData.popularFaculties);
      setTotalPages(
        Math.ceil(cachedData.popularFaculties.length / cardsPerRow)
      );
      setLoading(false);
    } else {
      fetchDataFromAPI(LANDING_PAGE_URL, "GET")
        .then((data) => {
          if (data && Array.isArray(data.popularFaculties)) {
            cachedData = data;
            console.log("This is call for MostappliedFaculties :API CALL");
            setAllCardsData(data.popularFaculties);
            setTotalPages(
              Math.ceil(data.popularFaculties.length / cardsPerRow)
            );
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  };

  const autoSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  };

  const renderCards = () => {
    if (loading) {
      return null; // You can render a loading indicator here if needed
    }
    if (!allCardsData) {
      return null;
    }
    const startIndex = activeIndex * cardsPerRow;
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

  return (
    <div className="container mx-auto mt-5 scrollable-container">
      <div className="row">
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-primary mb-3 me-1 justify-content-start"
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0} // Disable if activeIndex is 0
            >
              <i className="fa fa-arrow-left"></i>
            </button>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <h3 className="mb-4 text-primary">Most Applied Faculties</h3>
          </div>
          <div className="col-4 d-flex justify-content-end">
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

        {/* <div className="col-md-6">
          <h3 className="mb-4 text-primary">Most Applied Faculties</h3>
        </div> */}
        <div className="col-md-6 d-flex justify-content-end align-items-center"></div>
      </div>
      <div className="row g-4" ref={containerRef}>
        {renderCards()}
      </div>
    </div>
  );
};

export default MostAppliedFaculties;
