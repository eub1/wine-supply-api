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
const GetWineReviews_1 = __importDefault(require("./GetWineReviews"));
const Wine_1 = __importDefault(require("../../models/Wine"));
const updateRatings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield (0, GetWineReviews_1.default)(id);
        const ratingsReviews = review.map(e => e.rating);
        const init = 0;
        let NewRating = Math.round(ratingsReviews.reduce((e, total) => total + e, init) / ratingsReviews.length);
        const updateWine = yield Wine_1.default.findByIdAndUpdate(id, { rating: NewRating });
        return updateWine;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.default = updateRatings;
