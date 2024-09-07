"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const followersListSchema = new mongoose_1.default.Schema({
    userName: { type: String },
    followers: [
        {
            login: { type: String },
            id: { type: Number },
            node_id: { type: String },
            avatar_url: { type: String },
            gravatar_id: { type: String },
            url: { type: String },
            html_url: { type: String },
            followers_url: { type: String },
            following_url: { type: String },
            gists_url: { type: String },
            starred_url: { type: String },
            subscriptions_url: { type: String },
            organizations_url: { type: String },
            repos_url: { type: String },
            events_url: { type: String },
            received_events_url: { type: String },
            type: { type: String },
            site_admin: { type: Boolean },
        },
    ],
}, {
    timestamps: true,
});
const followersModel = mongoose_1.default.model("followers", followersListSchema);
exports.default = followersModel;
