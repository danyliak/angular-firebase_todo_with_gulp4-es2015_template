import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();
import pngquant from 'imagemin-pngquant';

module.exports = options => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:images')})
            .pipe($.newer(options.dest))
            .pipe($.imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(options.dest));
    };
};