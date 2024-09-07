import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import {
  createFollowersList,
  isFollowerListExist,
} from "../dataBase/repository/followersRepository";
import { fetchFollowersService } from "../services/followersService";

export async function fetchFollowers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userName } = req.body;
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let existingRepo = await isFollowerListExist(userName);
    if (existingRepo) {
      res.status(200).json({ status: 200, data: existingRepo });
    } else {
      let followersList = await fetchFollowersService(userName);

      if (followersList === "Not Found") {
        res.status(404).json({ status: 404, message: "Not Found" });
      } else {
        let followerList = {
          userName,
          followers: followersList,
        };
        let result = await createFollowersList(followerList);
        if (result) {
          res.status(200).json({ status: 200, data: followerList });
        }
      }
    }
  } catch (error) {
    throw error;
  }
}
