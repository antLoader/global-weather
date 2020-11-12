const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'locationiq',
    formatter: null,
    apiKey: 'pk.fff53c26ed8fcccce3c4c0817fcf93c8'
}

const geocoder = NodeGeocoder(options);

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

module.exports = {
    getLocation
}