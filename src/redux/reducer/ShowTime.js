const initialState = {
  data: {},
  login: false, // false : tampilan navbar sebelum login || true: tampilan navbar setalah login
  isLoading: false,
  isError: false,
  msg: "",
};

const showTime = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_SHOW_TIME_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_ALL_SHOW_TIME_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ALL_SHOW_TIME_REJECTED": // ketika gagal
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

export default showTime;
