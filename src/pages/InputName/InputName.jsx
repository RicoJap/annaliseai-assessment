import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import Button from "@mui/material/Button";

import { setFirstName } from "../../actions/actions";

import "./InputName.scss";

const InputName = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const firstName = useSelector((state) => state.firstName);

  const handleChange = (evt) => {
    dispatch(setFirstName(evt.target.value));
  };

  const handleProceed = () => {
    history.push("/images");
  };

  return (
    <div className="InputName__wrapper">
      <div className="InputName__title">
        <Typography variant="h4" component="div" gutterBottom>
          Welcome 😊
        </Typography>
      </div>
      <div className="InputName__input-box">
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

export default InputName;
