import axiosApiIntances from "../../Utils/axios";

export const postPremiere = (data) => {
  return {
    type: "INSERT_PREMIERE",
    payload: axiosApiIntances.post(`premiere`, data),
  };
};
