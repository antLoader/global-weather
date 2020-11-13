const fs = require('fs');
let path = './citylist/city.list.json';

let readList = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

let searchIdByName = async (id) => {
    let list = readList(path);
    return list.filter(list => list.id === id);
}

module.exports = {
    searchIdByName
}