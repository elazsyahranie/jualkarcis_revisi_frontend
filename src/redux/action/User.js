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

export const changeUserPassword = (userId, userPassword) => {
  return {
    type: "CHANGE_PASSWORD",
    payload: axiosApiIntances.patch(
      `auth/change-password/${userId}`,
      userPassword
    ),
  };
};

export const updateUserImage = (userId, userImage) => {
  return {
    type: "UPDATE_USER_IMAGE",
    payload: axiosApiIntances.patch(`auth/updateImage/${userId}`, userImage),
  };
};
