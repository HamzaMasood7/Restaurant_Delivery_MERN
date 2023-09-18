import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${apiUrl}/user/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
