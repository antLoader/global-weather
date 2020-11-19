const fs = require('fs');
const path = './citylist/cities500.txt';
const readList = (path) => fs.readFileSync(path, 'utf8');
// const searchByName = name => readList(path).filter(list => list.name === name);
// const searchById = id => readList(path).filter(list => list.id === id);
module.exports = { readList }

/* '\t' */