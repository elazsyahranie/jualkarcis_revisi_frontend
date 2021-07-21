const initialState = {
  data: {},
  login: false, // false : tampilan navbar sebelum login || true: tampilan navbar setalah login
  isLoading: false,
  isError: false,
  msg: "",
};

const premiere = (state = initialState, action) => {
  switch (action.type) {
    case "INSERT_PREMIERE_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "INSERT_PREMIERE_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "INSERT_PREMIERE_REJECTED": // ketika gagal
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

export default premiere;
