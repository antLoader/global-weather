/*node app -c Sopuerta -p España */
const { getLocation } = require('./geolocation/geolocation');
const { getWeather } = require('./weather/weather');
const { searchNameById } = require('./cities/cities')
const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;

getLocation(argv.ciudad)
    .then(res => {
        if (res.data.length) {
            for (let r of res.data){ 
                searchNameById(r.place_id)
                    .then(resp => console.log('HOLA', resp))
                    .catch(err => console.log(err));
            }
        } else {
            console.log(chalk.red('Ciudad inexistente'));
        }
    }).catch(err => console.log(err));

// getWeather(3107756)
//     .then(resp => console.log(resp.data))
//     .catch(err => console.log(err));

// searchNameById(id)
//     .then(resp => console.log('HOLA', resp))
//     .catch(err => console.log(err));


