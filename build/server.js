"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./dataBase/connection");
const config_1 = require("./config");
function start() {
    const app = (0, express_1.default)();
    (0, connection_1.connectDb)();
    app.listen(config_1.config.PORT, () => console.log(`server listening on port http://localhost:${config_1.config.PORT}`));
}
start();
