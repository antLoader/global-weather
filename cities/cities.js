const fs = require('fs');
const path = './citylist/city.list.json';
const readList = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const searchByName = name => readList(path).filter(list => list.name === name);
const searchById = id => readList(path).filter(list => list.id === id);
module.exports = { searchByName, searchById }