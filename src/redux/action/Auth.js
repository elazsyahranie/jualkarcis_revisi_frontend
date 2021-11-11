import axiosApiIntances from "../../Utils/axios";

export const registerUser = (data) => {
  return {
    type: "REGISTER",
    payload: axiosApiIntances.post("auth/register", data),
  };
};

export const loginUser = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};

export const getUser = (id) => {
  return {
    type: "GET_USER_ID",
    payload: axiosApiIntances.get(`user/${id}`),
  };
};
