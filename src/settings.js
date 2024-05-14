// for local
// const API_BASE_URL = "http://sstv5.cc:8080/api/apiV1";

// for Live
const API_BASE_URL = "https://portal.abroadvarsity.com/api/apiV1";

const LANDING_PAGE_URL = API_BASE_URL + "/landingPageMaker";
const SearchURL = API_BASE_URL + "/search?query=";
const StudentRegisterURL = API_BASE_URL + "/register";
const allCourses = API_BASE_URL + "/courses";
const loginURL = API_BASE_URL + "/login";
const logoutURL = API_BASE_URL + "/logout";
const StudentProfileURL = API_BASE_URL + "/student/profile";
const StudentApplicationsURL = API_BASE_URL + "/student/applications";
const SessionDropdownURL = API_BASE_URL + "/ajax/sessions?courseId=";
const branchDropdownURL = API_BASE_URL + "/ajax/branches?sessionId=";
const ScholarshipsURL = API_BASE_URL + "/ajax/scholarships?courseId=";
const createApplicationURL = API_BASE_URL + "/student/applications";
const updateStudentURL = API_BASE_URL + "/student/profile/";

const DEBUG_MODE = false;
const FEATURE_FLAG_ENABLED = true;
const megamenuConfig = {
  columns: 4,
  rows: 4,
  facultiesPerPage: 12,
};

export const MostPopularCourses_cardsPerPage = {
  //To Display Most Popular Courses cards per page with different screen sizes
  largeScreen: 4,
  mediumScreen: 3,
  smallScreen: 2,
  extraSmallScreen: 1,
};

export const FeaturedCourses_cardsPerPage = {
  //To Display Featured Courses cards per page with different screen sizes
  largeScreen: 4,
  mediumScreen: 3,
  smallScreen: 2,
  extraSmallScreen: 1,
};

export const MostAppliedFaculties_cardsPerPage = {
  //To Display Featured Courses cards per page with different screen sizes
  largeScreen: 4,
  mediumScreen: 3,
  smallScreen: 2,
  extraSmallScreen: 1,
};

export const FacultyCategoery_cardsPerPage = {
  //To Display faculties categoery cards per page with different screen sizes
  largeScreen: 4,
  mediumScreen: 3,
  smallScreen: 2,
  extraSmallScreen: 1,
};
// Export the settings
export {
  API_BASE_URL,
  DEBUG_MODE,
  FEATURE_FLAG_ENABLED,
  megamenuConfig,
  LANDING_PAGE_URL,
  SearchURL,
  StudentRegisterURL,
  allCourses,
  loginURL,
  StudentProfileURL,
  StudentApplicationsURL,
  logoutURL,
  SessionDropdownURL,
  branchDropdownURL,
  ScholarshipsURL,
  createApplicationURL,
  updateStudentURL,
};
