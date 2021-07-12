import { combineReducers } from "redux";
import auth from "./auth";
import movie from "./Movie";

export default combineReducers({
  auth,
  movie,
});
