const {
    getLocationInfo
} = require('./geolocation/geolocation');

const {
    getWeather
} = require('./weather/weather');

const {
    searchIds
} = require('./cities/cities')

const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;


// let getWeathers = async ids => {
//     const weathers = [];
//     for(let id of ids) weathers.push(getWeather(id.id));
//     return weathers;
// }

// let getInfo = async argv => {
//     const ids = await searchIds(argv.ciudad);
//     console.log('IDS', ids);
//     const weathers = await getWeathers(ids);
//     // setTimeout(()=> {
//     //     console.log('WEATHERS', weathers[0]);
//     // }, 3000);
//     const infos = await getLocationInfo(argv.ciudad);
//     console.log(weathers[0]);
//     console.log(Object.getOwnPropertyNames(weathers[0]));
//     // console.log('INFOS', infos);
// }

// getInfo(argv);


//console.log(argv.ciudad);
let getInfo = async argv => await searchIds(argv.ciudad)
    .then(res => {
        for (let r of res) callGetWeather(r.id);
    })
    .catch(err => console.log(err));


getInfo(argv);



// let getLocationInfos = async name => {
//     let info = await getLocationInfo(name);
//     console.log('INFO!!!!', info.data);
// }
// getLocationInfos(argv.ciudad);

let callGetWeather = async id => {
    getWeather(id)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
}

// searchIds(argv.ciudad)
//     .then(res => {
//         console.log('CIUDAD LISTA', res);
//         for (let r of res) getWeather(r.id);
//     })
//     .then(res_w => console.log('WEATHER!!!!', res_w.data))
//     .catch(err => console.log(err));

// getLocationInfo(argv.ciudad)
//     .then(res => console.log('GETLOCATIONINFO', res.data))
//     .catch(err => console.log(err));

// getLocation(argv.ciudad)
//     .then(res => {
//         if (res.data.length) {
//             for (let r of res.data){
//                 console.log('Soy R ', r);
//                 //console.log('Soy R ', r.place_id);
//                 searchNameById(r.osm_id)
//                     .then(resp => console.log(resp))
//                     .catch(err => console.log(err));
//             }
//         } else {
//             console.log(chalk.red('Ciudad inexistente'));
//         }
//     }).catch(err => console.log(err));



