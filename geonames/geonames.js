const { cmn_readTxt } = require('.././common/read_txt.js')
const geoPath = './assets/geonames.txt';
const geoProps = [
    'geonameid', 'name', 'asciiname', 'alternatenames', 'latitude',
    'longitude', 'featureclass', 'featurecode', 'countrycode', 'cc2', 'admin1code',
    'admin2code', 'admin3code', 'admin4code', 'population', 'elevation', 'dem',
    'timezone', 'modificationdate'
];


//search all occurrences of location name in name and alternateNames fields
//returns: array of objects
const geo_altNamesSearch = async name => {
    name = await name.toLowerCase();
    let data = [];
    let geonames = await cmn_readTxt(geoPath, geoProps);
    
    for (let x of geonames) {
        let names = x.name.split(" ");
        //go to next location if found
        breakme: {
            for(let n of names){
                if((n).toLowerCase().includes(name) && n.length == name.length){
                    data.push(x);
                    break breakme;
                }
            }
            let altNames = x.alternatenames.split(",");
            for (let m of altNames){
                let namesAry = m.split(" ");
                for (let a of namesAry){
                    if((a).toLowerCase().includes(name) && a.length == name.length){
                        data.push(x);
                        break breakme;
                    }
                }
            }
        }
    }
    return data;
}

//search 
const geo_idSearch = async id => {
    let geonames = await cmn_readTxt(geoPath, geoProps);
    for (let x of geonames) if (x.geonameid == id) return x;
}

module.exports = {
    geo_altNamesSearch,
    geo_idSearch
}
