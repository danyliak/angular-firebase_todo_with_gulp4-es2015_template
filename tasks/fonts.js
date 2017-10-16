import gulp from 'gulp';

module.exports = options => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:fonts')})
            .pipe(gulp.dest(options.dest));
    };
};