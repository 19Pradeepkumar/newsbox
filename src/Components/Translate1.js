import React, { useEffect, useState } from "react";

export const Translate1 = ({ line }) => {
  // const [text, setText] = useState("");
  console.log(line, "hi");

  return (
    <div style={{ fontFamily: "monospace", fontWeight: "bold" }}>
      {line &&
        line.map((word, index) => (
          <span
            key={index}
            style={{
              height: "45px",
              color: "white",
              fontSize: "25px",
              paddingTop: "10px",
            }}
          >
            {word}{" "}
          </span>
        ))}
    </div>
  );
};
