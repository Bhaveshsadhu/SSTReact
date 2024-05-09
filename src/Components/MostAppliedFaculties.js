import React, { useState, useEffect, useRef } from "react";
import {
  API_BASE_URL,
  MostAppliedFaculties_cardsPerPage,
  LANDING_PAGE_URL,
} from "../settings";
import { fetchDataFromAPI } from "./fetchDataFromAPI ";
import Card from "./Card";
// const cachedData = {};
const MostAppliedFaculties = ({ cachedData }) => {
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
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
    if (autoSlideInterval) {
      const interval = setInterval(autoSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [autoSlideInterval]);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["largeScreen"]); // Large screen
    } else if (screenWidth >= 768) {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["mediumScreen"]); // Medium screen
    } else if (screenWidth >= 576) {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["smallScreen"]); // Small screen
    } else {
      setCardsPerRow(MostAppliedFaculties_cardsPerPage["extraSmallScreen"]); // Extra small screen
    }
  };

  const fetchData = () => {
    setLoading(true);

    if (cachedData) {
      // Data is already cached, use it
      setAllCardsData(cachedData.popularFaculties);
      setTotalPages(
        Math.ceil(cachedData.popularFaculties.length / cardsPerRow)
      );
      setLoading(false);
      // Print message indicating data is from cache
      console.log("This is calling from MOSTAPPLIEDFACULTY_Data : Cached Data");
    } else {
      // Data is not cached, fetch it from API
      fetchDataFromAPI(LANDING_PAGE_URL, "GET")
        .then((data) => {
          if (data && Array.isArray(data.popularFaculties)) {
            // Cache the fetched data
            cachedData = data;

            setAllCardsData(data.popularFaculties);
            setTotalPages(
              Math.ceil(data.popularFaculties.length / cardsPerRow)
            );
            setLoading(false);
            // Print message indicating data is from API
            console.log(
              "This is calling from MOSTAPPLIEDFACULTY_Data : API Data"
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  };

  // const autoSlide = () => {
  //   if (activeIndex < totalPages - 1) {
  //     setActiveIndex(activeIndex + 1);
  //   } else {
  //     setActiveIndex(0);
  //   }
  // };
  const autoSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
  };

  // const handleMouseMove = (e) => {
  //   if (!isDragging) return;
  //   const x = e.pageX - containerRef.current.offsetLeft;
  //   const deltaX = x - startX;
  //   if (deltaX < -50) {
  //     setActiveIndex((prevIndex) =>
  //       prevIndex >= totalPages - 1 ? 0 : prevIndex + 1
  //     );
  //     setIsDragging(false);
  //   } else if (deltaX > 50) {
  //     setActiveIndex((prevIndex) =>
  //       prevIndex === 0 ? totalPages - 1 : prevIndex - 1
  //     );
  //     setIsDragging(false);
  //   }
  // };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const deltaX = x - startX;

    // Determine the new active index
    let newActiveIndex = activeIndex;
    if (deltaX < -50) {
      newActiveIndex = Math.min(activeIndex + 1, totalPages - 1);
    } else if (deltaX > 50) {
      newActiveIndex = Math.max(activeIndex - 1, 0);
    }

    // Update the active index only if it changes and it's within bounds
    if (
      newActiveIndex !== activeIndex &&
      newActiveIndex >= 0 &&
      newActiveIndex < totalPages
    ) {
      setActiveIndex(newActiveIndex);
    }

    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
    <div
      className="container mx-auto mt-5 scrollable-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="row">
        <div className="col-md-6">
          <h3 className="mb-4  text-primary">Most Applied Faculties</h3>
        </div>
      </div>
      <div className={`row g-4`}>{renderCards()}</div>
    </div>
  );
};

export default MostAppliedFaculties;
