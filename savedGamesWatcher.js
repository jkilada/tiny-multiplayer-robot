var config = require('./config.json');
var fs = require('fs');
var path = require('path');

fs.watch(config.civSavesPath, (eventType, filename) => {
   console.log("file changed", eventType, filename);
    var tmpPath = new Date().getTime() + "";
    fs.linkSync(path.join(config.civSavesPath, filename), path.join(config.uploadRootPath, tmpPath));
    fs.rename(path.join(config.uploadRootPath, tmpPath),  path.join(config.uploadRootPath, filename));
});