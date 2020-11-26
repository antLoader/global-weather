const { dia_removeDiacritics } = require('.././diacritics/diacritics.js'); 

const location = {
    demand: true,
    alias: 'l',
    type: 'string',
    desc: 'Location'
}

const opts = {
    location
}

const argv = require('yargs')
    .command(
        '$0', 
        'Consultar el estado climatologico en una localidad determinada', 
        opts,
        argv => argv.location = dia_removeDiacritics(argv.location)
    )
    .help()
    .argv;

module.exports = {
    argv
}