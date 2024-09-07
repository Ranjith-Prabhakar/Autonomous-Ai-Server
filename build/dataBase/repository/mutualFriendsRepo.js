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
exports.isMutualFriendsExist = isMutualFriendsExist;
exports.createMutualFriends = createMutualFriends;
const mutualFriendsModal_1 = __importDefault(require("../model/mutualFriendsModal"));
function isMutualFriendsExist(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mutualFriends = yield mutualFriendsModal_1.default.findOne({ userName });
            return mutualFriends;
        }
        catch (error) {
            throw error;
        }
    });
}
function createMutualFriends(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userName, friends, }) {
        try {
            let saveMutualFriends = yield mutualFriendsModal_1.default.create({
                userName,
                friends,
            });
            yield saveMutualFriends.save();
            return true;
        }
        catch (error) {
            throw error;
        }
    });
}
