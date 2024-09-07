"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const routes_1 = require("./route/routes");
const expressApp = (app) => {
    console.log("eached at express app");
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        console.log("request middleware");
        next();
    });
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    //  routes
    app.use((0, routes_1.userRoute)());
    // error handler
    app.use(errorMiddleware_1.errorMiddleware);
};
exports.expressApp = expressApp;
