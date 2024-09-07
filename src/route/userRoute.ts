import express from "express";
import { fetchUser } from "../controller/userController";
import { fetchRepo } from "../controller/repoController";
import { fetchMutualFriends } from "../controller/mutualFriendsController";

export function userRoute() {
  console.log("reaching the router");
  const router = express.Router();

  router.post("/fetchUser", fetchUser);
  router.post("/fetchRepo", fetchRepo);
  router.post("/fetchMutualFriends", fetchMutualFriends);
  return router;
}
