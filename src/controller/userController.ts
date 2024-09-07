import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import {
  createUser,
  fetchSortedUsers,
  getUserByLocation,
  isUserExist,
  softDeleteUser,
  updateUser,
} from "../dataBase/repository/userRepository";
import { fetchUserService } from "../services/axios";

export async function fetchUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userName = req.body.userName;
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let existingUser = await isUserExist(userName);
    if (existingUser) {
      res.status(200).json({ status: 200, data: existingUser });
    } else {
      let user = await fetchUserService(userName);

      if (user === "Not Found") {
        res.status(404).json({ status: 404, message: "Not Found" });
      } else {
        let result = await createUser(user);
        if (result) {
          res.status(200).json({ status: 200, data: user });
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchUserByLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const location = req.body.location;
    if (!location) next(new ErrorHandler(400, "User name should be provided"));
    let user = await getUserByLocation(location);
    res.json(...user);
  } catch (error) {
    throw error;
  }
}

export async function freezUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userName, value } = req.body;
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let user = await softDeleteUser(userName, value);
    res.json({ user });
  } catch (error) {
    throw error;
  }
}

export async function updateUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userName, key, value } = req.body;
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let user = await updateUser(userName, key, value);
    res.json(user);
  } catch (error) {
    throw error;
  }
}


export async function getSortedUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { key, sortValue } = req.body;
    if (!key) next(new ErrorHandler(400, "Relevent data should be provided"));
    let user = await fetchSortedUsers(key, sortValue);
    res.send(user);
  } catch (error) {
    throw error;
  }
}
