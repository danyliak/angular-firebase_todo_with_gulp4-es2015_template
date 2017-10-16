import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

module.exports = options => {
	return () => {
		let ngDocOptions = {
			html5Mode: true,
			title: "Site name angular documentation",
			image: "http://localhost:8888/img/logo.jpg",
		};

		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError( (err) => {
					return {title: 'ng-docs error', message: err.message}
				})
			}))
			.pipe($.ngdocs.process(ngDocOptions))
			.pipe(gulp.dest(options.dest + '/docs'));
	}
};

