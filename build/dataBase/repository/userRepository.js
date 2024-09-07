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
exports.isUserExist = isUserExist;
exports.createUser = createUser;
exports.getUserByLocation = getUserByLocation;
exports.softDeleteUser = softDeleteUser;
exports.updateUser = updateUser;
const userModel_1 = __importDefault(require("../model/userModel"));
function isUserExist(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield userModel_1.default.findOne({ login: userName });
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield userModel_1.default.create(user);
            result.save();
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
function getUserByLocation(location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userModel_1.default.find({
                location: { $regex: new RegExp(location, "i") },
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function softDeleteUser(userName, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userModel_1.default.updateOne({ login: userName }, { $set: { userStatus: value } });
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateUser(userName, key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userModel_1.default.updateOne({ login: userName }, { $set: { [key]: value } });
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
