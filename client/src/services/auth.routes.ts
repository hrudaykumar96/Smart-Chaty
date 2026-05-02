import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const signUpUser = async (values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/create-user`, values);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return "Internal Server Error";
  }
};

export const loginUser = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, values);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return "Internal Server Error";
  }
};

export const fetchProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return "Internal Server Error";
  }
};

export const updatePassword = async (values: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/update-password`,
      values,
    );
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return "Internal Server Error";
  }
};
