const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOKING_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_BOOKING_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_BOOKING_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default booking;
