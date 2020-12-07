const axios = require('axios');
const apiKey = 'pk.fff53c26ed8fcccce3c4c0817fcf93c8';

/*
    loc_getLocationInfo.data
    ------------------------
        place_id: '21947989',
        licence: 'https://locationiq.com/attribution',
        osm_type: 'node',
        osm_id: '2108069364',
        boundingbox: [Array],
        lat: '-31.4205893',
        lon: '-64.175101',
        display_name: 'Córdoba, Bulevar Juan Domingo Perón, Centro, Cordoba, Municipio de Córdoba, Pedanía Capital, Departamento Capital, Córdoba, X5000, Argentina',
        class: 'railway',
        type: 'station',
        importance: 0.40244155193061604,
        icon: 'https://locationiq.org/static/images/mapicons/transport_train_station2.p.20.png'

*/

let loc_getLocationInfo = async name => await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&format=json&q=${name}`);

module.exports = { loc_getLocationInfo }
