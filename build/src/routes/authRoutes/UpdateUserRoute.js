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
const router = require("express").Router();
const UpdateUser_1 = __importDefault(require("../../controllers/UpdateUser"));
const Cloudinary_1 = __importDefault(require("../../controllers/Cloudinary"));
const CloudinaryDestroy_1 = __importDefault(require("../../controllers/CloudinaryDestroy"));
const fs_extra_1 = __importDefault(require("fs-extra"));
//* /user/update
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { avatarID } = req.body;
    try {
        const user = req.user;
        //console.log("user", user);
        if (!user.isActive)
            return res.status(303).send("Inactive user, do you want to recover it?");
        if (!user) {
            return res.status(404).send("User not found!");
        }
        if (Object.keys(req.body).length) {
            //!!Update Avatar
            if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) && avatarID) {
                //* Preguta si hay imagen y ID para el procedimiento
                const destroy = yield (0, CloudinaryDestroy_1.default)(avatarID); //* Elimina imagen anterior
                result = yield (0, Cloudinary_1.default)(req.files.images.tempFilePath, "Users"); //* Guarda imagen folder "Users" y devuelve info
                yield fs_extra_1.default.unlink(req.files.images.tempFilePath); //* Elimina imagen del servidor de Node.js
                req.body.avatar = [
                    //* Coloca rutas en la propieda imagen
                    result.secure_url,
                    result.public_id //Id de la imagen
                ];
            }
            else {
                console.log("Image or old-avatarID not provided");
            }
            //!!Update Image END
            const updatedUser = yield (0, UpdateUser_1.default)(user, req.body);
            return res.status(200).send(updatedUser);
        }
        return res.status(400).send({ error: "No parameters sent for update" });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
