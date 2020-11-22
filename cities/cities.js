const fs = require('fs');
const cityPath = './assets/city.list.json';

const readList = () => JSON.parse(fs.readFileSync(cityPath, 'utf8'));

const searchByName = name => readList().filter(list => list.name === name);

const searchById = id => readList().filter(list => list.id === id);

const searchByGeonameIds = async ids => {
    let cities = [];
    for (let x of ids) cities.push(searchById(parseInt(x.geonameid)));
    return cities;
}


module.exports = { searchByName, searchById, searchByGeonameIds }