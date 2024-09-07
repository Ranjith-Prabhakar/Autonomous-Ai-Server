"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = userRoute;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const repoController_1 = require("../controller/repoController");
const mutualFriendsController_1 = require("../controller/mutualFriendsController");
const followersController_1 = require("../controller/followersController");
function userRoute() {
    const router = express_1.default.Router();
    router.post("/fetchUser", userController_1.fetchUser);
    router.post("/fetchRepo", repoController_1.fetchRepo);
    router.post("/fetchFollowers", followersController_1.fetchFollowers);
    router.post("/fetchMutualFriends", mutualFriendsController_1.fetchMutualFriends);
    router.post("/fetchUserByLocation", userController_1.fetchUserByLocation);
    router.patch("/softDeleteUser", userController_1.freezUser);
    router.patch("/updateUserInfo", userController_1.updateUserInfo);
    router.post("/getSortedUsers", userController_1.getSortedUsers);
    return router;
}
