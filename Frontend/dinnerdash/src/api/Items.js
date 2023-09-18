import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchItems = () => {
  return axios
    .get(`${apiUrl}/items`, {})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching categories:", error);
      throw error;
    });
};

export const createItems = async (formData, token) => {
  try {
    const response = await axios.post(`${apiUrl}/items`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateItem = async (itemId, updatedItem, token) => {
  try {
    const response = await axios.put(`${apiUrl}/items/${itemId}`, updatedItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateInStock = async (itemId, token) => {
  try {
    const response = await axios.put(`${apiUrl}/items/stock/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateNotInStock = async (itemId, token) => {
  try {
    const response = await axios.put(`${apiUrl}/items/stocknot/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateItemPhoto = async (itemId, formData, token) => {
  try {
    const response = await axios.put(
      `${apiUrl}/items/photo/${itemId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteItem = async (itemId, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const fetchItemsByCategories = (categoryIds) => {
  const categoryIdsString = categoryIds.length > 0 ? categoryIds.join(",") : "";

  return axios
    .get(`${apiUrl}/items/category/${categoryIdsString}`, {})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching items by categories:", error);
      throw error;
    });
};

export const fetchItemById = (itemId) => {
  return axios
    .get(`${apiUrl}/items/${itemId}`, {})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching item by ID:", error);
      throw error;
    });
};
