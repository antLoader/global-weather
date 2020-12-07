const { cty_searchByGeoIds } = require('.././cities/cities');
const { geo_altNamesSearch, geo_idSearch } = require('.././geonames/geonames');
const { cnt_countryNames } = require('.././codes/countrycodes.js');
const { loc_getLocationInfo } = require('.././geolocation/geolocation.js');
const i18n_countries = require("i18n-iso-countries");
const geolocation = require('.././geolocation/geolocation.js');


/*

    USING ARRAY OF OBJECTS GUARANTEES THAT THE CORRECT ORDER IS FOLLOWED WHEN POPULATING
    RESULTS FROM DIFFERENT ARRAYS (EACH INDEX OF DIFFERENT ARRAYS REFERS TO SAME LOCATION)

    1- Get location name from user
    2- Search location in geonames (returns array of objects) -> Add results to geonames array
    3- Search geonames results in city list (returns array of objects) -> Add results to cities array
    4- 
        4.1- Add country codes of cities returned by city search to countries array
        4.2- Search in geonames only ids returned by city search -> Add results to nonTrivialGeonames array
        4.3- Add location coordinates to coords array

    5- Get location info from geolocation (returns array of objects) (use .data)
    6- Search country names using codes stored in countries array -> Add results to codes array
    7- Populate data array
        7.1- [name from codes array],
        7.2- [city object from cities array],
        7.3- [geonames object from nonTrivialGeonames array]

        TODO
        ----
        7.4- [geolocation object from geolocationInfo array] -> search coords in bounding box

*/



let src_commonSearch = async (location) => {
    let countries = [], nonTrivialGeonames = [], data = [], coords = [], nonTrivialGeolocation = [];
    let geonames = await geo_altNamesSearch(location);
    let cities = await cty_searchByGeoIds(geonames);
    let geolocationInfo = await loc_getLocationInfo(location);
    for (let c of cities) {
        countries.push(c.country);
        nonTrivialGeonames.push(await geo_idSearch(c.id));
        breakme: {
            for (let l of geolocationInfo.data) {
                let latMin = parseFloat(l.boundingbox[0]);
                let latMax = parseFloat(l.boundingbox[1]);
                let lngMin = parseFloat(l.boundingbox[2]);
                let lngMax = parseFloat(l.boundingbox[3]);
                if ((c.coord.lat > latMin && c.coord.lat < latMax) && (c.coord.lon > lngMin && c.coord.lon < lngMax)) {
                    nonTrivialGeolocation.push(l);
                    break breakme;
                }
            }
            nonTrivialGeolocation.push({ boundingbox: "SIN COINCIDENCIA" });
        }
    }

    let codes = await cnt_countryNames(countries);
    for (let [x, y] of cities.entries()) {
        data[x] = [];
        data[x].push((codes[x]));
        data[x].push(y);
        data[x].push(y.coord);
        data[x].push(nonTrivialGeonames[x]);
        data[x].push(nonTrivialGeolocation[x]);
        data[x].push(nonTrivialGeolocation[x].boundingbox);
    }
    return data;
}

module.exports = {
    src_commonSearch
}

