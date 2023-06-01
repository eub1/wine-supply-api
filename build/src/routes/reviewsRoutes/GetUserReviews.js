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
const GetUserReviews_1 = __importDefault(require("../../controllers/ReviewsControllers/GetUserReviews"));
const router = (0, express_1.Router)();
router.get("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    //console.log(user_id);
    try {
        const review = (yield (0, GetUserReviews_1.default)(user_id)) || null;
        if (!review)
            res.status(404).json({ message: "User has not reviews" });
        res.status(200).json(review);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.default = router;
