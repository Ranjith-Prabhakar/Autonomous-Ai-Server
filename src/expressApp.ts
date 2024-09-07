import express, { Express } from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userRoute } from "./route/routes";

export const expressApp = (app: Express) => {
  console.log("eached at express app");
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    console.log("request middleware");
    next();
  });
  app.use(
    cors({
      origin: "*",
    })
  );
  //  routes
  app.use(userRoute());
  // error handler
  app.use(errorMiddleware);
};
