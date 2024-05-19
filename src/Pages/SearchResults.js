import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchURL } from "../settings";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  // const [selectedCity, setSelectedCity] = useState("");
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedDeliveryModes, setSelectedDeliveryModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    filterData(SearchURL + searchTerm);
  }, [searchTerm]);

  const filterData = (url) => {
    setLoading(true);
    fetchDataFromAPI(url)
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setOriginalData(data.data);
          setFilteredData(data.data);
          setNoData(data.data.length === 0);
          setLoading(false);
        } else {
          setOriginalData([]);
          setFilteredData([]);
          setNoData(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setNoData(true);
      });
  };

  const filter = (filters) => {
    console.log("filters : " + JSON.stringify(filters));
    if (!originalData || originalData.length === 0) {
      setFilteredData([]);
      return;
    }

    let filtered = originalData.filter((course) => {
      if (!course || !Array.isArray(course.deliveryMode)) {
        return false;
      }

      const modeMatch =
        !filters.mode ||
        filters.mode.length === 0 ||
        course.type.some((mode) =>
          filters.mode.map((m) => m.toUpperCase()).includes(mode.toUpperCase())
        );

      const deliveryModeMatch =
        !filters.deliveryModes ||
        filters.deliveryModes.length === 0 ||
        course.deliveryMode.some((mode) =>
          filters.deliveryModes.includes(mode)
        );

      const durationMatch =
        !filters.durations ||
        filters.durations.length === 0 ||
        filters.durations.includes(course.duration.name);

      return modeMatch && deliveryModeMatch && durationMatch;
    });

    setFilteredData(filtered);
    setNoData(filtered.length === 0);
  };
  useEffect(() => {
    filter({
      mode: selectedMode,
      deliveryModes: selectedDeliveryModes,
      durations: selectedDurations,
    });
  }, [selectedMode, selectedDeliveryModes, selectedDurations]);
  const handleFilterChange = () => {
    filter({
      mode: selectedMode,
      deliveryModes: selectedDeliveryModes,
      durations: selectedDurations,
    });
  };

  const handleModeChange = (event) => {
    const mode = event.target.value;
    const isChecked = event.target.checked;

    let updatedModes;

    if (isChecked) {
      updatedModes = [...selectedMode, mode];
    } else {
      updatedModes = selectedMode.filter((m) => m !== mode);
    }
    console.log("updatedModes value : " + updatedModes);
    setSelectedMode(updatedModes);
    console.log("After updating state value : " + selectedMode);

    handleFilterChange();
  };

  const handleDurationChange = (event) => {
    const duration = event.target.value;
    const isChecked = event.target.checked;
    let updatedDurations = [...selectedDurations];
    if (isChecked) {
      updatedDurations.push(duration);
    } else {
      updatedDurations = updatedDurations.filter((d) => d !== duration);
    }
    setSelectedDurations(updatedDurations);
    handleFilterChange();
  };

  const handleDeliveryModesChange = (event) => {
    const deliveryMode = event.target.value;
    const isChecked = event.target.checked;
    let updatedDeliveryModes = [...selectedDeliveryModes];
    if (isChecked) {
      updatedDeliveryModes.push(deliveryMode);
    } else {
      updatedDeliveryModes = updatedDeliveryModes.filter(
        (d) => d !== deliveryMode
      );
    }
    setSelectedDeliveryModes(updatedDeliveryModes);
    handleFilterChange();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentPageIndex = currentPage - 1;

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = pageNumber === currentPage;
            const isEllipsis =
              !isCurrentPage &&
              (pageNumber < currentPageIndex - 1 ||
                pageNumber > currentPageIndex + 3);
            if (isEllipsis) return null;

            return (
              <li
                key={index}
                className={`page-item ${isCurrentPage ? "active" : ""} ${
                  isEllipsis ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {isEllipsis ? "..." : pageNumber}
                </button>
              </li>
            );
          })}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const renderSearchItems = () => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredData.slice(startIndex, endIndex).map((course, index) => (
      <div
        key={index}
        className="row mt-5 m-2 p-2 border-bottom border-secondary"
      >
        <div className="col-lg-12">
          <p className="searchCourseName">
            <a className="link-opacity-50-hover" href={`/courses/${course.id}`}>
              {course.name}
            </a>
          </p>
          <p>{course.description}</p>
        </div>
        <div className="col-lg-12 searchLinks primary">
          <div className="row searchrow">
            <div className="col-md-6 col-lg-2" title="Course Code">
              <p>{course.code}</p>
            </div>
            <div
              className="col-md-6 col-lg-2"
              title="Faculty Name"
              style={{ whiteSpace: "nowrap" }}
            >
              <p>{course.faculty.facultyCategory.name}</p>
            </div>
            <div
              className="col-md-6 col-lg-2"
              title="Mode"
              style={{ whiteSpace: "nowrap" }}
            >
              <div>
                {course.deliveryMode.map((mode, index) => (
                  <p key={index}>{mode}</p>
                ))}
              </div>
            </div>
            <div
              className="col-md-6 col-lg-2"
              title="Types"
              style={{ whiteSpace: "nowrap" }}
            >
              {course.type.map((mode, index) => (
                <p key={index}>{mode}</p>
              ))}
            </div>
            <div
              className="col-md-6 col-lg-2"
              title="Duration"
              style={{ whiteSpace: "nowrap" }}
            >
              <p>{course.duration.name}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mb-5">
      {loading && (
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-3 text-center mt-3 border-bottom">
          <h3>Search Result for : {searchTerm}</h3>
        </div>
        <div className="col-md-12">
          <div className="grid search">
            <div className="grid-body">
              <div className="row">
                <div className="col-md-3 mt-5">
                  <h2 className="grid-title">
                    <i className="fas fa-filter"></i> Filters
                  </h2>
                  <hr />
                  <div className="form-check">
                    <div>
                      <h4>By Mode:</h4>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="FULL-TIME"
                            checked={selectedMode.includes("FULL-TIME")}
                            onChange={handleModeChange}
                          />
                          Full Time Course
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="PART TIME"
                            checked={selectedMode.includes("PART TIME")}
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
                            value="One Year"
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
                            value="Two Years"
                            onChange={handleDurationChange}
                          />{" "}
                          2 Year
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="Four Years"
                            onChange={handleDurationChange}
                          />{" "}
                          4 Year
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4>By Delivery Mode:</h4>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="Online"
                            onChange={handleDeliveryModesChange}
                          />{" "}
                          Online
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="In Class"
                            onChange={handleDeliveryModesChange}
                          />{" "}
                          In-Class
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="icheck"
                            value="Hybrid"
                            onChange={handleDeliveryModesChange}
                          />{" "}
                          Hybrid
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="container">
                    {noData ? (
                      <div className="no-data-message">No data</div>
                    ) : (
                      renderSearchItems()
                    )}
                  </div>
                  {renderPagination()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
