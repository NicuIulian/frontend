const { default: axiosInstance } = require(".");

const URL = "https://server-zby7.onrender.com";

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${URL}/api/users/register`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${URL}/api/users/login`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post(`${URL}/api/users/get-user-info`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `${URL}/api/users/update-user`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
