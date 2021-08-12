import { combineReducers } from "redux";
import auth from "./auth";
import movie from "./Movie";
import booking from "./Booking.js";
import bookingSeat from "./BookingSeat.js";
import premiere from "./Premiere";

export default combineReducers({
  auth,
  movie,
  booking,
  bookingSeat,
  premiere,
});
