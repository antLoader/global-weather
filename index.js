/*node app -c Sopuerta -p España */
const { getLocation } = require('./geolocation/geolocation.js');
const chalk = require('chalk');
const argv = require('./config/yargs.js').argv;

getLocation(argv.ciudad, argv.pais)
    .then(res => {
        if(res.length) console.log(chalk.cyan(res[0].latitude + ' ' + res[0].longitude));
        else console.log(chalk.red('Ciudad inexistente'));     
    }
);
