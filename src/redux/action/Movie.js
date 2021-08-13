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

export const postMovie = (data) => {
  return {
    type: "POST_MOVIE",
    payload: axiosApiIntances.post(`movie/`, data),
  };
};

export const updateMovie = (id, data) => {
  return {
    type: "UPDATE_MOVIE",
    payload: axiosApiIntances.patch(`movie/${id}`, data),
  };
};

export const updateMovieImage = (movieId, fd) => {
  return {
    type: "UPDATE_MOVIE_IMAGE",
    payload: axiosApiIntances.patch(`movie/update-movie-image/${movieId}`, fd),
  };
};

export const deleteMovie = (movieId) => {
  return {
    type: "DELETE_MOVIE",
    payload: axiosApiIntances.delete(`movie/${movieId}`),
  };
};
