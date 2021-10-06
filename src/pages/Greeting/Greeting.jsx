import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import Button from "@mui/material/Button";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const Greeting = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.firstName);

  const [imageSearch, setImageSearch] = useState("");
  const [images, setImages] = useState([]);

  const handleChange = (evt) => {
    setImageSearch(evt.target.value);
  };

  const handleSearch = () => {
    unsplash.search
      .photos(imageSearch)
      .then(toJson)
      .then((json) => {
        console.log("abcabc", json);
        if (json.results) {
          setImages(json.results);
        }
      });
  };

  return (
    <div className="Input__wrapper">
      <Typography variant="h1" component="div" gutterBottom>
        Hello, {firstName}
      </Typography>

      <div className="Input__box">
        <InputLabel htmlFor="input-box__first-name">Search image</InputLabel>
        <MuiInput
          id="input-box__first-name"
          variant="outlined"
          value={imageSearch}
          onChange={handleChange}
        />
      </div>
      <Button variant="outlined" onClick={handleSearch}>
        Proceed
      </Button>

      {images.map((image) => {
        return <img src={image.urls.regular} />;
      })}
    </div>
  );
};

export default Greeting;
