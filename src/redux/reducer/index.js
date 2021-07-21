import { combineReducers } from "redux";
import auth from "./auth";
import movie from "./Movie";
import premiere from "./Premiere";

export default combineReducers({
  auth,
  movie,
  premiere,
});
