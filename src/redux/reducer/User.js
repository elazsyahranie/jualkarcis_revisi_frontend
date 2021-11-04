const initialState = {
  data: {},
  login: false, // false : tampilan navbar sebelum login || true: tampilan navbar setalah login
  roleUser: 0,
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "CHANGE_PASSWORD_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "CHANGE_PASSWORD_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "GET_USER_BY_ID_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_USER_BY_ID_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        roleUser: 1,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
        msg: action.payload.data.msg,
      };
    case "GET_USER_BY_ID_REJECTED": // ketika gagal
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_USER_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        roleUser: 1,
        isLoading: false,
        isError: false,
        // data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_REJECTED": // ketika gagal
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: false,
        isError: true,
        // data: {},
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_IMAGE_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_USER_IMAGE_FULFILLED": // ketika sukses
      return {
        ...state,
        login: true,
        roleUser: 1,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_IMAGE_REJECTED": // ketika gagal
      return {
        ...state,
        login: false,
        roleUser: 1,
        isLoading: false,
        isError: true,
        // data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
