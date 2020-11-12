/*node app -c Sopuerta -p España */
const { getLocation } = require('./geolocation/geolocation');
const { getWeather } = require('./weather/weather');
const { searchIdByName } = require('./cities/cities')
const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;

getLocation(argv.ciudad, argv.pais)
    .then(res => {
        if(res.length) console.log(res[0]); //console.log(chalk.cyan(res[0].latitude + ' ' + res[0].longitude));
        else console.log(chalk.red('Ciudad inexistente'));     
    }
);

getWeather(3107756)
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err));

searchIdByName(argv.ciudad)
    .then(resp => console.log(resp))
    .catch(err => console.log(err));
//7b951ae21bb594847649b71dab1511db