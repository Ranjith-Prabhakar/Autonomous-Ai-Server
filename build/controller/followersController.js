"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFollowers = fetchFollowers;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const followersRepository_1 = require("../dataBase/repository/followersRepository");
const followersService_1 = require("../services/followersService");
function fetchFollowers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userName } = req.body;
            if (!userName)
                next(new errorHandler_1.default(400, "User name should be provided"));
            let existingRepo = yield (0, followersRepository_1.isFollowerListExist)(userName);
            if (existingRepo) {
                res.status(200).json({ status: 200, data: existingRepo });
            }
            else {
                let followersList = yield (0, followersService_1.fetchFollowersService)(userName);
                if (followersList === "Not Found") {
                    res.status(404).json({ status: 404, message: "Not Found" });
                }
                else {
                    let followerList = {
                        userName,
                        followers: followersList,
                    };
                    let result = yield (0, followersRepository_1.createFollowersList)(followerList);
                    if (result) {
                        res.status(200).json({ status: 200, data: followerList });
                    }
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
