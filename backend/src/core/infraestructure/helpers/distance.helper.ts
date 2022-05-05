const geoDistance = require('node-geo-distance');
interface Point {
    lat: number;
    lng: number;
}

export const distanceInKm = (p1: Point, p2: Point) => {
    return geoDistance.vincentySync({ latitude: p1.lat, longitude: p1.lng },
        { latitude: p2.lat, longitude: p2.lng });
};