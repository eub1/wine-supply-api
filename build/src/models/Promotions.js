"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PromotionSchema = new Schema({
    wine_id: { type: mongoose_1.default.Types.ObjectId, ref: "Wine", required: true },
    name: { type: String, maxLength: 25, required: true, trim: true },
    description: { type: String, maxLength: 200, required: true, trim: true },
    discount_rate: { type: Number, default: 0, min: 0, max: 99 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const PromotionModel = mongoose_1.default.model('Promotion', PromotionSchema);
exports.default = PromotionModel;
