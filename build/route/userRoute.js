"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = userRoute;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
function userRoute() {
    console.log("reaching the router");
    const router = express_1.default.Router();
    router.post("/fetchUser", userController_1.fetchUser);
    return router;
}
