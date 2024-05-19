import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../Components/fetchDataFromAPI ";
import { LANDING_PAGE_URL } from "../settings";
import HeroSection from "../Components/HeroSection";
import MostPopularCourses from "../Components/MostPopularCourses";
import FeaturedCourses from "../Components/FeaturedCourses";
import MostAppliedFaculties from "../Components/MostAppliedFaculties";
import { useCache } from "../Components/CacheContext";

const HomePage = () => {
  const { CACHE_KEY, setCachedData, getCachedData } = useCache();
  let cachedData = getCachedData();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cachedData) {
        } else {
          const data = await fetchDataFromAPI(LANDING_PAGE_URL);
          setCachedData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getCachedData, setCachedData]);

  return (
    <>
      <HeroSection />
      <MostPopularCourses cachedData={cachedData} />
      <FeaturedCourses cachedData={cachedData} />
      <MostAppliedFaculties cachedData={cachedData} />
    </>
  );
};

export default HomePage;
