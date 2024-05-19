import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";

import UserNavbar from "./Components/UserNavbar";
import GuestNavbar from "./Components/GuestNavbar";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import StudentProfile from "./Pages/StudentProfile";
import StudentApplication from "./Pages/StudentApplication";
import AllApplication from "./Pages/AllApplication";
import StudentProfileEdit from "./Pages/StudentProfileEdit";
import StudentRegister from "./Pages/StudentRegister";
import LoginPage from "./Pages/LoginPage";
import ContactPage from "./Pages/ContactPage";
import HeroSection from "./Components/HeroSection";
import MostPopularCourses from "./Components/MostPopularCourses";
import FeaturedCourses from "./Components/FeaturedCourses";
import MostAppliedFaculties from "./Components/MostAppliedFaculties";
import SearchResults from "./Pages/SearchResults";
import ParentFaculty from "./Pages/ParentFaculty";
import Footer from "./Pages/Footer";
import CourseDetailsPage from "./Pages/CourseDetailsPage";
import FacultiesPage from "./Pages/FacultiesPage";
import CourseRegistrationForm from "./Pages/CourseRegistrationForm";
import LogoutPage from "./Pages/LogoutPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ApplyNowPage from "./Pages/ApplyNowPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSearch = () => {
    history.push("/UserProfile");
  };

  return (
    <div className="App">
      <Router>
        {isLoggedIn ? (
          <UserNavbar handleSearch={handleSearch} />
        ) : (
          <GuestNavbar handleSearch={handleSearch} />
        )}

        <Switch>
          <Route path="/faculties/:facultyId" component={ParentFaculty} />
          <Route path="/" exact>
            <HomePage></HomePage>
          </Route>
          <Route path="/Studentprofile">
            {isLoggedIn ? <StudentProfile /> : <Redirect to="/Login" />}
          </Route>
          <Route path="/allApplication" component={AllApplication} />
          <Route
            path="/StudentApplication/:id?"
            component={StudentApplication}
          />
          <Route path="/StudentProfileEdit" component={StudentProfileEdit} />
          <Route path="/StudentRegister" component={StudentRegister} />
          <Route path="/Login">
            {isLoggedIn ? (
              <Redirect to="/Studentprofile" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )}
          </Route>
          <Route path="/logout">
            <LogoutPage
              handleLogout={handleLogout}
              token={localStorage.getItem("token")}
            />
          </Route>

          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />

          <Route
            path="/courses/:id/"
            render={(props) => <CourseDetailsPage isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/facultyCategory/:id/courses"
            render={(props) => <FacultiesPage />}
          />
          <Route path="/registration-form" component={CourseRegistrationForm} />
          <Route path="/search/:searchTerm" component={SearchResults} />
          <Route path="/ApplyNow" component={ApplyNowPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
