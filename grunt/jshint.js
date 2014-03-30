var appSettings = require('../settings/app.json'),
    scriptsSettings = require('../settings/scripts.json');

module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },
    all: [
        'Gruntfile.js',
        '!' + appSettings.dir.app + '/scripts/vendor/*'
    ].concat(scriptsSettings.app.concat(scriptsSettings.test))
};
