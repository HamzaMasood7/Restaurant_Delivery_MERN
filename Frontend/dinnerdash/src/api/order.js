import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const createOrder = async (userId, order, token) => {
  try {
    const response = await axios.post(`${apiUrl}/order/${userId}`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getOrdersByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/order/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
export const getOrdersByState = async (state, token) => {
  try {
    const response = await axios.get(`${apiUrl}/order/state/${state}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateOrderState = async (orderId, state, token) => {
  try {
    const response = await axios.put(
      `${apiUrl}/order/${orderId}`,
      { state },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getOrdersById = async (orderId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
