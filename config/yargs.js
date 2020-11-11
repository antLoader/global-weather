const ciudad = {
    demand: true,
    alias: 'c',
    type: 'string',
    desc: 'Ciudad'
}

const pais = {
    demand: true,
    alias: 'p',
    type: 'string',
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
        argv => true
    )
    .help()
    .argv;

module.exports = {
    argv
}