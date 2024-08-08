import React from "react";

export const PastingImage = (setcopiedtext) => {
  return (
    <img
      src=""
      alt="image"
      style={{ marginLeft: "25px" }}
      onClick={() => setcopiedtext()}
    />
  );
};
