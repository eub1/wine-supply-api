"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MembershipSchema = new Schema({
    name: { type: String },
    price: { type: Number, required: true },
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
const MembershipModel = mongoose_1.default.model('Membership', MembershipSchema);
exports.default = MembershipModel;
