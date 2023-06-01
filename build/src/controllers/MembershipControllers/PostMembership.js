"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Membeship_1 = __importDefault(require("../../models/Membeship"));
const User_1 = __importDefault(require("../../models/User"));
const postMembership = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const newMembership = new Membeship_1.default({
        name: (_a = data.data) === null || _a === void 0 ? void 0 : _a.reason,
        price: (_c = (_b = data.data) === null || _b === void 0 ? void 0 : _b.auto_recurring) === null || _c === void 0 ? void 0 : _c.transaction_amount,
        user_id: user,
        isActive: true
    });
    const createdMembership = yield newMembership.save();
    const getUser = yield User_1.default.findById(user);
    getUser === null || getUser === void 0 ? void 0 : getUser.membership_id.concat(createdMembership._id);
    const updatedUser = yield getUser.save();
    return createdMembership;
});
exports.default = postMembership;
