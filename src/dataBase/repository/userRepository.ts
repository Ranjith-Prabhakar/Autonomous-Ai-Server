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

export async function getUserByLocation(location: string) {
  try {
    const result = await userModel.find({
      location: { $regex: new RegExp(location, "i") },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteUser(userName: string, value: string) {
  try {
    const result = await userModel.updateOne(
      { login: userName },
      { $set: { userStatus: value } }
    );
    
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userName: string, key: string, value: string) {
  try {
    const result = await userModel.updateOne(
      { login: userName },
      { $set: { [key]: value } }
    );
    return result;
  } catch (error) {
    throw error;
  }
}
export async function fetchSortedUsers(key: string, value: string) {
  try {
    const sortOrder = value === "asc" ? 1 : -1; // Use 'asc' for ascending, 'desc' for descending
    const result = await userModel.find().sort({ [key]: sortOrder });
    return result;
  } catch (error) {
    throw error;
  }
}

