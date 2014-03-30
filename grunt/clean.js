var appSettings = require('../settings/app.json');

module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                appSettings.dir.dist + '/*',
                '!' + appSettings.dir.dist + '/.git*'
            ]
        }]
    },
    server: '.tmp'
};
