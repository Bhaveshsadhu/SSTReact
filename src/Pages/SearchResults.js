import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchURL } from "../settings";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  // const [cachedData, setcachedData] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [originalData, setOriginalData] = useState([]); // State to hold original data
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    filterData(SearchURL + searchTerm);
  }, [searchTerm]);

  const filterData = (url) => {
    setLoading(true);
    fetchDataFromAPI(url)
      .then((data) => {
        // console.log("search result: " + JSON.stringify(data));
        if (data && data.courses && Array.isArray(data.courses.data)) {
          setOriginalData(data.courses.data);
          setFilteredData(data.courses.data); // Set filtered data
          setPaginationLinks(data.courses.links); // Set pagination links
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  const filter = (filters) => {
    let filtered = [...originalData]; // Make a copy of original data
    // console.log("city=" + filters.city);
    // console.log("mode=" + filters.mode);
    // console.log("Duration=" + filters.durations);

    // Apply filter based on selected city, mode, and duration
    filtered = filtered.filter((course) => {
      // Check if city and mode filters match
      const cityMatch = !filters.city || course.location === filters.city;
      const modeMatch = !filters.mode || course.mode === filters.mode;
      const durationMatch =
        !filters.durations ||
        filters.durations.length === 0 ||
        filters.durations.includes(course.duration);

      return cityMatch && modeMatch && durationMatch;
    });
    if (filtered.length === 0) {
      // If no data after filtering, display "No data"
      setFilteredData("No data");
      setPaginationLinks([]); // Empty pagination links
      return;
    }

    setFilteredData(filtered); // Set filtered data
    setPaginationLinks(filtered); // Update pagination links
  };

  const handleFilterChange = (city, mode) => {
    setSelectedCity(city);
    setSelectedMode(mode);
    filter({ city: city, mode: mode }); // Filter data based on selected city and mode
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    handleFilterChange(city, selectedMode);
  };

  const handleModeChange = (event) => {
    const mode = event.target.value;
    handleFilterChange(selectedCity, mode);
  };
  // Function to handle changes in duration selection
  const handleDurationChange = (event) => {
    const duration = event.target.value;
    const isChecked = event.target.checked;

    // Clone the current selected durations array
    let updatedDurations = [...selectedDurations];

    // If the checkbox is checked, add the duration to the array, otherwise remove it
    if (isChecked) {
      updatedDurations.push(duration);
    } else {
      updatedDurations = updatedDurations.filter((d) => d !== duration);
    }

    // Update the state with the new selected durations
    setSelectedDurations(updatedDurations);

    // Call the filter function with the updated durations
    filter({
      city: selectedCity,
      mode: selectedMode,
      durations: updatedDurations,
    });
  };

  const handlePageChange = (event, url) => {
    // console.log("Page URL:", url);
    event.preventDefault();
    filterData(url);
  };

  const handleSelectCityClick = (event) => {
    event.preventDefault();
    setSelectedCity("");
  };
  const handleselectedModeClick = (event) => {
    event.preventDefault();
    setSelectedMode("");
  };
  const handleselectedDurationsClick = (event) => {
    event.preventDefault();
    // const isChecked = event.target.checked;

    // if (isChecked) {
    //   selectedDurations.target.checked = false;
    // }

    setSelectedDurations([]);
  };

  // Pagination
  const renderPagination = () => {
    if (!paginationLinks || paginationLinks.length === 0) {
      return null;
    }

    const currentPageIndex = paginationLinks.findIndex((link) => link.active);
    const totalPages = paginationLinks.length;

    const renderPageItems = () => {
      const pagesToShow = Math.min(totalPages, 5); // Show up to 5 pages

      const startIndex = Math.max(
        0,
        Math.min(currentPageIndex - 2, totalPages - pagesToShow)
      );
      const endIndex = Math.min(totalPages, startIndex + pagesToShow);

      const pageItems = [];

      // Render "Previous" button
      pageItems.push(
        <li
          key="previous"
          className={`page-item ${currentPageIndex === 0 ? "disabled" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(event) =>
              currentPageIndex !== 0 &&
              handlePageChange(
                event,
                paginationLinks[currentPageIndex - 1]?.url
              )
            }
          >
            Previous
          </a>
        </li>
      );
      for (let i = startIndex + 1; i < endIndex - 1; i++) {
        // for (let i = startIndex; i < endIndex; i++) {
        const link = paginationLinks[i];
        pageItems.push(
          <li
            key={i}
            className={`page-item ${link.active ? "active" : ""}`}
            onClick={(event) =>
              !link.active && handlePageChange(event, link.url)
            }
          >
            <a className="page-link" href="#">
              {link.label.replace(/&laquo; |&raquo;/g, "")}
            </a>
          </li>
        );
      }

      // Render "Next" button
      pageItems.push(
        <li
          key="next"
          className={`page-item ${
            currentPageIndex === totalPages - 1 ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(event) =>
              currentPageIndex !== totalPages - 1 &&
              handlePageChange(
                event,
                paginationLinks[currentPageIndex + 1]?.url
              )
            }
          >
            Next
          </a>
        </li>
      );

      return pageItems;
    };

    return (
      <div className="d-flex justify-content-center mt-5">
        <ul className="pagination">{renderPageItems()}</ul>
      </div>
    );
  };

  return (
    <div className="container mb-5">
      {loading && ( // Display loading spinner if loading is true
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-3 text-center mt-3 border-bottom">
          <h3>Search Result for : {searchTerm}</h3>
          {/* {filteredData ? <div>something</div> : <div>empty</div>}
          {selectedCity ? (
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={handleSelectCityClick}
            >
              {selectedCity} <span className="badge text-bg-secondary">X</span>
            </button>
          ) : null}
          {selectedMode ? (
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={handleselectedModeClick}
            >
              {selectedMode} <span className="badge text-bg-secondary">X</span>
            </button>
          ) : null}
          {selectedDurations.length != 0 ? (
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={handleselectedDurationsClick}
            >
              {selectedDurations}{" "}
              <span className="badge text-bg-secondary">X</span>
            </button>
          ) : null} */}
        </div>
        {/* BEGIN SEARCH RESULT */}
        <div className="col-md-12">
          <div className="grid search">
            <div className="grid-body">
              <div className="row">
                {/* BEGIN FILTERS */}
                <div className="col-md-3 mt-5">
                  <h2 className="grid-title">
                    <i className="fas fa-filter"></i> Filters
                  </h2>
                  <hr />

                  <div className="form-check">
                    <div>
                      <h4>By Location:</h4>
                      <select
                        id="australian-cities"
                        value={selectedCity}
                        onChange={handleCityChange}
                      >
                        <option value="">Select City</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Brisbane">Brisbane</option>
                        <option value="Perth">Perth</option>
                      </select>
                    </div>

                    <hr />
                    <div>
                      <h4>By Mode:</h4>
                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            value="full-time"
                            checked={selectedMode === "full-time"}
                            onChange={handleModeChange}
                          />
                          Full Time Course
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            value="part-time"
                            checked={selectedMode === "part-time"}
                            onChange={handleModeChange}
                          />
                          Part Time Course
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h4>By Duration:</h4>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="6 Months"
                            onChange={handleDurationChange}
                          />{" "}
                          6 Months
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="1 Year"
                            onChange={handleDurationChange}
                          />{" "}
                          1 Year
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="2 Year"
                            onChange={handleDurationChange}
                          />{" "}
                          2 Year
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Add more filters here */}
                </div>
                {/* END FILTERS */}

                {/* BEGIN RESULT */}
                <div className="col-md-9">
                  <div className="container">
                    {filteredData === "No data" ? (
                      <div className="no-data-message">No data</div>
                    ) : (
                      filteredData.map((course, index) => (
                        <div
                          key={index}
                          className="row mt-5 m-2 p-2 border-bottom border-secondary"
                        >
                          <div className="col-lg-12">
                            <p className="searchCourseName">
                              <a
                                className="link-opacity-50-hover"
                                href={`/courses/${course.id}`}
                              >
                                {course.courseName}
                              </a>
                            </p>
                            <p>{course.courseDescription}</p>
                          </div>
                          <div className="col-lg-12 searchLinks primary">
                            <div className="row">
                              <div
                                className="col-md-6 col-lg-2"
                                title="Course Code"
                              >
                                <p>{course.courseCode}</p>
                              </div>
                              <div
                                className="col-md-6 col-lg-2"
                                title="Faculty Name"
                              >
                                {/* <p>
                                  {course.faculty.faculty_category.facultyName}
                                </p> */}
                                <p>
                                  {
                                    course.faculty?.faculty_category
                                      ?.facultyName
                                  }
                                </p>
                              </div>
                              <div
                                className="col-md-6 col-lg-2"
                                title="Location"
                              >
                                {/* <p>{course.location}</p> */}
                                <p>{course.Location}</p>
                              </div>
                              <div className="col-md-6 col-lg-2" title="Mode">
                                <p>{course.Mode}</p>
                              </div>
                              <div className="col-md-6 col-lg-2" title="Types">
                                <p>{course.Types}</p>
                              </div>
                              <div
                                className="col-md-6 col-lg-2"
                                title="Duration"
                              >
                                <p>{course.Duration}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {renderPagination()}
                  {/* End Pagination */}
                </div>
                {/* END RESULT */}
              </div>
            </div>
          </div>
        </div>
        {/* END SEARCH RESULT */}
      </div>
    </div>
  );
};

export default SearchResults;
