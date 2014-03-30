var appSettings = require('../settings/app.json'),
    networkSettings = require('../settings/network.json');

module.exports = {
    options: {
        sassDir: appSettings.dir.app + '/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: appSettings.dir.app + '/images',
        javascriptsDir: appSettings.dir.app + '/scripts',
        fontsDir: appSettings.dir.app + '/styles/fonts',
        importPath: appSettings.dir.app + '/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
    },
    dist: {
        options: {
            generatedImagesDir     : appSettings.dir.dist + '/images/generated',
            httpImagesPath         : networkSettings.domain.prod + '/images',
            httpGeneratedImagesPath: networkSettings.domain.prod + '/images/generated'
        }
    },
    stg: {
        options: {
            generatedImagesDir     : appSettings.dir.dist + '/images/generated',
            httpImagesPath         : '/images',
            httpGeneratedImagesPath: '/images/generated'
        }
    },
    server: {
        options: {
            debugInfo: true
        }
    }
};
