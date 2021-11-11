import axiosApiIntances from "../../Utils/axios";

export const getUserData = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`user/${id}`),
  };
};

export const updateUserData = (userId, formData) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`user/${userId}`, formData),
  };
};

export const changeUserPassword = (userId, userPassword) => {
  return {
    type: "CHANGE_PASSWORD",
    payload: axiosApiIntances.patch(
      `user/change-password/${userId}`,
      userPassword
    ),
  };
};

export const updateUserImage = (userId, userImage) => {
  return {
    type: "UPDATE_USER_IMAGE",
    payload: axiosApiIntances.patch(`user/updateImage/${userId}`, userImage),
  };
};
