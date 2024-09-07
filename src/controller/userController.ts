import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import { createUser, isUserExist } from "../dataBase/repository/userRepository";
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
