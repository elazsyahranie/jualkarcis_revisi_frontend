const initialState = {
  data: {},
  login: false, // false : tampilan navbar sebelum login || true: tampilan navbar setalah login
  roleUser: 0, // 0 = worker || 1 = recruiter
  isLoading: false,
  isError: false,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIE_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "MOVIE_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "MOVIE_REJECTED": // ketika gagal
      return {
        ...state,
        login: false,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default auth;
