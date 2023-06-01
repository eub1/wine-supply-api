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
const Wine_1 = __importDefault(require("../models/Wine"));
const getRecommendedWines = () => __awaiter(void 0, void 0, void 0, function* () {
    const wineRating = yield Wine_1.default.find({ isActive: true });
    let sortOrderRating = wineRating.sort((a, b) => {
        if (a.rating > b.rating)
            return -1;
        if (a.rating < b.rating)
            return 1;
        return 0;
    });
    let wineRecomend = [];
    for (let i = 0; i < 10; i++) {
        wineRecomend.push(sortOrderRating[i]);
    }
    return wineRecomend;
});
exports.default = getRecommendedWines;
