const { cty_searchByGeoIds } = require('.././cities/cities');
const { geo_altNamesSearch, geo_idSearch } = require('.././geonames/geonames');
const { cnt_countryNames } = require('.././codes/countrycodes.js');
const { loc_getLocationInfo, loc_searchByCityCoordinates } = require('.././geolocation/geolocation.js');
const i18n_countries = require("i18n-iso-countries");
const geolocation = require('.././geolocation/geolocation.js');
const { flg_getFlag } = require('.././flags/flags');
const { wt_getWeather } = require('../weather/weather');


/*

    USING ARRAY OF OBJECTS GUARANTEES THAT THE CORRECT ORDER IS FOLLOWED WHEN POPULATING
    RESULTS FROM DIFFERENT ARRAYS (EACH INDEX OF DIFFERENT ARRAYS REFERS TO SAME LOCATION)

    1- Get location name from user
    2- Search location in geonames (returns array of objects) -> Add results to geonames array
    3- Search geonames results in city list (returns array of objects) -> Add results to cities array
    4- Get location info from geolocation (returns array of objects) (use .data) -> Add results to geolocationInfo array
    5- 
        5.1- Add country codes of cities in cities array to countries array
        5.2- Search in geonames array only ids in cities array -> Add results to nt_geonames array
        5.3- Search for elements on geolocationInfo array whose coordinates boundingbox includes coordinates of a localization in cities array
                -> Add results to nt_geolocationInfo array

    6- Search country names using codes stored in countries array -> Add results to codes array
    7- Populate data array
        7.1- [name from codes array],
        7.2- [city object from cities array],
        7.3- [geonames object from nt_geonames array]
        7.4- [geolocation object from nt_geolocationInfo array]

*/

let src_commonSearch = async (location) => {
    let countries = [], nt_geonames = [], data = [], nt_geolocationInfo = [], weather = [];
    let geonames = await geo_altNamesSearch(location);          
    let cities = await cty_searchByGeoIds(geonames);            
    let geolocationInfo = await loc_getLocationInfo(location);

    for (let c of cities) {
        countries.push(c.country);                              
        nt_geonames.push(await geo_idSearch(c.id));      
        nt_geolocationInfo.push(loc_searchByCityCoordinates(c, geolocationInfo));
        console.log(nt_geolocationInfo[0].place_id);
        weather.push(await wt_getWeather(c.id));
        console.log(weather[0]);
    }

    let codes = await cnt_countryNames(countries);            
    for (let [x, y] of cities.entries()) {
        data[x] = [];
        data[x].push(
            codes[x],                                           
            y,                                                  
            y.coord,                                            
            nt_geonames[x],                              
            nt_geolocationInfo[x], 
            nt_geolocationInfo[x].boundingbox, 
            `${flg_getFlag(y.country)}`,
            weather[x]
        );
    }
    return data;
}

module.exports = {
    src_commonSearch
}


    //     let w = await getWeather(allData[x][1].id);
    //     allData[x].push(w.data);
    // }
    // for (let x of allData) {
    //     console.log(chalk.bgBlack.white.dim('DATA START'));
    //     console.log(x);
    //     console.log(chalk.bgCyan.dim('DATA END'));
    // }
