const localConfig = require('./config.json');

exports = function(tmrPath) {
    console.log('Loading TMR game config from ' + tmrPath);
    let gameConfig = require(tmrPath);

    if (!gameConfig) {
        console.log('Failed to load TMR game config.');
        return;
    }


};