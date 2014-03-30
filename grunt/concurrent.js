module.exports = {
    server: [
        'compass:server',
        'copy:styles'
    ],
    test: [
        'copy:styles'
    ],
    stg: [
        'compass:stg',
        'copy:styles',
    ],
    dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin'
    ]
};
