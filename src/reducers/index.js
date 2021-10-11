import * as types from "../actions/types";
import { combineReducers } from "redux";

const initialState = {
  firstName: "",
  images: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case types.FETCH_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  rootReducer,
});
