import React, { useState, useEffect } from "react";

function AutoLogout() {
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds

    const logout = () => {
      // Logout logic
      alert("Logged out due to inactivity.");
      // Redirect to logout page or perform any other logout actions
    };

    const resetLogoutTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      setLogoutTimer(setTimeout(logout, inactivityTimeout));
    };

    const handleUserActivity = () => {
      resetLogoutTimer();
      setShowAlert(false);
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetLogoutTimer();

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      clearTimeout(logoutTimer);
    };
  }, [logoutTimer]);

  const handleContinueClick = () => {
    setShowAlert(false);
    clearTimeout(logoutTimer);
    setLogoutTimer(null); // Reset timer
  };

  const handleLogoutClick = () => {
    // Perform logout logic
    alert("Logged out.");
    // Redirect to logout page or perform any other logout actions
  };

  return (
    <div>
      {showAlert && (
        <div>
          <p>Are you still there?</p>
          <button onClick={handleContinueClick}>Continue</button>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default AutoLogout;
