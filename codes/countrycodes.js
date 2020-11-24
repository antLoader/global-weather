const { readTxt } = require('.././common/read_txt.js');
const codePath = './assets/country_codes.txt';

const codeProps = [
    'alfa2',
    'name',
    'numeric',
    'alfa3'
];

const countryName = async (alfa2) => {
    let codes = await readTxt(codePath, codeProps);
    for (let x of codes) if (x.alfa2.includes(alfa2)) return x.name;
}

const countryNames = async (alfa2) => {
    let codes = await readTxt(codePath, codeProps);
    let data = [];
    for (let a of alfa2) for (let x of codes) if (x.alfa2.includes(a)) data.push(x.name);
    return data;
}

module.exports = {
    countryName,
    countryNames
}

