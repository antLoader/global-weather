const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'locationiq',
    formatter: null,
    apiKey: 'pk.fff53c26ed8fcccce3c4c0817fcf93c8'
}

const geocoder = NodeGeocoder(options);

let getLocation = async (ct, ctr) => {
    return await geocoder.geocode({
        city: ct,
        country: ctr
    });
};

module.exports = {
    getLocation
}


//const axios = require('axios');
//const instance = axios.create({
//    baseURL: 'https://us1.locationiq.com/v1/search.php?key=pk.fff53c26ed8fcccce3c4c0817fcf93c8&format=json&q=Empire%20State%20Building',
//    headers: {
//        'X-RapidAPI-Key': 'd2045b99bamshc8ce9ed63fc6afep10358djsnf4cd06549daa',
//        'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com'
//    }
//});
//instance.get()
//    .then(resp => console.log(resp.data))
//    .catch(err => console.log(err));
