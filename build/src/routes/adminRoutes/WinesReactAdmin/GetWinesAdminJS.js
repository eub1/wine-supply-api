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
const GeatAllWinesAdmin_1 = __importDefault(require("../../../controllers/ReactAdminControllers/GeatAllWinesAdmin"));
const router = (0, express_1.Router)();
//* /admin/wines
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wines = yield (0, GeatAllWinesAdmin_1.default)();
        let total = wines.length;
        if (Object.keys(req.query).length) {
            const { filter, range, sort } = req.query;
            let sortMethod = sort.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",");
            if (typeof wines[0][sortMethod[0]] === "string") {
                if (sortMethod[1] === "DESC") {
                    const sortedwines = wines.sort((a, b) => {
                        if (a[sortMethod[0]].toLowerCase() < b[sortMethod[0]].toLowerCase()) {
                            return -1;
                        }
                        if (a[sortMethod[0]].toLowerCase() > b[sortMethod[0]].toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    });
                    let index = range.replace("[", "").replace("]", "").split(",");
                    let page = sortedwines.slice(Number(index[0]), Number(index[1]) + 1);
                    res.header({ 'content-Range': `wines 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
                    return res.status(200).send(page);
                }
                if (sortMethod[1] === "ASC") {
                    const sortedwines = wines.sort((a, b) => {
                        if (a[sortMethod[0]].toLowerCase() < b[sortMethod[0]].toLowerCase()) {
                            return -1;
                        }
                        if (a[sortMethod[0]].toLowerCase() > b[sortMethod[0]].toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    }).reverse();
                    let index = range.replace("[", "").replace("]", "").split(",");
                    let page = sortedwines.slice(Number(index[0]), Number(index[1]) + 1);
                    res.header({ 'content-Range': `wines 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
                    return res.status(200).send(page);
                }
            }
            if (typeof wines[0][sortMethod[0]] === "number") {
                if (sortMethod[1] === "DESC") {
                    const sortedwines = wines.sort((a, b) => {
                        if (a[sortMethod[0]] < b[sortMethod[0]]) {
                            return -1;
                        }
                        if (a[sortMethod[0]] > b[sortMethod[0]]) {
                            return 1;
                        }
                        return 0;
                    });
                    let index = range.replace("[", "").replace("]", "").split(",");
                    let page = sortedwines.slice(Number(index[0]), Number(index[1]) + 1);
                    res.header({ 'content-Range': `wines 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
                    return res.status(200).send(page);
                }
                if (sortMethod[1] === "ASC") {
                    const sortedwines = wines.sort((a, b) => {
                        if (a[sortMethod[0]] < b[sortMethod[0]]) {
                            return -1;
                        }
                        if (a[sortMethod[0]] > b[sortMethod[0]]) {
                            return 1;
                        }
                        return 0;
                    }).reverse();
                    let index = range.replace("[", "").replace("]", "").split(",");
                    let page = sortedwines.slice(Number(index[0]), Number(index[1]) + 1);
                    res.header({ 'content-Range': `wines 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
                    return res.status(200).send(page);
                }
            }
        }
        res.header({ 'content-Range': `wines 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
        return res.status(200).send(wines);
    }
    catch (error) {
        console.log(error);
        return res.status(404).send('Cant get wines!');
    }
}));
// { filter: '{}', range: '[0,4]', sort: '["name","DESC"]' } 
exports.default = router;
