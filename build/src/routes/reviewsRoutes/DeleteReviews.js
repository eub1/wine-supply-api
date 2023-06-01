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
const DeleteReview_1 = __importDefault(require("../../controllers/ReviewsControllers/DeleteReview"));
const Updaterating_1 = __importDefault(require("../../controllers/ReviewsControllers/Updaterating"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, wine_id } = req.body;
    try {
        const review = yield (0, DeleteReview_1.default)(user_id, wine_id);
        if (!review)
            return res.status(404).send("No review to delete");
        res.status(200).send(`Review deleted successfully!`);
        const update = yield (0, Updaterating_1.default)(wine_id);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
exports.default = router;
