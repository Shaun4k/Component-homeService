import axios from "axios";

const registerCall = async (agentId) => {
  try {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/start-call`,
        {},
        {
          headers: {
            "agentX-ID": agentId,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Conversation error:", error.message);
      throw error;
    }
  } catch (err) {
    throw err;
  }
};

export default registerCall;
