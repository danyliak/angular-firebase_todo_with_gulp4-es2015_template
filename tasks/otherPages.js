import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

module.exports = options => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:otherPages')})
            .pipe($.angularHtmlify({ customPrefixes: ['ui-'] }))
            .pipe($.if(options.isProd, $.htmlmin({collapseWhitespace: true})))
            .pipe(gulp.dest(options.dest));
    };
};

