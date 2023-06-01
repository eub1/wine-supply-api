"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PromotionSchema = new Schema({
    name: String,
    description: String,
    discount_rate: Number,
    startDate: Date,
    endDate: Date
});
const PromotionModel = mongoose_1.default.model('Promotion', PromotionSchema);
exports.default = PromotionModel;
