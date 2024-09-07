import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import {
  createUser,
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
    console.log("reaching controller");
    const userName = req.body.userName;
    console.log("reaching controller", userName);
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
    console.log("reaching controller");
    const location = req.body.location;
    console.log("reaching controller", location);
    if (!location) next(new ErrorHandler(400, "User name should be provided"));
    let user = await getUserByLocation(location);
    console.log("user", user);
    res.end();
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
    console.log("reaching controller");
    const { userName, value } = req.body;
    console.log("reaching controller", userName);
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let user = await softDeleteUser(userName, value);
    console.log("user", user);
    res.end();
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
    console.log("reaching controller");
    const { userName, key, value } = req.body;
    console.log("reaching controller", userName);
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let user = await updateUser(userName, key, value);
    console.log("user", user);
    res.end();
  } catch (error) {
    throw error;
  }
}
