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
// import Review from "../models/Review";
const postWine = (name, brand, description, type, body, cropYear, origin, zone, volume, alcoholVolume, rating, images, strain, stock, price) => __awaiter(void 0, void 0, void 0, function* () {
    const newWine = new Wine_1.default({
        name,
        brand,
        description,
        type,
        body,
        cropYear,
        origin,
        zone,
        volume,
        alcoholVolume,
        rating,
        images,
        strain,
        stock,
        price
    });
    const createdWine = yield newWine.save();
    return createdWine;
});
exports.default = postWine;
