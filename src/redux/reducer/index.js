import { combineReducers } from "redux";
import auth from "./Auth";
import user from "./User";
import movie from "./Movie";
import booking from "./Booking.js";
import bookingSeat from "./BookingSeat.js";
import showTime from "./ShowTime";
import premiere from "./Premiere";

export default combineReducers({
  auth,
  user,
  movie,
  showTime,
  booking,
  bookingSeat,
  premiere,
});
