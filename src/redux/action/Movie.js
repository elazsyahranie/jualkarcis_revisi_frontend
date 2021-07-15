import axiosApiIntances from "../../Utils/axios";

export const getAllMovie = () => {
  return {
    type: "MOVIE",
    payload: axiosApiIntances.get("movie/"),
  };
};

export const getMovieById = (id) => {
  return {
    type: "MOVIE_ID",
    payload: axiosApiIntances.get(`movie/${id}`),
  };
};
