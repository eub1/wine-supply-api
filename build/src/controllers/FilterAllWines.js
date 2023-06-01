"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterAllWines = (wines) => {
    const filterWines = wines.map((e) => {
        return {
            _id: e._id,
            name: e.name,
            brand: e.brand,
            description: e.description,
            images: e.images,
            alcoholVolume: e.alcoholVolume,
            rating: e.rating,
            price: e.price
        };
    });
    return filterWines;
};
exports.default = filterAllWines;
