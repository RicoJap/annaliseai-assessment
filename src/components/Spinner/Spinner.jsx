import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./Spinner.scss";

const Spinner = ({ show = true }) => {
  return (
    show && (
      <div className="Spinner" data-testid="spinner">
        <CircularProgress />
      </div>
    )
  );
};

export default Spinner;
