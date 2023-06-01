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
const PutReview_1 = __importDefault(require("../../controllers/ReviewsControllers/PutReview"));
const Updaterating_1 = __importDefault(require("../../controllers/ReviewsControllers/Updaterating"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { review_id, wine_id, comment, rating } = req.body;
    if (typeof comment !== "string" || typeof rating !== "number")
        return res.status(400).send("Invalid data");
    if (rating < 0 || rating > 5)
        return res.status(400).send("Number");
    const validate = review_id && comment && rating ? true : false;
    if (!validate)
        return res.status(400).send(`Missing data!`);
    try {
        const newReview = yield (0, PutReview_1.default)(review_id, comment, rating);
        const update = yield (0, Updaterating_1.default)(wine_id);
        res.status(200).send(`Review edited successfully!`);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
exports.default = router;
