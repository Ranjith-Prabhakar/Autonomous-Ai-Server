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
exports.fetchRepo = fetchRepo;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const repoRepository_1 = require("../dataBase/repository/repoRepository");
const axios_1 = require("../services/axios");
function fetchRepo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("reaching controller");
            const { userName, repos_url } = req.body;
            console.log("reaching controller", userName, repos_url);
            if (!userName)
                next(new errorHandler_1.default(400, "User name should be provided"));
            if (!repos_url)
                next(new errorHandler_1.default(400, "Repo url should be provided"));
            let existingRepo = yield (0, repoRepository_1.isRepoExist)(userName);
            if (existingRepo) {
                res.status(200).json({ status: 200, data: existingRepo });
            }
            else {
                let repo = yield (0, axios_1.fetchRepoService)(repos_url);
                if (repo === "Not Found") {
                    res.status(404).json({ status: 404, message: "Not Found" });
                }
                else {
                    let result = yield (0, repoRepository_1.createRepo)(repo);
                    if (result) {
                        res.status(200).json({ status: 200, data: repo });
                    }
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
