/*node app -c Sopuerta -p España */
const axios = require('axios');
const argv = require('./config/yargs.js');

const instance = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=New%20York',
    headers: {
        'X-RapidAPI-Key': 'd2045b99bamshc8ce9ed63fc6afep10358djsnf4cd06549daa', 
        'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com'
    }
});

instance.get()
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err));

