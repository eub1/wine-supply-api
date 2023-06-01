"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// const ObjectId = mongoose.Types.ObjectId;
const WineSchema = new Schema({
    // _id: ObjectId,
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    body: { type: String, required: true },
    cropYear: { type: Number, required: true },
    origin: { type: String, required: true },
    zone: { type: String, required: true },
    volume: { type: Number, required: true },
    alcoholVolume: { type: Number, required: true },
    rating: Number,
    images: { type: [String], required: true },
    strain: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    review_id: [
        { type: mongoose_1.default.Types.ObjectId, ref: "Review" }
    ],
    isActive: { type: Boolean, default: true }
});
const WineModel = mongoose_1.default.model('Wine', WineSchema);
exports.default = WineModel;
