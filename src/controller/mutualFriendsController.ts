import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import {
  createMutualFriends,
  isMutualFriendsExist,
} from "../dataBase/repository/mutualFriendsRepo";
import { fetchMutualFriendsService } from "../services/mutualFriendsService";

export async function fetchMutualFriends(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userName, followingCount, followersCount } = req.body;

    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let existingMutualFriends = await isMutualFriendsExist(userName);
    if (existingMutualFriends) {
      res.status(200).json({ status: 200, data: existingMutualFriends });
    } else {
      let mutualFriends = await fetchMutualFriendsService(
        userName,
        followingCount,
        followersCount
      );
      let updatedMutualFriendStructure = {
        userName: userName as string,
        friends: mutualFriends as string[],
      };

      await createMutualFriends(updatedMutualFriendStructure);
      res.status(200).json({ status: 200, data: updatedMutualFriendStructure });
    }
  } catch (error) {
    throw error;
  }
}
