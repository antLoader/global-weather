const fs = require('fs');
const readline = require('readline');

const geonamesProps = [
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
]

const geonameSearch = async (name, path) => {
    let delimiter = '\t';
    let data = [];
    let lineObj = {};
    const fileStream = fs.createReadStream(path);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    for await (const line of rl) {
        let lineAry = line.split(delimiter);
        for (let x=0; x < lineAry.length; x++) {
            lineObj[`${geonamesProps[x]}`] = lineAry[x];
        }
        let altNames = lineObj.alternatenames.split(',');
        for (n of altNames){
            if(lineObj.name == name || n == name)
            data.push(lineObj);
        }
        lineObj = {};
    }

    return data;
}


module.exports = { 
    geonameSearch
}
