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
const GetWineReviews_1 = __importDefault(require("../../controllers/ReviewsControllers/GetWineReviews"));
const router = (0, express_1.Router)();
router.get("/:wine_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wine_id } = req.params;
    try {
        const review = (yield (0, GetWineReviews_1.default)(wine_id)) || null;
        if (!review)
            res.status(404).json({ message: "Wine has not reviews" });
        res.status(200).json(review);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
exports.default = router;
