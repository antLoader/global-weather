
const axios = require('axios');

const apiKey = 'pk.fff53c26ed8fcccce3c4c0817fcf93c8';
const getLocationInfo = async name => await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&format=json&q=${name}`);

module.exports = {
    getLocationInfo
}

/*
    const options = {
        provider: 'locationiq',
        apiKey: 'pk.fff53c26ed8fcccce3c4c0817fcf93c8'
    }
    const NodeGeocoder = require('node-geocoder');
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
*/
