import gulp from 'gulp';

module.exports = options => {
    return () => {
        return gulp.src(options.src)
            .pipe(gulp.dest(options.dest));
    };
};