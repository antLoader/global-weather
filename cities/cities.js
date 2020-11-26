const fs = require('fs');
const cityPath = './assets/city.list.json';

const readList = () => JSON.parse(fs.readFileSync(cityPath, 'utf8'));

const ct_searchByName = name => readList().filter(list => list.name === name);

const ct_searchById = id => readList().filter(list => list.id === id);

const ct_searchByGeoIds = async ids => {
    let cities = [];
    for (let x of ids){
        let city = ct_searchById(parseInt(x.geonameid));
        city.length > 0 ? cities.push(city[0]) : null;
    } 
    return cities;
}

module.exports = { ct_searchByName, ct_searchById, ct_searchByGeoIds }