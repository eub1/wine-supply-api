"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const PORT = 3001;
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log(`Listening on port ${PORT}`);
    app_1.app.listen(PORT);
}).catch((error) => { 'connection failed due to error: ' + error.message; });
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "mongoDB connection error"));
