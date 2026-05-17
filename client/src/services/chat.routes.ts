import axios from "axios";

const API_URL = import.meta.env.VITE_CHAT_URL;

export const newChatAPI = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/new-chat`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return "Internal Server Error";
  }
};

export const fetchChatAPI = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/get-chats`, {
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

export const deleteChatAPI = async (
  token: string,
  values: { chatId: string },
) => {
  try {
    const response = await axios.post(`${API_URL}/delete-chat`, values, {
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
