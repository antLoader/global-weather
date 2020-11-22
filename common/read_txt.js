const fs = require('fs');
const readline = require('readline');

const readTxt = async (path, props, delimiter = '\t') => {
    let objAry = [];
    let lineObj = {};
    const fileStream = fs.createReadStream(path);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        let lineAry = line.split(delimiter);
        for (let [x, y] of lineAry.entries()) lineObj[`${props[x]}`] = y;
        objAry.push(lineObj);
        lineObj = {};
    }
    return objAry;
};

module.exports = {
    readTxt
}