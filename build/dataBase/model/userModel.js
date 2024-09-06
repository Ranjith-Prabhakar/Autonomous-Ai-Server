"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GitHubUserSchema = new mongoose_1.default.Schema({
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
    name: { type: String, default: null },
    company: { type: String, default: null },
    blog: { type: String },
    location: { type: String, default: null },
    email: { type: String, default: null },
    hireable: { type: Boolean, default: null },
    bio: { type: String, default: null },
    twitter_username: { type: String, default: null },
    public_repos: { type: Number },
    public_gists: { type: Number },
    followers: { type: Number },
    following: { type: Number },
    created_at: { type: String },
    updated_at: { type: String },
}, {
    timestamps: true,
});
const userModel = mongoose_1.default.model("GitHubUser", GitHubUserSchema);
exports.default = userModel;
