const {
    getLocationInfo
} = require('./geolocation/geolocation');

const {
    getWeather
} = require('./weather/weather');

const {
    searchByName,
    searchById
} = require('./cities/cities');

const {
    removeDiacritics
} = require('./diacritics/diacritics');

const {
    readList
} = require('./geonames/geonames');

const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;
const util = require('util');

let express = require('express');
let app = express();


/*
    1- translate city name
    2- retrieve place from list
    3- get coords & id
    4- get weather using id
    4- retrieve registers from geolocation using coords
    5- filter registers from geolocation
    6- show weather + register from geolocation
*/


let getAll = async argv => {
    let cities = searchByName(argv.ciudad);
    let coords = [];
    for (let c of cities) coords.push({
        id: c.id,
        lat: parseFloat(c.coord.lat),
        lng: parseFloat(c.coord.lon)
    });

    let boundings = [];
    let coincidences = [];

    let locInfo = await getLocationInfo(removeDiacritics(argv.ciudad));
    for (let l of locInfo.data) {
        let latMin = parseFloat(l.boundingbox[0]);
        let latMax = parseFloat(l.boundingbox[1]);
        let lngMin = parseFloat(l.boundingbox[2]);
        let lngMax = parseFloat(l.boundingbox[3]);
        boundings.push({ latMin, latMax, lngMin, lngMax });
        for (let coord of coords) {
            let w = await getWeather(coord.id);
            w = w.data;
            let c = searchById(coord.id);
            if ((coord.lat > latMin && coord.lat < latMax) && (coord.lng > lngMin && coord.lng < lngMax)){
                coincidences.push({
                    geolocation: {
                        l
                    },
                    weather: {
                        w
                    },
                    citylist: {
                        c: c[0]
                    }
                });
            }
        }
    }
    // for(let x of coincidences){
    //     console.log('geolocation:', x.geolocation.l);
    //     console.log('weather:', x.weather.w);
    //     console.log('cities:', x.citylist.c);
    // }
    // console.log('geolocation:', coincidences[0].geolocation.l);
    // console.log('weather:', coincidences[0].weather.w);
    // console.log('cities:', coincidences[0].citylist.c);
    datos = [];
    for(let x of coincidences){
        let location = x.geolocation.l;
        let weather = x.weather.w;
        let city = x.citylist.c;
        datos.push({
            name: location.display_name,
            description: weather.weather[0].description,
            temp: weather.main.temp,
            feels_like: weather.main.feels_like,
            temp_min: weather.main.temp_min,
            temp_max: weather.main.temp_max,
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
            wind_speed: weather.wind.speed,
            wind_dir: weather.wind.deg,
            clouds: weather.clouds.all,
            sunrise: weather.sys.sunrise,
            sunset: weather.sys.sunset,
            timezone: weather.timezone,
            country: city.country
        })
    }

    console.log(datos);
    app.get('/hello', function(req, res){
        let response = [];
        response.push(datos);
        response.push('Hola Expess');
        res.send(response);
    });
    app.listen(3000);
    //console.log(cities);
    //console.log(searchById(2519237));
}

//console.log(readList('./citylist/cities500.txt'));

getAll(argv);
