import express from "express";
import {
  fetchUser,
  fetchUserByLocation,
  freezUser,
  getSortedUsers,
  updateUserInfo,
} from "../controller/userController";
import { fetchRepo } from "../controller/repoController";
import { fetchMutualFriends } from "../controller/mutualFriendsController";
import { fetchFollowers } from "../controller/followersController";

export function userRoute() {
  const router = express.Router();

  router.post("/fetchUser", fetchUser);
  router.post("/fetchRepo", fetchRepo);
  router.post("/fetchFollowers", fetchFollowers);
  router.post("/fetchMutualFriends", fetchMutualFriends);
  router.post("/fetchUserByLocation", fetchUserByLocation);
  router.patch("/softDeleteUser", freezUser);
  router.patch("/updateUserInfo", updateUserInfo);
  router.post("/getSortedUsers", getSortedUsers);
  return router;
}
