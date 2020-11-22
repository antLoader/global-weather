const { removeDiacritics } = require('.././diacritics/diacritics.js'); 

const ciudad = {
    demand: true,
    alias: 'c',
    type: 'string',
    desc: 'Ciudad'
}

const opts = {
    ciudad
}

const argv = require('yargs')
    .command(
        '$0', 
        'Consultar el estado climatologico en una localidad determinada', 
        opts,
        argv => argv.ciudad = removeDiacritics(argv.ciudad)
    )
    .help()
    .argv;

module.exports = {
    argv
}