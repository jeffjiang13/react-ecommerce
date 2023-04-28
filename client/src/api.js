import axios from "axios";

const API_URL = "https://react-ecommerce-7d0j.onrender.com";

export const loginUser = async (email, password) => {

  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Extract error details from the server response
      const serverError = error.response.data.error;
      const errorMessage =
        serverError.message || serverError.details.errors[0].message;
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/local/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Extract error details from the server response
      const serverError = error.response.data.error;
      const errorMessage =
        serverError.message || serverError.details.errors[0].message;
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
