const axios = require('axios');


let APIkey = '7b951ae21bb594847649b71dab1511db';
const getWeather = async cityId => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${APIkey}&units=metric`);
    return resp;
}

module.exports = {
    getWeather
}


// const instance = axios.create({
//    baseURL: 'https://us1.locationiq.com/v1/search.php?key=pk.fff53c26ed8fcccce3c4c0817fcf93c8&format=json&q=Empire%20State%20Building',
//    headers: {
//        'X-RapidAPI-Key': 'd2045b99bamshc8ce9ed63fc6afep10358djsnf4cd06549daa',
//        'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com'
//    }
// });
// instance.get()
//    .then(resp => console.log(resp.data))
//    .catch(err => console.log(err));
