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
const express_1 = require("express");
const Review_1 = __importDefault(require("../../../models/Review"));
const router = (0, express_1.Router)();
//* /admin/reviews
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.default.find().sort({ _id: -1 }).lean();
        if (reviews.length === 0) {
            res.status(404).send("No orders found");
        }
        ;
        console.log("reviews", reviews);
        const parsedReviews = reviews.map((e) => {
            return {
                id: e._id,
                date: e.date,
                comment: e.comment,
                rating: e.rating,
                username: e.username,
                user_id: e.user_id,
                wine_id: e.user_id,
                isActive: e.user_id,
            };
        });
        console.log("parsedReviews", parsedReviews);
        let total = parsedReviews.length;
        res.header({ 'content-Range': `parsedReviews 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
        return res.status(200).send(parsedReviews);
    }
    catch (error) {
        return res.status(404).send("Can't get reviews!");
    }
}));
exports.default = router;
