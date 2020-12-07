const { cty_searchByGeoIds } = require('.././cities/cities');
const { geo_altNamesSearch, geo_idSearch } = require('.././geonames/geonames');
const { cnt_countryNames } = require('.././codes/countrycodes.js');
const { loc_getLocationInfo } = require('.././geolocation/geolocation.js');
const i18n_countries = require("i18n-iso-countries");
const geolocation = require('.././geolocation/geolocation.js');

let src_commonSearch = async (location) => {
    let countries = [];
    let nonTrivialGeonames = [];
    let data = [];
    let geonames = await geo_altNamesSearch(location);
    let cities = await cty_searchByGeoIds(geonames);
    for (let c of cities) {
        countries.push(c.country);
        nonTrivialGeonames.push(await geo_idSearch(c.id));
    }
    let geolocoationInfo = await loc_getLocationInfo(location);
    let codes = await cnt_countryNames(countries);
    for (let [x, y] of cities.entries()) {
        data[x] = [];
        data[x].push((codes[x]));
        data[x].push(y);
        data[x].push(nonTrivialGeonames[x]);
        data[x].push(geolocoationInfo.data[0]);
    }
    return data;
}

module.exports = {
    src_commonSearch
}

