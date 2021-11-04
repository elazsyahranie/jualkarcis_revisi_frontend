import axiosApiIntances from "../../Utils/axios";

export const getAllShowTime = (data) => {
  return {
    type: "GET_ALL_SHOW_TIME",
    payload: axiosApiIntances.get("show-time/", data),
  };
};
