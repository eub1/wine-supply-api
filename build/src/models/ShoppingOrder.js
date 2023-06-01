"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { model, Schema } = mongoose_1.default;
const ShoppingOrderSchema = new Schema({
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
    user: { type: String, required: true },
    order_address: { type: String, trim: true, required: true },
    items: { type: [Object] },
    orderDate: { type: Date, default: Date.now },
    payment: { type: String },
    shippingMethod: { type: String, trim: true },
    orderTotal: { type: Number, trim: true },
    orderStatus: { type: Number, trim: true },
}, { timestamps: true });
const ShoppingOrder = model('ShoppingOrder', ShoppingOrderSchema);
exports.default = ShoppingOrder;
