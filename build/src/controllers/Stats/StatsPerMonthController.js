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
exports.winesPerMonth = exports.reviewsPerMonth = exports.itemsIncome = exports.incomePerMonth = exports.ordersPerMonth = exports.usersPerMonth = void 0;
const User_1 = __importDefault(require("../../models/User"));
const ShoppingOrder_1 = __importDefault(require("../../models/ShoppingOrder"));
const Wine_1 = __importDefault(require("../../models/Wine"));
const Review_1 = __importDefault(require("../../models/Review"));
const date = new Date();
const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
const usersPerMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield User_1.default.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ]);
    return data;
});
exports.usersPerMonth = usersPerMonth;
const ordersPerMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ShoppingOrder_1.default.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ]);
    return data;
});
exports.ordersPerMonth = ordersPerMonth;
const incomePerMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ShoppingOrder_1.default.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$orderTotal",
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ]);
    return data;
});
exports.incomePerMonth = incomePerMonth;
const itemsIncome = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ShoppingOrder_1.default.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $unwind: {
                path: '$items'
            }
        }, {
            $group: {
                _id: '$items.id',
                item: {
                    $first: '$items.title'
                },
                unit_price: {
                    $first: '$items.unit_price'
                },
                count: {
                    $sum: 1
                }
            }
        }
    ]);
    return data;
});
exports.itemsIncome = itemsIncome;
const reviewsPerMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Review_1.default.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ]);
    return data;
});
exports.reviewsPerMonth = reviewsPerMonth;
const winesPerMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ]);
    return data;
});
exports.winesPerMonth = winesPerMonth;
