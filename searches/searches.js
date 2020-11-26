const { ct_searchByGeoIds } = require('.././cities/cities');
const { geo_altNamesSearch, geo_idSearch } = require('.././geonames/geonames');
const { cnt_countryNames } = require('.././codes/countrycodes.js');
const i18n_countries = require("i18n-iso-countries");

let commonSearch = async (location) => {
    let countries = [];
    let nonTrivialGeonames = [];
    let data = [];
    let geonames = await geo_altNamesSearch(location);
    let cities = await ct_searchByGeoIds(geonames);
    for (let c of cities) {
        countries.push(c.country);
        nonTrivialGeonames.push(await geo_idSearch(c.id));
    }
    let codes = await cnt_countryNames(countries);
    for (let [x, y] of cities.entries()) {
        data[x] = [];
        data[x].push((codes[x]));
        data[x].push(y);
        data[x].push(nonTrivialGeonames[x]);
    }
    return data;
}

module.exports = {
    commonSearch
}

