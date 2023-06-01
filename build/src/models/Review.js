"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ReviewSchema = new Schema({
    date: { type: Date, default: Date.now },
    comment: { type: String, maxLength: 200, trim: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
    wine_id: { type: mongoose_1.default.Types.ObjectId, ref: "Wine", required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const ReviewModel = mongoose_1.default.model('Review', ReviewSchema);
exports.default = ReviewModel;
