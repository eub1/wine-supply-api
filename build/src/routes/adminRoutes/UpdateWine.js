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
// import getWineById from "../../controllers/GetWineById";
const Wine_1 = __importDefault(require("../../models/Wine"));
const CloudinaryDestroy_1 = __importDefault(require("../../controllers/CloudinaryDestroy"));
const CheckEmptyQuery_1 = __importDefault(require("../../controllers/CheckEmptyQuery"));
const Cloudinary_1 = __importDefault(require("../../controllers/Cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const router = (0, express_1.Router)();
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const querys = req.body;
    const { _id, imageID } = req.body;
    //*Obtener vino
    //console.log(querys)
    try {
        const wine = yield Wine_1.default.findById(_id);
        let result;
        if (!wine) {
            return res.status(404).send("Wine not found!");
        }
        if (Object.keys(req.body).length) {
            for (const property in querys) {
                wine[property] = req.body[property];
            }
        }
        if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.images) && imageID) {
            //* Destruir imagen vieja
            const destroy = yield (0, CloudinaryDestroy_1.default)(imageID);
            //console.log("destroy", destroy);
            //* Subir nueva imagen
            result = yield (0, Cloudinary_1.default)(req.files.images.tempFilePath, "Wines");
            yield fs_extra_1.default.unlink(req.files.images.tempFilePath);
            wine.images = [
                result.secure_url,
                result.public_id, //Id de la imagen
            ];
        }
        else {
            console.log("Image or old ImageID not provided");
        }
        const noEmptyQuerys = (0, CheckEmptyQuery_1.default)(querys);
        if (noEmptyQuerys) {
            const updateWine = yield Wine_1.default.findByIdAndUpdate(_id, wine);
            // console.log(updateWine);
            res.send(updateWine);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Update no possible", error);
    }
}));
exports.default = router;
