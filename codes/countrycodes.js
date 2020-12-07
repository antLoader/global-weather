const { cmn_readTxt } = require('.././common/read_txt.js');
const codePath = './assets/country_codes.txt';

const codeProps = [
    'alfa2',
    'name',
    'numeric',
    'alfa3'
];

const cnt_countryName = async (alfa2) => {
    let codes = await cmn_readTxt(codePath, codeProps);
    for (let x of codes) if (x.alfa2.includes(alfa2)) return x.name;
}

const cnt_countryNames = async (alfa2) => {
    let codes = await cmn_readTxt(codePath, codeProps);
    let data = [];
    for (let a of alfa2) for (let x of codes) if (x.alfa2.includes(a)) data.push(x.name);
    return data;
}

module.exports = {
    cnt_countryName,
    cnt_countryNames
}

