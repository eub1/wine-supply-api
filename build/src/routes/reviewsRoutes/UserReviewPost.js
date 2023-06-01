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
const CheckUserReviews_1 = __importDefault(require("../../controllers/ReviewsControllers/CheckUserReviews"));
const PostReview_1 = __importDefault(require("../../controllers/ReviewsControllers/PostReview"));
const Updaterating_1 = __importDefault(require("../../controllers/ReviewsControllers/Updaterating"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, wine_id, username, comment, rating } = req.body;
    const review = yield (0, CheckUserReviews_1.default)(user_id, wine_id);
    console.log(review.length);
    if (review.length > 0) {
        return res.status(400).json({ message: "You already have a review for this wine" });
    }
    const validate = user_id && wine_id && username && comment && rating ? true : false;
    if (!validate)
        return res.status(400).json({ message: `Missing data!` });
    try {
        const newReview = (yield (0, PostReview_1.default)(user_id, wine_id, username, comment, rating)) || null;
        const update = (yield (0, Updaterating_1.default)(wine_id)) || null;
        if (!newReview || !update)
            res.status(400).json({ message: `Somenthing went wrong, review not posted!` });
        else {
            res.status(200).json({ message: `Review posted successfully!` });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}));
exports.default = router;
