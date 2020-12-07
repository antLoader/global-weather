const axios = require('axios');
const apiKey = 'pk.fff53c26ed8fcccce3c4c0817fcf93c8';

let loc_getLocationInfo = async name => await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&format=json&q=${name}`);

module.exports = { loc_getLocationInfo }
