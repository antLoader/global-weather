const descripcion = {
    demand: true,
    alias: 'd',
    type: 'string',

}
const opts = {
    descripcion
}

const argv = require('yargs')
    .command('$0', 'Consultar el estado climatologico en una localidad determinadqa', opts)
    .help()
    .argv;

module.exports = {
    argv
}