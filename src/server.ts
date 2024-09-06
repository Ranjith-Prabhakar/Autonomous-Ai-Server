import express from "express";
import { connectDb } from "./dataBase/connection";
import { config } from "./config";

function start() {
  const app = express();
  connectDb()
  app.listen(config.PORT, () =>
    console.log(`server listening on port http://localhost:${config.PORT}`)
  );
}

start(); 