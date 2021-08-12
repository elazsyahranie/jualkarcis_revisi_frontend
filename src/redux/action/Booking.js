import axiosApiIntances from "../../Utils/axios";

export const getBooking = (movieId) => {
  return {
    type: "GET_BOOKING",
    payload: axiosApiIntances.get(`booking/${movieId}`),
  };
};
