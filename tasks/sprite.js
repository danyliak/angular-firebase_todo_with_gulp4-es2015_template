import gulp from 'gulp';
import merge from 'merge-stream';
import pngquant from 'imagemin-pngquant';
import buffer from 'vinyl-buffer';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();


module.exports = options => {
    return () => {

        let spriteData = gulp.src(options.src).pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            imgPath: '../img/sprite.png'
            //retinaImgName: 'sprite@2x.png',
            //retinaSrcFilter: ['./src/img/sprites/*@2x.*']
        }));

        let imgStream = spriteData.img
            .pipe(buffer())
            .pipe($.imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(options.dest + '/img'));

        let cssStream = spriteData.css
            .pipe($.if(options.isProd, $.rename({suffix: '.min'})))
            .pipe($.if(options.isProd, $.cleanCss()))
            .pipe(gulp.dest(options.dest + '/css'));

        return merge(imgStream, cssStream);
    };
};
