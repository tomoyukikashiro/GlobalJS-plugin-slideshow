var appSettings = require('../settings/app.json');

module.exports = {
    options: {
        assetsDirs: [appSettings.dir.dist]
    },
    html: [appSettings.dir.dist + '/**/*.html'],
    css : [appSettings.dir.dist + '/styles/{,*/}*.css']
};
