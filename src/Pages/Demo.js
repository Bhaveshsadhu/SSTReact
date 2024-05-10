import React, { useState, useEffect } from "react";
import { SessionDropdownURL } from "../settings";
import { ApiCall } from "../Components/ApiCall";

function SessionDropdown({ courseId }) {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await ApiCall(SessionDropdownURL + "1");
        console.log("response : " + response);
        setSessions(response);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [courseId]);

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-info dropdown-toggle"
        type="button"
        id="sessionDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedSession
          ? sessions.find((session) => session.id === selectedSession)?.name
          : "Select Session"}
      </button>
      <ul className="dropdown-menu" aria-labelledby="sessionDropdown">
        {sessions &&
          sessions.map((session) => (
            <li key={session.id}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setSelectedSession(session.id)}
              >
                {session.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SessionDropdown;
