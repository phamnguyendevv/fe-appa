import axios from "axios";
import { API_BASE_URL } from "../config/congif";

export const getProducts = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/product/list`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
