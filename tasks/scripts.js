import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();


module.exports = options => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:appScripts')})
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-summary'))
			.pipe($.notify( file => {
				if (file.jshint.success) return false;
				return "jshint: " + file.jshint.results.length + " errors in " + file.relative;
			}))
			.pipe($.babel({
				presets: ['env'],
				plugins: ['transform-runtime']
			}))
            .pipe($.plumber({
                errorHandler: $.notify.onError( (err) => {
                    return {title: 'Javascript error', message: err.message}
                })
            }))
            .pipe($.sourcemaps.init())
            .pipe($.ngAnnotate({
                single_quotes: true,
                add: true
            }))
            .pipe($.remember('appScripts'))
            .pipe($.concat('app.js'), {newLine: ';'})
            .pipe($.sourcemaps.write())
            .pipe($.if(options.isProd, $.rename({suffix: '.min'})))
            .pipe($.if(options.isProd, $.uglify()))
            .pipe(gulp.dest(options.dest));
    };
};