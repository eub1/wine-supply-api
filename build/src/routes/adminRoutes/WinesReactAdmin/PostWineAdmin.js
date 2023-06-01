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
const CheckForExistingWine_1 = __importDefault(require("../../../controllers/CheckForExistingWine"));
const PostWine_1 = __importDefault(require("../../../controllers/PostWine"));
const Cloudinary_1 = __importDefault(require("../../../controllers/Cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const router = (0, express_1.Router)();
//* /admin/wine
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body)
    let { name, brand, description, type, body, cropYear, origin, zone, volume, alcoholVolume, rating, strain, stock, price, images1 } = req.body;
    let existingWines = yield (0, CheckForExistingWine_1.default)(name, brand, cropYear, volume);
    if (existingWines.length)
        return res.send("Vino ya esxiste en la DB!");
    // let result;
    // if(images){
    //   result = await upLoadImg(images.tempFilePath, "Wines")
    //   await fs.unlink(images.tempFilePath)
    // }
    // else {
    //   console.log("No image to upload")
    // }
    //TODO actualizar para poder updatear la imagen. Modelo abajo
    //?? ECHO
    let images = [images1 //result.secure_url, //Direccion de la imagen
        //           result.public_id //Id de la imagen
    ];
    const validate = name && brand && description && type && body && cropYear && origin && zone && volume && alcoholVolume && rating && strain && stock && price && images
        ? true
        : false;
    if (!validate)
        return res.status(400).send(`Missing data!`);
    try {
        const newWine = yield (0, PostWine_1.default)(name, brand, description, type, body, cropYear, origin, zone, volume, alcoholVolume, rating, images, strain, stock, price);
        console.log('llego');
        res.status(200).send(`${newWine.name} wine created successfully!`);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
exports.default = router;
