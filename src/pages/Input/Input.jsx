import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import "./Input.scss";
import { setFirstName } from "../../actions/actions";

const Input = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [firstName, setFirstName] = useState("");
  const firstName = useSelector((state) => state.firstName);

  const handleChange = (evt) => {
    // setFirstName(evt.target.value);
    dispatch(setFirstName(evt.target.value));
  };

  const handleProceed = () => {
    history.push("/images");
  };

  return (
    <div className="Input__wrapper">
      <div className="Input__box">
        <InputLabel htmlFor="input-box__first-name">
          Set Your First Name
        </InputLabel>
        <MuiInput
          id="input-box__first-name"
          variant="outlined"
          value={firstName}
          onChange={handleChange}
        />
      </div>
      <Button variant="outlined" onClick={handleProceed}>
        Proceed
      </Button>
    </div>
  );
};

export default Input;
