// CacheContext.js
import React, { createContext, useContext } from "react";

const CacheContext = createContext();

export const useCache = () => useContext(CacheContext);

export const CacheProvider = ({ children }) => {
  const CACHE_KEY = "cachedData";
  const CACHE_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
  // const CACHE_EXPIRATION_TIME = 5 * 1000; // 5 seconds in milliseconds

  const setCachedData = (data) => {
    const cachedData = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
    // console.log("data stored in cached : " + JSON.stringify(cachedData));
  };

  const getCachedData = () => {
    const cachedDataString = localStorage.getItem(CACHE_KEY);
    if (cachedDataString) {
      const cachedData = JSON.parse(cachedDataString);
      const currentTime = Date.now();
      const cacheExpirationTime = cachedData.timestamp + CACHE_EXPIRATION_TIME;
      // console.log("Cached Experiation Time:" + cacheExpirationTime);
      if (currentTime < cacheExpirationTime) {
        return cachedData.data;
      } else {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    return null;
  };

  return (
    <CacheContext.Provider
      value={{ CACHE_KEY, CACHE_EXPIRATION_TIME, setCachedData, getCachedData }}
    >
      {children}
    </CacheContext.Provider>
  );
};
