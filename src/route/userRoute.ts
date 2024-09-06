import express from 'express';
import { fetchUser } from '../controller/userController';

export function userRoute() {
  console.log("reaching the router")
  const router = express.Router();

  router.post("/fetchUser", fetchUser);
  return router;
}
