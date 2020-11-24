const argv = require('./config/yargs.js').argv.ciudad;

let commonSearch = async argv => {
    let countries = [];
    let nonTrivialGeonames = [];
    let data = [];
    let geonames = await altNamesSearch(city);          //object array
    let cities = await searchByGeonameIds(geonames);    //object array
    for (let c of cities) {
        console.log(await geonameIdSearch(c.id));
        countries.push(c.country);
        nonTrivialGeonames.push(await geonameIdSearch(c.id));
    }
    let codes = await countryNames(countries);
    for (let [x, y] of cities.entries()) {
        data[x] = [];
        data[x].push((codes[x]));
        data[x].push(y);
        data[x].push(nonTrivialGeonames[x]);
    }