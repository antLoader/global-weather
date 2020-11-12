const fs = require('fs');
let path = './citylist/city.list.json';

let readList = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

let searchIdByName = async (name) => {
    let list = readList(path);
    let city = list.find(list => list.name === name);
    return city.id;
}

module.exports = {
    searchIdByName
}