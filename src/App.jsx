import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file

// Square component to display each subject
function Square({ subjectName }) {
  return <div className="square">{subjectName}</div>;
}

function App() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Using the proxy path
    fetch("/api/subjects?standard=10")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setSubjects(data)) // Save the entire array of subjects
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="subject-grid">
      {subjects.map((subject) => (
        // Rendering subject name from the API response
        <Square key={subject.subject_code} subjectName={subject.subject_name} />
      ))}
    </div>
  );
}

export default App;
