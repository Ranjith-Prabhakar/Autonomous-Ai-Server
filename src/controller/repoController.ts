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
    const { userName } = req.body;
    if (!userName) next(new ErrorHandler(400, "User name should be provided"));
    let existingRepo = await isRepoExist(userName);
    console.log("existingRepo", existingRepo);
    if (existingRepo.length > 0) {
      res.status(200).json({ status: 200, data: existingRepo });
    } else {
      let repo = await fetchRepoService(userName);
      console.log("repo", repo);
      if (repo === "Not Found") {
        res.status(404).json({ status: 404, message: "Not Found" });
      } else {
        let newRepo = {
          userName,
          repositories: repo,
        };
        let result = await createRepo(newRepo);
        if (result) {
          res.status(200).json({ status: 200, data: result });
        }
      }
    }
  } catch (error) {
    throw error;
  }
}
