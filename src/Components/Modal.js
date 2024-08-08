import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import paste from "./paste.png";

const Modal = ({ children, onClose, headlines }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    const authtoken = localStorage.getItem("authtoken");
    console.log(authtoken);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/addnotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authtoken,
          note: text,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      const result = await response.json();
      alert(result.message);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return createPortal(
    <div className="overlay">
      <div className="modal">
        <div className="portal">
          <div>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="date-input"
            />
          </div>
          <div className="textarea-container">
            <textarea
              value={text}
              onChange={handleChange}
              className="textarea"
            />
            <img
              alt="Paste"
              src={paste}
              onClick={() => setText((prev) => prev + headlines)}
              className="paste-img"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="button" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" onClick={onClose} className="button">
              Close
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
