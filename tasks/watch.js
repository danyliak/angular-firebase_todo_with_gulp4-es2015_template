import gulp from 'gulp';
import path from 'path';

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

module.exports = options => {
    return () => {
        gulp.watch(options.paths.watchStyle, gulp.series('build:sass'));
        gulp.watch(options.paths.scripts, gulp.parallel('build:appScripts', 'build:ngdocs')).on('unlink', function(filepath) {
            $.remember.forget('appScripts', path.resolve(filepath));
        });
        gulp.watch(options.paths.images, gulp.series('build:images'));
        gulp.watch(options.paths.sprites, gulp.series('build:sprite'));
        gulp.watch(options.paths.fonts, gulp.series('build:fonts'));
        gulp.watch(options.paths.index, gulp.series('build:indexFile'));
        gulp.watch(options.paths.otherPages, gulp.series('build:otherPages'));
        gulp.watch('./bower.json', gulp.series('build:indexFile', 'build:otherPages'));
    };
};