import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCategories = () => {
  return axios
    .get(`${apiUrl}/category`, {})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching categories:", error);
      throw error;
    });
};

export const createCategory = async (category, token) => {
  try {
    const response = await axios.post(`${apiUrl}/category`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const deleteCategory = async (id, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateCategoryTitle = async (categoryId, newTitle, token) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/category/${categoryId}`,
      { title: newTitle },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
