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
exports.fetchUserService = fetchUserService;
exports.fetchRepoService = fetchRepoService;
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
function fetchUserService(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${config_1.config.BASE_URL}/users/${userName}`);
            return response.data;
        }
        catch (error) {
            if (error.response.statusText === "Not Found") {
                return "Not Found";
            }
            else {
                throw error;
            }
        }
    });
}
function fetchRepoService(repos_url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${repos_url}`);
            return response.data;
        }
        catch (error) {
            if (error.response.statusText === "Not Found") {
                return "Not Found";
            }
            else {
                throw error;
            }
        }
    });
}
;
