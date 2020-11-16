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


let callGetLocationInfo = argv => getLocationInfo(argv.ciudad)
    .then(res => console.log('GETLOCATIONINFO', res.data))
    .catch(err => console.log(err));

callGetLocationInfo(argv);


let getInfo = argv => {
    let res = searchIds(argv.ciudad);
    for (let r of res) callGetWeather(r.id);
}
   
let callGetWeather = id => getWeather(id)
    .then(res => console.log('WEATHER', res.data))
    .catch(err => console.log(chalk.red.dim(err)));


getInfo(argv);
