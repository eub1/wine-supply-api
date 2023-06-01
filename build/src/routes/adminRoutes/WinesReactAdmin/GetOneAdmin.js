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
const GetWineById_1 = __importDefault(require("../../../controllers/GetWineById"));
const router = (0, express_1.Router)();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    console.log(id);
    try {
        let wine = yield (0, GetWineById_1.default)(id);
        let newwine = Object.assign(Object.assign({}, wine), { id: wine === null || wine === void 0 ? void 0 : wine._id });
        res.status(200).send(newwine);
    }
    catch (error) {
        throw new Error(error);
    }
}));
exports.default = router;
