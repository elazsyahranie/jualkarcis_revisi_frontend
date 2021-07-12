import axiosApiIntances from "../../Utils/axios";

export const getAllMovie = () => {
  return {
    type: "MOVIE",
    payload: axiosApiIntances.get("movie/"),
  };
};
