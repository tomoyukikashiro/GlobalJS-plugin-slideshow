var appSettings = require('../settings/app.json');

module.exports = {
    options: {
        dest: appSettings.dir.dist
    },
    html: appSettings.dir.app + '/index.html'
};
