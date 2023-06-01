"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    // _id: ObjectId,
    name: { type: String, required: true, minLength: 1, maxLength: 25, trim: true },
    lastName: { type: String, required: true, minLength: 1, maxLength: 25, trim: true },
    userName: { type: String, required: true, minLength: 3, maxLength: 30, trim: true },
    email: { type: String, required: true, unique: true, minLength: 8, maxLength: 50, trim: true },
    hashedPass: { type: String, required: true },
    date_of_birth: { type: Date, required: false },
    recoverPass: { type: String },
    phone: { type: String, minLength: 6, maxLength: 15, trim: true },
    avatar: { type: [String], required: false },
    isAdmin: { type: String, default: "no" },
    isActive: { type: Boolean, default: true },
    membership_id: [
        { isMember: { type: Boolean, default: false } },
        { type: mongoose_1.default.Types.ObjectId, ref: "Membership" },
    ],
    address: [{}],
    shopping_cart: [{ type: mongoose_1.default.Types.ObjectId, ref: "Wine" }],
    order: [{ type: mongoose_1.default.Types.ObjectId, ref: "ShoppingOrder" }],
    whishList: [{ type: mongoose_1.default.Types.ObjectId, ref: "Wine" }]
}, { timestamps: true });
/* PULIR EL REQUERIMIENTO TENIENDO EN CUENTA SIGNUP (A FUTURO)*/
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
