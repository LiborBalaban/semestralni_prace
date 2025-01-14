// api.js
import axios from "axios";

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { withCredentials: true });
    return response.data.documents; // Očekáváme, že odpověď má strukturu s "documents"
  } catch (error) {
    console.error("Chyba při získávání dat:", error);
    return null; // Vrátíme null při chybě
  }
};