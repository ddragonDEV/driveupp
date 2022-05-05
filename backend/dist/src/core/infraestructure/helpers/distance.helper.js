"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceInKm = void 0;
const geoDistance = require('node-geo-distance');
const distanceInKm = (p1, p2) => {
    return geoDistance.vincentySync({ latitude: p1.lat, longitude: p1.lng }, { latitude: p2.lat, longitude: p2.lng });
};
exports.distanceInKm = distanceInKm;
