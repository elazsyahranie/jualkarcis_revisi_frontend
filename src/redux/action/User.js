import axiosApiIntances from "../../Utils/axios";

export const loginUser = (data) => {
  return {
    type: "USER_LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};
