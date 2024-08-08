import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Prevnotes.css"; // Import CSS file

const Prevnotes = ({ email }) => {
  const [notes, setNotes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchNotes = async () => {
    console.log("fetching");
    try {
      const authtoken = localStorage.getItem("authtoken");
      const response = await fetch("http://localhost:3000/getnotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authtoken,
        }),
      });
      const data = await response.json();
      console.log(data);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const toggleVisibility = () => {
    if (!isVisible) {
      fetchNotes();
    }
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleVisibility} className="prevnotes-button">
        Previous-Notes
      </button>
      {isVisible &&
        createPortal(
          <div className="prevnotes-overlay">
            <div className="prevnotes-modal">
              <span className="prevnotes-close" onClick={toggleVisibility}>
                &times;
              </span>
              <h2>Previous Notes</h2>
              <div className="notes-list">
                {notes.length > 0 ? (
                  notes.map((note, index) => (
                    <div key={index} className="note-item">
                      <p>{note.text}</p>
                      <small>{new Date(note.date).toLocaleDateString()}</small>
                    </div>
                  ))
                ) : (
                  <p>No notes found.</p>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Prevnotes;
