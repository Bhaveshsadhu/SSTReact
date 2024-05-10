import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";
import { API_BASE_URL, LANDING_PAGE_URL } from "../settings";
import HeroSection from "../Components/HeroSection";
import MostPopularCourses from "../Components/MostPopularCourses";
import FeaturedCourses from "../Components/FeaturedCourses";
import MostAppliedFaculties from "../Components/MostAppliedFaculties";
import { useCache } from "../Components/CacheContext";

const HomePage = () => {
  const { CACHE_KEY, CACHE_EXPIRATION_TIME, setCachedData, getCachedData } =
    useCache();
  const [cachedDT, setCachedDT] = useState("");

  const [loading, setLoading] = useState(true);
  const [cacheExpired, setCacheExpired] = useState(false);

  useEffect(() => {
    const cachedData = getCachedData();
    if (cachedData) {
      setCachedDT(cachedData);
      // console.log("This is called from HomePage : From Cached Data");
      setLoading(false);
    } else {
      // console.log("calling API : ");
      fetchData();
    }

    const removeCachedData = setTimeout(() => {
      localStorage.removeItem(CACHE_KEY);
      setCacheExpired(true);
      // console.log("API called after 5 seconds at", new Date());
    }, CACHE_EXPIRATION_TIME);

    return () => clearTimeout(removeCachedData);
  }, []);

  useEffect(() => {
    if (cacheExpired) {
      // console.log("This is called because Cached is Expired..");
      fetchData();
    }
  }, [cacheExpired]);

  const fetchData = () => {
    fetchDataFromAPI(LANDING_PAGE_URL)
      .then((data) => {
        setCachedData(data);
        // localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setCacheExpired(false);
        const cachedData = getCachedData();
        setCachedDT(cachedData);
        // console.log("This is callled from HomePage : API Calling");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        cachedDT && (
          <>
            <HeroSection />
            <MostPopularCourses cachedData={cachedDT} />
            <FeaturedCourses cachedData={cachedDT} />
            <MostAppliedFaculties cachedData={cachedDT} />
          </>
        )
      )}
    </>
  );
};

export default HomePage;
