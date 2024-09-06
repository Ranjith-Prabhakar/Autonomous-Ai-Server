import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT as string,
  DB_URL: process.env.DB_URL as string,
  BASE_URL: process.env.BASE_URL as string,
};
