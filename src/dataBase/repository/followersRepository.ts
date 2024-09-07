import { TFollowersList } from "../../types/followersModel";
import { IGitHubRepository } from "../../types/repositoryModel";
import followersModel from "../model/followersModel";

export async function isFollowerListExist(userName: string) {
  try {
    let repo = await followersModel.findOne({ userName });
    return repo;
  } catch (error) {
    throw error;
  }
}

export async function createFollowersList(followersList: TFollowersList) {
  try {
    let result = await followersModel.create(followersList);
    await result.save();
    return true;
  } catch (error) {
    throw error;
  }
}
