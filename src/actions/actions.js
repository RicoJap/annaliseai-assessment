import * as types from "./types";
import { unsplash } from "../utils/utils";
import { toJson } from "unsplash-js";

export const setFirstName = (firstName) => {
  return {
    type: types.SET_FIRST_NAME,
    payload: firstName,
  };
};

export const fetchImages = async (searchQuery) => {
  let images = [];
  await unsplash.search
    .photos(searchQuery)
    .then(toJson)
    .then((json) => {
      if (json.results) {
        images = json.results;
      }
    });
  return {
    type: types.FETCH_IMAGES,
    payload: images,
  };
};
