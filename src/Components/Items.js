import React, { useContext, useState, useEffect } from "react";
import "./Items.css";
import { handleContext, arrayContext } from "./NewsType.js";
import copy from "./copy.jpeg";

//export const HeadlineContext = createContext(null);

const NewsSection = ({
  title,
  array,
  index,
  start,
  setStart,
  setheadlines,
  sourceLink,
}) => {
  return (
    <div className="box">
      <h1>{title}</h1>
      <div>
        {array[index][start]}
        <img
          alt="hi"
          src={copy}
          onClick={() =>
            setheadlines(array[index][start] ? array[index][start] : "no notes")
          }
        />
      </div>

      <div>
        {array[index][start + 1]}
        <img
          alt="hi"
          src={copy}
          onClick={() =>
            setheadlines(
              array[index][start + 1] ? array[index][start + 1] : "no notes"
            )
          }
        />
      </div>
      <button onClick={() => setStart(start + 2)}>Next</button>
      <br />
      <div
        style={{
          marginTop: "15px",
          fontSize: "23px",
          fontWeight: "bold",
          alignItems: "center",
          marginLeft: "220px",
        }}
      >
        source:{" "}
        <a href={sourceLink} target="_blank">
          link
        </a>
      </div>
    </div>
  );
};

const Items = ({ setheadlines }) => {
  const themeContext = useContext(handleContext);
  const [arrayHindu, arrayIE, arrayTOI] = useContext(arrayContext);
  const [index, setIndex] = useState(0);
  const [start1, setStart1] = useState(0);
  const [start2, setStart2] = useState(0);
  const [start3, setStart3] = useState(0);

  useEffect(() => {
    setStart1(0);
    setStart2(0);
    setStart3(0);
    if (themeContext === "Business") {
      setIndex(1);
    } else if (themeContext === "Sports") {
      setIndex(0);
    } else if (themeContext === "Education") {
      setIndex(2);
    }
  }, [themeContext]);

  return (
    <div className="items">
      <NewsSection
        title="Hindu"
        array={arrayHindu}
        index={index}
        start={start1}
        setStart={setStart1}
        type="Hindu"
        setheadlines={setheadlines}
        sourceLink="https://www.thehindu.com/"
      />
      <NewsSection
        title="Indian Express"
        array={arrayIE}
        index={index}
        start={start2}
        setStart={setStart2}
        type="IE"
        setheadlines={setheadlines}
        sourceLink="https://indianexpress.com/"
      />
      <NewsSection
        title="TOI"
        array={arrayTOI}
        index={index}
        start={start3}
        setStart={setStart3}
        type="TOI"
        setheadlines={setheadlines}
        sourceLink="https://timesofindia.indiatimes.com/"
      />
    </div>
  );
};

export default Items;
