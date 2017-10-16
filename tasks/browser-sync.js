import browserSync from 'browser-sync';
let bs = browserSync.create();

import modRewrite from 'connect-modrewrite';

module.exports = options => {
    return () => {
        bs.init({
            port: 8888,
            server: {
                baseDir: options.baseDir,
                middleware: [
                    modRewrite([
                        '^[^\\.]*$ /index.html [L]'
                    ])
                ]
            }
        });

        bs.watch(options.baseDir).on('change', bs.reload);
    };
 };
