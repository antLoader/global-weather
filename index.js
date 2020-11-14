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

let callGetLocationInfo = async name => {
    let info = await getLocationInfo(name);
    console.log(info.data);
}


let callGetWeather = async id => {
    getWeather(id)
        .then(res => {
            console.log(res.data)
            callGetLocationInfo(res.data.name);
        })
        .catch(err => console.log(err));;
}

searchIds(argv.ciudad)
    .then(res => {
        for (let r of res) callGetWeather(r.id);
    })
    .catch(err => console.log(err));


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

// getWeather(3107756)
//     .then(resp => console.log(resp.data))
//     .catch(err => console.log(err));

// searchNameById(id)
//     .then(resp => console.log('HOLA', resp))
//     .catch(err => console.log(err));


