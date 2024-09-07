import axios from "axios";
import { config } from "../config";

export async function fetchFollowersService(userName: string) {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/users/${userName}/followers`
    );
    return response.data;
  } catch (error: any) {
    if (error.response.statusText === "Not Found") {
      return "Not Found";
    } else {
      throw error;
    }
  }
}
