const {
    getLocationInfo
} = require('./geolocation/geolocation');

const {
    getWeather
} = require('./weather/weather');

const {
    searchByName,
    searchById
} = require('./cities/cities')

const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;
const util = require('util');
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

    let locInfo = await getLocationInfo(argv.ciudad);
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
    console.log('geolocation:', coincidences[0].geolocation.l);
    console.log('weather:', coincidences[0].weather.w);
    console.log('cities:', coincidences[0].citylist.c);
}


getAll(argv);
