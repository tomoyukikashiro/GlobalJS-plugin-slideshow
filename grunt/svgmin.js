var appSettings = require('../settings/app.json');

module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: appSettings.dir.app + '/images',
            src: '**/*.svg',
            dest: appSettings.dir.dist + '/images'
        }]
    }
};
