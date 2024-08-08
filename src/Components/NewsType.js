//

import React, { createContext, useState, useEffect } from "react";
import "./NewsType.css";
import Items from "./Items";

export const handleContext = createContext(null);
export const arrayContext = createContext(null);

const NewsType = ({ setheadlines }) => {
  const [state, setState] = useState("Business");
  const [activeButton, setActiveButton] = useState(1); // Track the active button
  const [count, setCount] = useState(0);
  const [arrayHindu, setArrayHindu] = useState([[], [], []]);
  const [arrayTOI, setArrayTOI] = useState([[], [], []]);
  const [arrayIE, setArrayIE] = useState([[], [], []]);

  const handleChange = (newState, buttonId) => {
    setState(newState);
    setActiveButton(buttonId); // Set the clicked button as active
  };

  useEffect(() => {
    async function getData() {
      try {
        console.log("fetching");
        const response = await fetch("http://localhost:3000/getData");
        const data = await response.json();
        setArrayHindu(data.arrayHin);
        setArrayTOI(data.arrayTOI);
        setArrayIE(data.arrayIE);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
    setCount(1);
  }, []);

  const totArray = [arrayHindu, arrayIE, arrayTOI];

  return (
    <div>
      <div className="newstype">
        <button
          className={`fields ${activeButton === 1 ? "pink" : "green"}`}
          id="1"
          onClick={() => handleChange("Business", 1)}
        >
          Business
        </button>
        <button
          className={`fields ${activeButton === 2 ? "pink" : "green"}`}
          id="2"
          onClick={() => handleChange("Sports", 2)}
        >
          Sports
        </button>
        <button
          className={`fields ${activeButton === 3 ? "pink" : "green"}`}
          id="3"
          onClick={() => handleChange("Education", 3)}
        >
          Education
        </button>
      </div>
      <handleContext.Provider value={state}>
        <arrayContext.Provider value={totArray}>
          <Items setheadlines={setheadlines} />
        </arrayContext.Provider>
      </handleContext.Provider>
    </div>
  );
};

export default NewsType;
