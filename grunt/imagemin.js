var appSettings = require('../settings/app.json');

module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: appSettings.dir.app + '/images',
            src: '**/*.{gif,jpeg,jpg,png}',
            dest: appSettings.dir.dist + '/images'
        }]
    }
};
