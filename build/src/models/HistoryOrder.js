"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const HistoryOrderScheme = new Schema({
    shoppingOrder_id: { type: mongoose_1.default.Types.ObjectId, ref: "ShoppingOrder", required: true },
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
const HistoryOrder = model('HistoryOrder', HistoryOrderScheme);
exports.default = HistoryOrder;
