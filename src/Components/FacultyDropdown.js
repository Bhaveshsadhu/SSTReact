import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchDataFromAPI } from "./fetchDataFromAPI ";
import { LANDING_PAGE_URL, megamenuConfig } from "../settings";
import { useCache } from "../Components/CacheContext";

const FacultyDropdown = () => {
  const [faculties, setFaculties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { CACHE_KEY, setCachedData, getCachedData } = useCache();

  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchFaculties = async () => {
      if (hasFetchedData.current) {
        return;
      }
      hasFetchedData.current = true;

      setLoading(true);
      try {
        let cachedData = getCachedData();
        if (cachedData) {
          console.log("This is call for FacultyDropDown: Cached data");
          setFaculties(
            cachedData.allFacultyCategories.map((faculty) => ({
              id: faculty.id,
              name: faculty.name,
              imageUrl: faculty.imageUrl,
            }))
          );
        } else {
          console.log("This is call for FacultyDropDown: API CALL");
          const data = await fetchDataFromAPI(LANDING_PAGE_URL);
          setCachedData(data);
          setFaculties(
            data.allFacultyCategories.map((faculty) => ({
              id: faculty.id,
              name: faculty.name,
              imageUrl: faculty.imageUrl,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [getCachedData, setCachedData]);

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
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const renderLoader = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <ul className="dropdown-menu p-0 faculty-dropdown-menu">
      <div className="container-fluid position-relative">
        <div className="text-end ms-auto mt-1 mb-0">
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
              .map((faculty) => (
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
              ))
          )}
        </div>
      </div>
    </ul>
  );
};

export default FacultyDropdown;
