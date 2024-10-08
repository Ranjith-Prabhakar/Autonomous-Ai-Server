import { Request, Response } from "express";
import ErrorResponse from "./errorHandler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMiddleware = (err: any, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";
  console.log("inside error middleware #############", err.message, err.status);
  console.log("req.path", req.path);
  console.error(err);

  //wrong mongoDb id
  if (err.name === "castError") {
    const message = `Resource not found, invalid:${err.path}`;
    err = new ErrorResponse(400, message);
  }
  //duplicate key error =>for authentication
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorResponse(400, message);
  }
  //wrong jwt error
  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid,try again`;
    err = new ErrorResponse(400, message);
  }
  //token expired error
  if (err.name === "TokenExpiredError") {
    const message = `json web token has expired`;
    err = new ErrorResponse(400, message);
  }

  res.status(err.statusCode).json({
    status: err.statusCode,
    success: false,
    message: err.message,
  });
};
