"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const Index_1 = __importDefault(require("./routes/Index"));
const cors_1 = __importDefault(require("cors"));
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
exports.app = (0, express_1.default)();
exports.app.use(morgan('dev'));
exports.app.use(express_1.default.json());
exports.app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './temporalImg/'
}));
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.use('/', Index_1.default);
exports.app.get('/test', (req, res) => {
    try {
        res.send('Hello World');
    }
    catch (error) {
        console.log(error.message);
    }
});
