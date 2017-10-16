import gulp from 'gulp';

let isProd = process.argv.indexOf('--production') > -1;

const lazyRequireTask = (taskName, path, options) => {
    options = options || {};
    gulp.task(taskName, () => {
        let task = require(path).call(this, options);
        return task();
    })
};

// main paths
const paths = {
    scripts: ['src/app/app.module.js', 'src/app/**/module.js', 'src/app/**/*.js'],
    styles: ['src/sass/app.sass'],
    watchStyle: ['src/sass/**/*.scss', 'src/sass/**/*.sass'],
    images: ['src/img/**/*', '!src/img/sprites/**/*'],
    sprites: 'src/img/sprites/**/*',
    fonts: 'src/fonts/**/*',
    index: 'src/index.html',
    otherPages: ['src/**/*.html', '!src/index.html'],
    otherAssets: ['src/.htaccess'],
    baseDir: 'dist',
};

// init tasks
lazyRequireTask('serve', './tasks/browser-sync', {
    baseDir: paths.baseDir
});
lazyRequireTask('build:sass', './tasks/styles', {
    src: paths.styles,
    dest: paths.baseDir + '/css',
    isProd: isProd
});
lazyRequireTask('build:fonts', './tasks/fonts', {
    src: paths.fonts,
    dest: paths.baseDir + '/fonts'
});
lazyRequireTask('build:appScripts', './tasks/scripts', {
    src: paths.scripts,
    dest: paths.baseDir + '/app',
    isProd: isProd
});
lazyRequireTask('build:images', './tasks/images', {
    src: paths.images,
    dest: paths.baseDir + '/img',
    isProd: isProd
});
lazyRequireTask('build:sprite', './tasks/sprite', {
    src: paths.sprites,
    dest: paths.baseDir,
    isProd: isProd
});
lazyRequireTask('build:indexFile', './tasks/index-file', {
    src: paths.index,
    dest: paths.baseDir,
    isProd: isProd
});
lazyRequireTask('build:otherPages', './tasks/otherPages', {
    src: paths.otherPages,
    dest: paths.baseDir,
    isProd: isProd
});

lazyRequireTask('build:otherAssets', './tasks/otherAssets', {
    src: paths.otherAssets,
    dest: paths.baseDir,
});

lazyRequireTask('build:ngdocs', './tasks/ngdocs', {
    src: paths.scripts,
    dest: paths.baseDir,
});

lazyRequireTask('docs', './tasks/connect-ngdocs', {
    src: paths.baseDir
});

lazyRequireTask('pre-commit', './tasks/pre-commit', {});

lazyRequireTask('deploy', './tasks/deploy', {
    src: paths.baseDir
});

lazyRequireTask('clean', './tasks/clean', {
    src: paths.baseDir,
});
lazyRequireTask('watch', './tasks/watch', {
    paths: paths
});
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('build:sass', 'build:fonts', 'build:appScripts', 'build:images', 'build:sprite',
        'build:otherAssets', 'build:ngdocs'),
    gulp.parallel('build:indexFile', 'build:otherPages'),
    gulp.parallel('watch', 'serve')
));

gulp.task('default', gulp.series('build'));