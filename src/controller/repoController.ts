import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import { createRepo, isRepoExist } from "../dataBase/repository/repoRepository";
import { fetchRepoService } from "../services/axios";
export async function fetchRepo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("reaching controller");
    const { userName, repos_url } = req.body;
    console.log("reaching controller", userName, repos_url);
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    if (!repos_url) next(new ErrorHandler(400, "Repo url should be provided"));
    let existingRepo = await isRepoExist(userName);
    if (existingRepo) {
      res.status(200).json({ status: 200, data: existingRepo });
    } else {
      let repo = await fetchRepoService(repos_url);

      if (repo === "Not Found") {
        res.status(404).json({ status: 404, message: "Not Found" });
      } else {
        let result = await createRepo(repo);
        if (result) {
          res.status(200).json({ status: 200, data: repo });
        }
      }
    }
  } catch (error) {
    throw error;
  }
}
