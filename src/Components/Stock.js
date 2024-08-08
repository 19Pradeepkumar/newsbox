import React, { useEffect, useState } from "react";
import "./Stock.css";
import { screen } from "@testing-library/react";
import Prevnotes from "./Prevnotes";
import Addnotes from "./Addnotes";

const Stock = () => {
  const title = ["Sensex", "Nifty", "Nifty 50", "Nifty IT"];
  let [array, setArray] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    let timeoutId;
    const fetchData = async () => {
      try {
        console.log("Fetching stock data...");
        const response = await fetch("http://localhost:3000/stockdata");
        const data = await response.json();
        setArray(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      }
      timeoutId = setTimeout(fetchData, 30000);
    };
    fetchData();
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="stock">
      <div className="stockrelated">
        <div className="stocks">
          {title.length !== 0 && array.length !== 0
            ? title.map((ele, index) => (
                <div key={index}>
                  {ele}
                  <p className="price">
                    price : <span>{array[index][0]}</span>
                  </p>
                  <p className="price">
                    previous close :<span>{array[index][1]}</span>
                  </p>
                </div>
              ))
            : "no data"}
        </div>
      </div>
      <div className="searchbar">
        <Prevnotes />
        <Addnotes />
      </div>
    </div>
  );
};

export default Stock;
