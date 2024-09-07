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
exports.fetchMutualFriends = fetchMutualFriends;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const mutualFriendsRepo_1 = require("../dataBase/repository/mutualFriendsRepo");
const mutualFriendsService_1 = require("../services/mutualFriendsService");
function fetchMutualFriends(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userName, followingCount, followersCount } = req.body;
            if (!userName)
                next(new errorHandler_1.default(400, "User name should be provided"));
            let existingMutualFriends = yield (0, mutualFriendsRepo_1.isMutualFriendsExist)(userName);
            if (existingMutualFriends) {
                res.status(200).json({ status: 200, data: existingMutualFriends });
            }
            else {
                let mutualFriends = yield (0, mutualFriendsService_1.fetchMutualFriendsService)(userName, followingCount, followersCount);
                yield (0, mutualFriendsRepo_1.createMutualFriends)(userName, mutualFriends);
                res.status(200).json({ status: 200, data: mutualFriends });
            }
        }
        catch (error) {
            throw error;
        }
    });
}
