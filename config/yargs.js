const ciudad = {
    demand: true,
    alias: 'c',
    type: 'string',
    desc: 'Ciudad'
}

const pais = {
    alias: 'p',
    type: 'string',
    default: false,
    desc: 'Pais al que la ciudad pertenece'
}

const opts = {
    ciudad,
    pais
}

const argv = require('yargs')
    .command(
        '$0', 
        'Consultar el estado climatologico en una localidad determinadqa', 
        opts,
        // argv => {
        //     argv.ciudad = encodeURI(argv.ciudad);
        //     argv.pais = argv.pais ? encodeURI(argv.pais) : false;
        // }
    )
    .help()
    .argv;

module.exports = {
    argv
}