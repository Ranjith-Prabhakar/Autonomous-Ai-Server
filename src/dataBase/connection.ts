import mongoose from "mongoose";
import {config} from "../config"; 

export function connectDb() {
  try {
    mongoose
      .connect(config.DB_URL)
      .then((data) => {
        console.log("db connected");
      })
      .catch((err) => console.log("error while db connecting :", err.message));
  } catch (error) {
    throw error;
  }
}
