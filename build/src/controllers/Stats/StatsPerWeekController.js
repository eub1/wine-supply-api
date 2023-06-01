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
exports.ordersPerWeek = exports.usersPerWeek = void 0;
const User_1 = __importDefault(require("../../models/User"));
const ShoppingOrder_1 = __importDefault(require("../../models/ShoppingOrder"));
const usersPerWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const data = yield User_1.default.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        {
            $project: {
                week: { $week: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$week",
                total: { $sum: 1 }
            }
        }
    ]);
    console.log(data[0]._id);
    return data;
});
exports.usersPerWeek = usersPerWeek;
const ordersPerWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const data = yield ShoppingOrder_1.default.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        {
            $project: {
                week: { $week: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$week",
                total: { $sum: 1 }
            }
        }
    ]);
    return data;
});
exports.ordersPerWeek = ordersPerWeek;
