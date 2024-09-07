import { IGitHubUser } from "../../types/userModal";
import userModel from "../model/userModel";

export async function isUserExist(userName: string) {
  try {
    let user = await userModel.findOne({ login: userName });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function createUser(user: IGitHubUser) {
  try {
    let result = await userModel.create(user);
    result.save();
    return user;
  } catch (error) {
    throw error;
  }
}
