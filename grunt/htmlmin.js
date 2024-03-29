var appSettings = require('../settings/app.json');
module.exports = {
    dist: {
        options: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeCommentsFromCDATA: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
        },
        files: [{
            expand: true,
            cwd: appSettings.dir.dist,
            src: '**/*.html',
            dest: appSettings.dir.dist
        }]
    }
};
