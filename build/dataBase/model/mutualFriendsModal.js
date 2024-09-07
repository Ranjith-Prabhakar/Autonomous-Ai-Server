"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mutualFriendSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    friends: [{ type: String }],
}, {
    timestamps: true,
});
const mutualFriendsModel = mongoose_1.default.model("mutualFriends", mutualFriendSchema);
exports.default = mutualFriendsModel;
