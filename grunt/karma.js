var appSettings = require('../settings/app.json'),
    scriptsSettings = require('../settings/scripts.json'),
    networkSettings = require('../settings/network.json');

module.exports = {
    unit: {
        options: {
            frameworks: ['mocha', 'expect', 'sinon'],
            runnerPort: networkSettings.port.karma,
            singleRun: true,
            browsers: ['PhantomJS'],
            files: [
                appSettings.dir.app + '/bower_components/query/jquery.min.js',
                appSettings.dir.app + '/bower_components/underscore/underscore-min.js'
            ].concat(scriptsSettings.app.concat(scriptsSettings.test)),
            exclude: [
                appSettings.dir.app + '/scripts/main.js'
            ]
        }
    }
};
