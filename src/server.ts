import express from "express";
import { connectDb } from "./dataBase/connection";
import { config } from "./config";
import { expressApp } from "./expressApp";

async function start() {
  const app = express();
  connectDb();
  expressApp(app);
  app.listen(config.PORT, () =>
    console.log(`server listening on port http://localhost:${config.PORT}`)
  );
}

start();
