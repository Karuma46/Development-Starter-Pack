const {series, src, dest, watch} = require('gulp')
var bSync = require('browser-sync').create();
var clean = require('gulp-clean-css')
var pug = require('gulp-pug')

var sass = require('gulp-sass')
sass.compiler = require('node-sass')

const sassit = () => {
    return src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css'))
        .pipe(bSync.stream())
}

const cleanCSS = () => {
    return src('build/css/*.css')
        .pipe(clean())
        .pipe(dest('build/css'))
}

const pugify = () => {
    return src('src/app/*.pug')
    .pipe(pug())
    .pipe(dest('build'))
}

const serve = () => {
    bSync.init({
        server: './build'
    });

    watch([
        'src/scss/*.scss',
        'src/scss/**/*.scss'
    ], 
    series(sassit, cleanCSS))

    watch([
        'src/app/*.pug',
    ], series(pugify, bSync.reload))
}

exports.default = series(sassit, cleanCSS, pugify, serve)