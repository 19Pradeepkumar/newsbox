import React, { useState } from "react";
import "./Searchbar.css";
import { Translate1 } from "./Translate1";
import { PastingImage } from "./PastingImage";
import paste from "./Paste-icon1.png";

const Searchbar = ({ sendingheadlines }) => {
  const [texttochange, setTexttochange] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi"); // Default language
  const [translationData, setTranslationData] = useState(""); // State to store translation data
  const [copiedtext, setCopiedtext] = useState("");

  const handleChange = (e) => {
    setTexttochange(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Text to change:", texttochange);
      console.log("Selected language:", selectedLanguage);
      const res = await fetch("http://localhost:3000/trans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: texttochange, to: selectedLanguage }),
      });
      const data = await res.json();
      setTranslationData(data); // Update translation data state after fetch
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <h2>
            <img
              src={paste}
              alt="image"
              style={{
                marginLeft: "25px",
                height: "30px",
                width: "30px",
                marginRight: "20px",
              }}
              onClick={() =>
                sendingheadlines && setTexttochange(sendingheadlines)
              }
            />
            INPUT :
            <input type="text" value={texttochange} onChange={handleChange} />
            Language :
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ka">Kannada</option>
              <option value="ta">Tamil</option>
              <option value="ma">Malayalam</option>
            </select>
          </h2>
        </div>
        <button type="submit">Translate</button>
      </form>
      <div className="output">
        {translationData.length !== 0 && <Translate1 line={translationData} />}
      </div>
    </div>
  );
};

export default Searchbar;
