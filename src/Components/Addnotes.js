import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { headlinesContext } from "./../Pages/Home";

const Addnotes = () => {
  const [openbox, setOpenbox] = useState(false);
  const headlines = useContext(headlinesContext);
  console.log(headlines, "at adnotes");

  const handleOpen = () => setOpenbox(true);
  const handleClose = () => setOpenbox(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          height: "44px",
          width: "182px",
          marginTop: "20px",
          fontSize: "20px",
          borderRadius: "5px",
          borderCollapse: "collapse",
        }}
      >
        Add-Notes
      </button>
      {openbox && <Modal onClose={handleClose} headlines={headlines}></Modal>}
    </div>
  );
};

export default Addnotes;
