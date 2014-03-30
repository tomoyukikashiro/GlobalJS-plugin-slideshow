module.exports = {
    options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
    },
    dist: {
        files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
        }]
    }
};
