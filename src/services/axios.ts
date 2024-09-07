import { config } from "../config";
import axios from "axios";
export async function fetchUserService(userName: string) {
  try {
    const response = await axios.get(`${config.BASE_URL}/users/${userName}`);
    
    return response.data;
  } catch (error: any) {
    if (error.response.statusText === "Not Found") {
      return "Not Found";
    } else {
      throw error;
    }
  }
}

;


export async function fetchRepoService(userName: string) {
  try {
    const response = await axios.get(`${config.BASE_URL}/users/${userName}/repos`);
    return response.data;
  } catch (error: any) {
    if (error.response.statusText === "Not Found") {
      return "Not Found";
    } else {
      throw error;
    }
  }
}
