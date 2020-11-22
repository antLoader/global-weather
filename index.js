const { getLocationInfo } = require('./geolocation/geolocation');
const { getWeather } = require('./weather/weather');
const { searchByName, searchById, searchByGeonameIds } = require('./cities/cities');
const { altNamesSearch } = require('./geonames/geonames');
const { countryNames } = require('./codes/countrycodes.js');

const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;
const util = require('util');
let express = require('express');
let app = express();


/*
    {   BUSQUEDA

        1- buscar nombre en geonames (alternate names)
        2- buscar ids de geonames en citylist
        3-buscar coordenadas de citylist en geolocation bounding-box
        4- poblar las opciones de busqueda
    }


    {   MOSTRAR PREVISION

        1- pasar la id escogida a weathermap

    }
*/

let searchHandler = async (city = argv.ciudad) => {
    let geonames = await altNamesSearch(city);
    let cities = await searchByGeonameIds(geonames);
    let codes = await countryNames('AR');
    // console.log('GEONAMES\n');
    //console.log(geonames);
    // console.log('CITIES\n');
    console.log(cities);
    // console.log('CODES\n');
    // console.log(codes);
}

searchHandler();




// let getAll = async argv => {

//     //BUSCAR EN LA LISTA citylist
//     //let cities = searchByName(argv.ciudad);
//     let cities = searchByName('Sopuerta'); //=> array de objetos

//     let v = "0";
//     //Meter las coordenadas y la id de las localidades con ese nombre en coords[]
//     let coords = [];
//     for (let c of cities) coords.push({
//         id: c.id,
//         lat: parseFloat(c.coord.lat),
//         lng: parseFloat(c.coord.lon)
//     });
//     //
//     let cities500 = await readGeonames(cities500path);
//     let boundings = [];
//     let coincidences = [];

//     let locInfo = await getLocationInfo(removeDiacritics(argv.ciudad));
//     for (let l of locInfo.data) {
//         let latMin = parseFloat(l.boundingbox[0]);
//         let latMax = parseFloat(l.boundingbox[1]);
//         let lngMin = parseFloat(l.boundingbox[2]);
//         let lngMax = parseFloat(l.boundingbox[3]);
//         boundings.push({ latMin, latMax, lngMin, lngMax });
//         for (let coord of coords) {
//             let w = await getWeather(coord.id);
//             w = w.data;
//             let c = searchById(coord.id);
//             if ((coord.lat > latMin && coord.lat < latMax) && (coord.lng > lngMin && coord.lng < lngMax)){
//                 coincidences.push({
//                     geolocation: {
//                         l
//                     },
//                     weather: {
//                         w
//                     },
//                     citylist: {
//                         c: c[0]
//                     }
//                 });
//             }
//         }
//         //console.log(coincidences[0].weather.w);

//     }
//     datos = [];
//     for(let x of coincidences){
//         let location = x.geolocation.l;
//         let weather = x.weather.w;
//         let city = x.citylist.c;
//         datos.push({
//             name: location.display_name,
//             name2: city.name,
//             description: weather.weather[0].description,
//             temp: weather.main.temp,
//             feels_like: weather.main.feels_like,
//             temp_min: weather.main.temp_min,
//             temp_max: weather.main.temp_max,
//             pressure: weather.main.pressure,
//             humidity: weather.main.humidity,
//             wind_speed: weather.wind.speed,
//             wind_dir: weather.wind.deg,
//             clouds: weather.clouds.all,
//             sunrise: weather.sys.sunrise,
//             sunset: weather.sys.sunset,
//             timezone: weather.timezone,
//             country: city.country,
//             id: city.id   //citylist.id == geonames.id
//         })
//     }
//     for(let x of cities500){
//         for (let d of datos){
//             if((x.name == d.name2 || x.alternatenames.includes(d.name2)) && (x.countrycode == d.country)){
//                 datos.push(x);
//             }
//         }
//     }


//     let removeDuplicates = (ary) => {
//         let datos_s = new Set();
//         for (let x of ary) datos_s.add(x)
//         let datos_a = Array.from(datos_s);
//         return datos_a; 
//     }




//     console.log(removeDuplicates(datos));
//     //console.log(chalk.red.bold('DATOS!!!!!'));
//     //console.log(datos);
//     // let cities500 = await readGeonames(cities500path);
//     // for (let k of cities500){

//     // }
//     // console.log(cities500);
//     // app.get('/', function(req, res){
//     //     let response = [];
//     //     let remDup = removeDuplicates(datos);

//     //     response.push(remDup);
//     //     // response.push(cities500);
//     //     res.send(response);
//     // });
//     // app.listen(3000);
//     //console.log(cities);
//     //console.log(searchById(2519237));
// }

// getAll(argv);

// //geonameSearchByName('Cordoba', cities500path);
