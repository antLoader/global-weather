const fs = require('fs');
let path = './citylist/city.list.json';

let readList = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

let searchIds = async (name) => readList(path).filter(list => list.name === name);

module.exports = {
    searchIds
}