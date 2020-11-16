const fs = require('fs');

const path = './citylist/city.list.json';
const readList = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const searchIds = async (name) => readList(path).filter(list => list.name === name);

module.exports = {
    searchIds
}