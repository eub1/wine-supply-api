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
exports.getCropYear = exports.getName = exports.getBrand = exports.getType = exports.getOrigin = exports.getZones = exports.getStrains = exports.countWines = void 0;
const Wine_1 = __importDefault(require("../../models/Wine"));
//* CUENTA TODOS LOS VINOS
const countWines = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: null, count: { $count: {} } } }
    ]);
    return data;
});
exports.countWines = countWines;
//* por CEPA
const getStrains = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: { $toLower: "$strain" }, count: { $count: {} } } }
    ]);
    return data;
});
exports.getStrains = getStrains;
//* por ZONA
const getZones = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: { $toLower: "$zone" }, count: { $count: {} } } }
    ]);
    return data;
});
exports.getZones = getZones;
//* por ORIGEN
const getOrigin = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: { $toLower: "$origin" }, count: { $count: {} } } }
    ]);
    return data;
});
exports.getOrigin = getOrigin;
//* por tipo de VINO
const getType = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: { $toLower: "$type" }, count: { $count: {} } } }
    ]);
    return data;
});
exports.getType = getType;
//* por MARCA
const getBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: { $toLower: "$brand" }, count: { $count: {} } } }
    ]);
    return data;
});
exports.getBrand = getBrand;
//* por NOMBRE
const getName = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: { $toLower: "$name" }, count: { $count: {} } } }
    ]);
    return data;
});
exports.getName = getName;
//* por AÑO de COSECHA
const getCropYear = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Wine_1.default.aggregate([
        { $group: { _id: "$cropYear", count: { $count: {} } } }
    ]);
    return data;
});
exports.getCropYear = getCropYear;
