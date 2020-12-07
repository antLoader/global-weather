const fs = require('fs');
const cityPath = './assets/city.list.json';

/*
    id: 2513671,
    name: 'Montalbán de Córdoba',
    state: '',
    country: 'ES',
    coord: { lon: -4.74935, lat: 37.57996 }
*/

const readList = () => JSON.parse(fs.readFileSync(cityPath, 'utf8'));

const cty_searchByName = name => readList().filter(list => list.name === name);

const cty_searchById = id => readList().filter(list => list.id === id);

const cty_searchByGeoIds = async ids => {
    let cities = [];
    for (let x of ids){
        let city = cty_searchById(parseInt(x.geonameid));
        city.length > 0 ? cities.push(city[0]) : null;
    }
    return cities;
}

module.exports = { cty_searchByName, cty_searchById, cty_searchByGeoIds }