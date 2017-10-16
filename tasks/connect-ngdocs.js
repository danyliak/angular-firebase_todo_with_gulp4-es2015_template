import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

module.exports = () => {
	return () => {
		$.connect.server({
			root: 'dist/docs',
			livereload: false,
			fallback: 'dist/docs/index.html',
			port: 8083
		});
	}
};