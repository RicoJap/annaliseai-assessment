import * as types from "../actions/types";
import { combineReducers } from "redux";

const initialState = {
  firstName: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
