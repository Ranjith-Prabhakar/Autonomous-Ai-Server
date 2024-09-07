import {  TRepo } from "../../types/repositoryModel";
import repoModel from "../model/repoModel";

export async function isRepoExist(userName: string) {
  try {
    let repo = await repoModel.find({
      "owner.login": userName,
    });
    return repo;
  } catch (error) {
    throw error;
  }
}

export async function createRepo(repo: TRepo) {
  try {
    let result = await repoModel.create(repo);
    await result.save();
    return repo;
  } catch (error) {
    throw error;
  }
}
