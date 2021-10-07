import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ show = true }) => {
  return (
    show && (
      <div style={{ paddingTop: 40 }}>
        <CircularProgress />
      </div>
    )
  );
};

export default Spinner;
