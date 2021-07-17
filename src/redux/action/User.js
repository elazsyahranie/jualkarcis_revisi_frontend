import axiosApiIntances from "../../Utils/axios";

export const loginUser = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};

export const getUserData = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`auth/${id}`),
  };
};

export const updateUserData = (userId, formData) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`auth/${userId}`, formData),
  };
};

export const updateUserImage = (userId, formData) => {
  return {
    type: "UPDATE_USER_IMAGE",
    payload: axiosApiIntances.patch(`auth/${userId}`, formData),
  };
};
