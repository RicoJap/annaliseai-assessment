import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import Button from "@mui/material/Button";

import { fetchImages } from "../../actions/actions";
import Spinner from "../../components/Spinner/Spinner";

import "./SearchImages.scss";

const SearchImages = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.rootReducer.firstName);
  const images = useSelector((state) => state.rootReducer.images);

  const [imageQuery, setImageQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!firstName) {
      history.goBack();
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [images]);

  const handleChange = (evt) => {
    setImageQuery(evt.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    dispatch(fetchImages(imageQuery));
  };

  const renderImages = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className="SearchImages__images-container">
          {images &&
            images.map((image) => {
              return (
                <div key={image.id} className="SearchImages__image-wrapper">
                  <img
                    className="SearchImages__image"
                    src={image.urls.regular}
                    alt={image.alt_description}
                    width="50%"
                    data-testid="searchimages__image"
                  />
                </div>
              );
            })}
        </div>
      );
    }
  };

  return (
    <div className="SearchImages__wrapper">
      <div className="SearchImages__title" data-testid="searchimages__title">
        <Typography variant="h3" component="div" gutterBottom>
          Hello, {firstName}
        </Typography>
      </div>

      <div className="SearchImages__search-box">
        <InputLabel
          htmlFor="search-images__search-box"
          data-testid="searchimages__input-label"
        >
          Search image
        </InputLabel>
        <MuiInput
          id="search-images__search-box"
          variant="outlined"
          value={imageQuery}
          onChange={handleChange}
          style={{ width: "100%" }}
          data-testid="searchimages__input-box"
        />
      </div>
      <Button
        variant="outlined"
        onClick={handleSearch}
        data-testid="searchimages__button"
      >
        Search
      </Button>

      {renderImages()}
    </div>
  );
};

export default SearchImages;
