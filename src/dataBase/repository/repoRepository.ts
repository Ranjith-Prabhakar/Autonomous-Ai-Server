import { IGitHubRepository } from "../../types/repositoryModel";
import repoModel from "../model/repoModel";

export async function isRepoExist(userName: string) {
  try {
    let repo = await repoModel.findOne({ "owner.login": userName });
    return repo;
  } catch (error) {
    throw error;
  }
}

export async function createRepo(repo: IGitHubRepository) {
  try {
    let result = await repoModel.create(repo);
    result.save();
    return repo;
  } catch (error) {
    throw error;
  }
}
