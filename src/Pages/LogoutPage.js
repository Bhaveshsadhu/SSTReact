import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutURL } from "../settings";
import { ApiCall } from "../Components/ApiCall";

function LogoutPage({ handleLogout, token }) {
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await ApiCall(logoutURL, "POST");

        if (response) {
          // Logout successful
          console.log("Logout successful!");

          localStorage.removeItem("token");
        } else {
          // Logout failed
          console.error("Logout failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }

      // Call the handleLogout function passed as props
      handleLogout();

      // Redirect to the home page
      history.push("/");
    };

    logout();
  }, [handleLogout, token, history]);

  return null;
}

export default LogoutPage;
