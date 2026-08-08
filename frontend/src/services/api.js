import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/generate-ui";

export const generateDashboard = async (text, file) => {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("request", text);

  try {

    const response = await axios.post(
      API_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;

  } catch (error) {

    if (error.response?.status === 429) {

      throw new Error(
        "Gemini API limit reached. Please wait and try again."
      );

    }

    if (error.response?.data?.error) {

      throw new Error(
        error.response.data.error
      );

    }

    if (error.message === "Network Error") {

      throw new Error(
        "Cannot connect to the Flask server. Make sure the backend is running."
      );

    }

    throw new Error(
      "Request failed. Please try again."
    );
  }
};