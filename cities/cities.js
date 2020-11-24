const fs = require('fs');
const cityPath = './assets/city.list.json';

const readList = () => JSON.parse(fs.readFileSync(cityPath, 'utf8'));

const searchByName = name => readList().filter(list => list.name === name);

const searchById = id => readList().filter(list => list.id === id);

const searchByGeonameIds = async ids => {
    let cities = [];
    for (let x of ids){
        let city = searchById(parseInt(x.geonameid));
        city.length > 0 ? cities.push(city[0]) : null;
    } 
    return cities;
}

module.exports = { searchByName, searchById, searchByGeonameIds }