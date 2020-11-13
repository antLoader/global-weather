const NodeGeocoder = require('node-geocoder');
const axios = require('axios');
const options = {
    provider: 'locationiq',
    apiKey: 'pk.fff53c26ed8fcccce3c4c0817fcf93c8'
}
const apiKey = 'pk.fff53c26ed8fcccce3c4c0817fcf93c8';
const geocoder = NodeGeocoder(options);

const getLocation = async name => {
    const resp = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&format=json&q=${name}`);
    return resp;
}

/*
let getLocation = async (ct, ctr = false) => {
    if(ctr){
        return await geocoder.geocode({
            city: ct,
            country: ctr
        });
    }else{
        return await geocoder.geocode({
            city: ct,
        });
    }
};
*/

module.exports = {
    getLocation
}
