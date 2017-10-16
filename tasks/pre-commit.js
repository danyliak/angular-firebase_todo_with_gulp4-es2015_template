import gulp from 'gulp';
import guppyFn from 'git-guppy';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();
const guppy = guppyFn(gulp);

module.exports = () => {
    return () => {
        return gulp.src(guppy.src('pre-commit'))
            .pipe($.filter(['src/**/*.js']))
            .pipe($.debug())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-summary'))
            .pipe($.notify( (file) => {
                if (file.jshint.success) return false
                return "Before commit check js-errors: " + file.jshint.results.length + " errors in " + file.relative;
            }))
            .pipe($.jshint.reporter('fail'));
    };
};
