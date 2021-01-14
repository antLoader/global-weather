const axios = require('axios');
const apiKey = 'pk.fff53c26ed8fcccce3c4c0817fcf93c8';

/*
    loc_getLocationInfo.data
    ------------------------
        place_id: '21947989',
        licence: 'https://locationiq.com/attribution',
        osm_type: 'node',
        osm_id: '2108069364',
        boundingbox: [ '37.6658228', '38.0315171', '-4.9985994', '-4.3514283' ],
        lat: '-31.4205893',
        lon: '-64.175101',
        display_name: 'Córdoba, Bulevar Juan Domingo Perón, Centro, Cordoba, Municipio de Córdoba, Pedanía Capital, Departamento Capital, Córdoba, X5000, Argentina',
        class: 'railway',
        type: 'station',
        importance: 0.40244155193061604,
        icon: 'https://locationiq.org/static/images/mapicons/transport_train_station2.p.20.png'

*/

let loc_getLocationInfo = async name => await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&format=json&q=${name}`);

let loc_searchByCityCoordinates = (city, locInfo) => {
    for (let l of locInfo.data) {
        let latMin = parseFloat(l.boundingbox[0]);
        let latMax = parseFloat(l.boundingbox[1]);
        let lngMin = parseFloat(l.boundingbox[2]);
        let lngMax = parseFloat(l.boundingbox[3]);
        if ((city.coord.lat > latMin && city.coord.lat < latMax) && (city.coord.lon > lngMin && city.coord.lon < lngMax)) return l;
    }
    return { boundingbox: "SIN COINCIDENCIA" };
}

module.exports = { loc_getLocationInfo, loc_searchByCityCoordinates}
