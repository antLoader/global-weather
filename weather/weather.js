const axios = require('axios');
const APIkey = '7b951ae21bb594847649b71dab1511db';

const wt_getWeather = async cityId => await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${APIkey}&units=metric&lang=sp`);

const wt_getWeathers = async cityId => await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityCsvIds}&appid=${APIkey}&units=metric&lang=sp`);

module.exports = { wt_getWeather, wt_getWeathers }



