import axiosApiIntances from "../../Utils/axios";

export const getAllMovie = () => {
  return {
    type: "MOVIE",
    payload: axiosApiIntances.get("movie/"),
  };
};

export const getAllMovieByPagination = (page, sort, search) => {
  return {
    type: "MOVIE_PAGINATION",
    payload: axiosApiIntances.get(
      `movie/pagination?page=${page}&limit=4&sort=${sort}&search=${search}`
    ),
  };
};

export const getMovieById = (id) => {
  return {
    type: "MOVIE_ID",
    payload: axiosApiIntances.get(`movie/${id}`),
  };
};
