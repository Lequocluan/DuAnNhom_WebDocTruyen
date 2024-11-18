import axios from "axios";

const GET = async (url, token = '') => {
    let data = null, message = null, error = null;
  
    try {
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.status < 400) {
        data = response.data.body?.data ?? null;
        message = response.data.body?.message ?? null;
      } else {
        error = response.data.body?.message ?? "Unknown error from server.";
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      error = err.response?.data?.body?.message || err.message || "Unknown error.";
    }
    return { data, message, error };
  };
  
export {GET}