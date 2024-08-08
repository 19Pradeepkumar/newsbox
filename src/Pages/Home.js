import React, { Children, createContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Stock from "./../Components/Stock";
import Items from "./../Components/Items";
import NewsType from "../Components/NewsType";
import "./Home.css";
import Searchbar from "../Components/Searchbar";

export const headlinesContext = createContext(null);

const Home = () => {
  // const [count, setCount] = useState(0);
  // const [arrayHindu, setArrayHindu] = useState([[], [], []]);
  // const [arrayTOI, setArrayTOI] = useState([[], [], []]);
  // const [arrayIE, setArrayIE] = useState([[], [], []]);
  // useEffect(() => {
  //   // if (count === 0) {
  //   async function getData() {
  //     //console.log("At client");
  //     try {
  //       const response = await fetch("http://localhost:5000/getData");
  //       const data = await response.json();
  //       setArrayHindu(data.arrayHin);
  //       setArrayTOI(data.arrayTOI);
  //       setArrayIE(data.arrayIE);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getData();
  //   setCount(1);
  //   // }
  // }, [count]);
  const [headlines, setHeadlines] = useState("");
  console.log(headlines, "at home");
  return (
    <div className="home">
      <headlinesContext.Provider value={headlines}>
        <Navbar />
        <Stock />
        <NewsType setheadlines={setHeadlines} />
        <Searchbar sendingheadlines={headlines} />
      </headlinesContext.Provider>
    </div>
  );
};

export default Home;
