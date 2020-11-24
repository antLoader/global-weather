const { readTxt } = require('.././common/read_txt.js')
const geoPath = './assets/geonames.txt';

const geoProps = [
    'geonameid',
    'name',
    'asciiname',
    'alternatenames',
    'latitude',
    'longitude',
    'featureclass',
    'featurecode',
    'countrycode',
    'cc2',
    'admin1code',
    'admin2code',
    'admin3code',
    'admin4code',
    'population',
    'elevation',
    'dem',
    'timezone',
    'modificationdate'
];

const altNamesSearch = async name => {
    name = await name.toLowerCase();
    let data = [];
    let geonames = await readTxt(geoPath, geoProps);
    for (let x of geonames) if ((x.name).toLowerCase().includes(name) || (x.alternatenames).toLowerCase().includes(name)) data.push(x);
    return data;
}

const geonameIdSearch = async id => {
    let geonames = await readTxt(geoPath, geoProps);
    for (let x of geonames){
        if(x.geonameid == id) return x;
    }
}

// for await (const line of rl) {
//     let lineAry = line.split(delimiter);
//     let lineLength = lineAry.length;
//     for (let x = 0; x < lineLength; x++) {
//         lineObj[`${geonamesProps[x]}`] = lineAry[x];
//     }
//     let altNames = lineObj.alternatenames.split(',');
//     for (n of altNames) {  //inserta el mismo registro varias veces si alternate names contiene mas de una ocurrencia, por eso el break
//         if (lineObj.name == name || n == name) {
//             data.push(lineObj);
//             break;
//         }
//     }
//     lineObj = {};
// }
// return data;
// }


module.exports = {
    altNamesSearch,
    geonameIdSearch
}
