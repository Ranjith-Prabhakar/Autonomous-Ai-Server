"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
function connectDb() {
    try {
        mongoose_1.default
            .connect(config_1.config.DB_URL)
            .then((data) => {
            console.log("db connected");
        })
            .catch((err) => console.log("error while db connecting :", err.message));
    }
    catch (error) {
        throw error;
    }
}
