const { src, dest, parallel, series, watch } = require('gulp');

const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const gulpif = require("gulp-if");
//const babel = require('gulp-babel');
const concat = require("gulp-concat");

/*const babelConfig = {
    presets: ['@babel/env'],
    plugins: ["@babel/plugin-proposal-class-properties"],
};*/
let DEV = false;

function mainCSS(){
    return src('css/main.css',{sourcemaps: DEV})
        .pipe(minifyCSS())
        .pipe(dest('css/css.min',{sourcemaps: DEV}));
}

function uglifyJS(){
    return src('js/*.js',{sourcemaps: DEV})
        //.pipe(babel(babelConfig))
        .pipe(gulpif(!DEV,uglify()))
        .pipe(concat('intellisense.min.js'))
        .pipe(dest('js/js.min',{sourcemaps: DEV}))
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