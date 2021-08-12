import axiosApiIntances from "../../Utils/axios";

export const getBookingSeat = (movieIdNumber) => {
  return {
    type: "GET_BOOKING_SEAT",
    payload: axiosApiIntances.get(
      `booking/booking-seat-movie-id/${movieIdNumber}`
    ),
  };
};

export const postBookingSeat = (data) => {
  return {
    type: "POST_BOOKING_SEAT",
    payload: axiosApiIntances.post("booking/booking-seat", data),
  };
};
