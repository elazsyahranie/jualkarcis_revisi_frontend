const initialState = {
  data: {},
  login: false, // false : tampilan navbar sebelum login || true: tampilan navbar setalah login
  roleUser: 0,
  isLoading: false,
  isError: false,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "REGISTER_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "REGISTER_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "LOGIN_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "LOGIN_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "LOGIN_REJECTED": // ketika gagal
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
