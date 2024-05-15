import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { fetchDataFromAPI } from "./fetchDataFromAPI ";
import { API_BASE_URL, LANDING_PAGE_URL, megamenuConfig } from "../settings";
import { useCache } from "../Components/CacheContext";

const FacultyDropdown = ({ cachedData }) => {
  const [faculties, setFaculties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const history = useHistory();
  const { CACHE_KEY, CACHE_EXPIRATION_TIME, setCachedData, getCachedData } =
    useCache();
  // const [cachedDT, setCachedDT] = useState("");
  const [cacheExpired, setCacheExpired] = useState(false);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setLoading(true);

        cachedData = getCachedData();
        if (cachedData) {
          console.log("This is call for FacultyDropDown : Cached data");
          setFaculties(
            cachedData.allFacultyCategories.map((faculty) => ({
              id: faculty.id,
              name: faculty.name,
              imageUrl: faculty.imageUrl,
            }))
          );
        } else {
          // console.log("calling API : ");
          console.log("This is call for FacultyDropDown : API CALL");
          fetchData();
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [cachedData]);

  const fetchData = () => {
    setLoading(true); // Set loading state to true

    fetchDataFromAPI(LANDING_PAGE_URL)
      .then((data) => {
        // Update cached data
        setCachedData(data);

        // Update state with fetched data
        // setCachedDT(data);

        // Extract and set faculties data
        setFaculties(
          data.allFacultyCategories.map((faculty) => ({
            id: faculty.id,
            name: faculty.name,
            imageUrl: faculty.imageUrl,
          }))
        );

        // Reset loading state and cache expiration status
        setLoading(false);
        setCacheExpired(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
        setLoading(false); // Reset loading state
      });
  };

  const handleSelectFaculty = (faculty) => {
    if (faculty && faculty.id) {
      history.push(`/facultyCategory/${faculty.id}/courses`);
    } else {
      console.error("Invalid faculty object:", faculty);
    }
  };

  const totalPages = Math.ceil(
    faculties.length / megamenuConfig.facultiesPerPage
  );

  const handleNextPage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const renderLoader = () => {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  return (
    <ul className="dropdown-menu p-0 faculty-dropdown-menu" ref={dropdownRef}>
      <div className="container-fluid position-relative">
        <div className=" text-end ms-auto mt-1 mb-0">
          <button
            className="btn btn-primary mb-3 me-1"
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <i className="fa fa-arrow-left"></i>
          </button>

          <button
            className="btn btn-primary mb-3"
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>

        <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 g-2 m-2">
          {loading ? (
            <div className="col text-center">{renderLoader()}</div>
          ) : (
            faculties
              .slice(
                currentPage * megamenuConfig.facultiesPerPage,
                (currentPage + 1) * megamenuConfig.facultiesPerPage
              )
              // .map((faculty) => (
              //   <div
              //     key={faculty.id}
              //     onClick={() => handleSelectFaculty(faculty)}
              //     className="bg-light rounded p-3 eachfaculty"
              //     style={{
              //       backgroundImage: `url(${faculty.imageUrl})`,
              //       backgroundSize: "cover",
              //       backgroundPosition: "center",
              //       color: "black",
              //     }}
              //   >
              //     {faculty.name}
              //   </div>
              // ))
              .map((faculty) => {
                // console.log(
                //   "Faculty:",
                //   faculty.id,
                //   faculty.name,
                //   faculty.imageUrl
                // ); // Log faculty details
                return (
                  <div
                    key={faculty.id}
                    onClick={() => handleSelectFaculty(faculty)}
                    className="bg-light rounded p-3 eachfaculty"
                    style={{
                      backgroundImage: `url(${faculty.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      color: "black",
                    }}
                  >
                    {faculty.name}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </ul>
  );
};

export default FacultyDropdown;
