const { src, dest, parallel, series, watch } = require('gulp');

const minifyCSS = require('gulp-minify-css');
const terser = require('gulp-terser');
const concat = require("gulp-concat");


function uglifyJS(){
    return src('js/*.js')
        .pipe(concat('intellisense.min.js'))
        .pipe(terser())
        .pipe(dest('js/intellisense-min'))
}

function mainCSS(){
    return src('css/main.css')
        .pipe(minifyCSS())
        .pipe(dest('css/intellisense-min'));
}

const JS = series(
    uglifyJS
);

const CSS = series(
    mainCSS
);

function watcher(){
    watch(['css/main.css'],series(setDev,CSS));
        watch(["js/*.js"],series(setDev,JS))
}

function setDev(cb) {
    DEV = true;
    cb();
}

function setProd(cb) {
    DEV = false;
    cb();
}

const dev = series(setDev,parallel(JS,CSS),watcher);
exports.watcher = watcher;
exports.dev = dev;
exports.default = series(setProd,parallel(JS,CSS));