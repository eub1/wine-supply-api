"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
// import cors from "cors";
exports.app = (0, express_1.default)();
exports.app.use(morgan('dev'));
exports.app.use(express_1.default.json());
exports.app.get("/", (_req, res) => {
    try {
        console.log("db online");
        res.send("database");
    }
    catch (error) {
        throw new Error(error);
    }
});
