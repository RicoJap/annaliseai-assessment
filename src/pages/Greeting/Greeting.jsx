import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import Button from "@mui/material/Button";
import Unsplash, { toJson } from "unsplash-js";

import "./Greeting.scss";

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const Greeting = () => {
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
        if (json.results) {
          setImages(json.results);
        }
      });
  };

  return (
    <div className="Greeting__wrapper">
      <div className="Greeting__title">
        <Typography variant="h1" component="div" gutterBottom>
          Hello, {firstName}
        </Typography>
      </div>

      <div className="Greeting__search-box">
        <InputLabel
          htmlFor="input-box__first-name"
          style={{ textAlign: "center" }}
        >
          Search image
        </InputLabel>
        <MuiInput
          id="input-box__first-name"
          variant="outlined"
          value={imageSearch}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>
      <Button variant="outlined" onClick={handleSearch}>
        Search
      </Button>

      <div className="Greeting__images-container">
        {images.map((image) => {
          return (
            <div key={image.id} className="Greeting__image-wrapper">
              <img
                className="Greeting__image"
                src={image.urls.regular}
                alt={image.alt_description}
                width="50%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Greeting;
