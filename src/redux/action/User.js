import axiosApiIntances from "../../Utils/axios";

export const loginUser = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};
