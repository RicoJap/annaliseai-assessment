import axios from "axios"; //import axios library for performing ajax request
import * as types from "./types";

export const setFirstName = (firstName) => {
  return {
    type: types.SET_FIRST_NAME,
    payload: firstName,
  };
};
