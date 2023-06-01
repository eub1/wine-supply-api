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
const Wine_1 = __importDefault(require("../../../models/Wine"));
const CloudinaryDestroy_1 = __importDefault(require("../../../controllers/CloudinaryDestroy"));
const CheckEmptyQuery_1 = __importDefault(require("../../../controllers/CheckEmptyQuery"));
const Cloudinary_1 = __importDefault(require("../../../controllers/Cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const router = (0, express_1.Router)();
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // let {  imageID } = req.body;
    console.log(req.body);
    try {
        let wine = yield Wine_1.default.findById(id);
        let result;
        if (!wine) {
            return res.status(404).send("Wine not found!");
        }
        for (const property in req.body) {
            if (property === "isActive") {
                wine.isActive = req.body[property];
            }
            if (wine[property] && property !== "_id" && property !== '$__' && property !== '$isNew' && property !== 'isActive') {
                wine[property] = req.body[property];
            }
        }
        // if (req.files?.images && imageID) {
        // 	//* Destruir imagen vieja
        // 	const destroy = await destroyImg(imageID);
        // 	//console.log("destroy", destroy);
        // 	//* Subir nueva imagen
        // 	result = await upLoadImg(req.files.images.tempFilePath, "Wines");
        // 	await fs.unlink(req.files.images.tempFilePath);
        // 	wine.images = [
        // 		result.secure_url, //Direccion de la imagen
        // 		result.public_id //Id de la imagen
        // 	];
        // } else {
        // 	console.log("Image or old ImageID not provided");
        // }
        // const noEmptyQuerys = checkEmptyQuery(querys);
        if (wine) {
            let updateWine = yield Wine_1.default.findByIdAndUpdate(id, wine);
            updateWine = Object.assign(Object.assign({}, updateWine), { id: updateWine._id });
            res.send(updateWine);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Update no possible", error);
    }
}));
exports.default = router;
