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
exports.fetchUser = fetchUser;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const repository_1 = require("../dataBase/repository/repository");
const axios_1 = require("../services/axios");
function fetchUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("reaching controller");
            const userName = req.body.userName;
            console.log("reaching controller", userName);
            if (!userName)
                next(new errorHandler_1.default(400, "User name should be provided"));
            let existingUser = yield (0, repository_1.isExist)(userName);
            if (existingUser) {
                res.status(200).json({ status: 200, data: existingUser });
            }
            else {
                let user = yield (0, axios_1.fetchUserService)(userName);
                if (user === "Not Found") {
                    res.status(404).json({ status: 404, message: "Not Found" });
                }
                else {
                    let result = yield (0, repository_1.createUser)(user);
                    if (result) {
                        res.status(200).json({ status: 200, data: user });
                    }
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
