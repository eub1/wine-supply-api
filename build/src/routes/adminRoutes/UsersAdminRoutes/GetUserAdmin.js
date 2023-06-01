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
const GetUserById_1 = __importDefault(require("../../../controllers/GetUserById"));
const router = (0, express_1.Router)();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let user = yield (0, GetUserById_1.default)(id);
        let newUser = Object.assign(Object.assign({}, user), { id: user === null || user === void 0 ? void 0 : user._id });
        res.status(200).send(newUser);
    }
    catch (error) {
        res.status(404).send("Can't find user!");
    }
}));
exports.default = router;
