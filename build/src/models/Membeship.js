"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MembershipSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    isPremium: { type: Boolean, required: true }
}, { timestamps: true });
const MembershipModel = mongoose_1.default.model('Membership', MembershipSchema);
exports.default = MembershipModel;
