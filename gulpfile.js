const {series, src, dest, watch} = require('gulp')
var sass = require('gulp-sass')
sass.compiler = require('node-sass')
var bSync = require('browser-sync').create();
var clean = require('gulp-clean-css')
var pug = require('gulp-pug')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')

const sassit = () => {
    return src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(clean())
        .pipe(dest('build/css'))
        .pipe(bSync.stream())
}

const pugify = () => {
    return src('src/app/*.pug')
    .pipe(pug())
    .pipe(dest('build'))
}

const babely = () => {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .on('error', e =>{
            console.log('>>>>> Error', e)
            this.emit('end')
        })
        .pipe(concat('bundle.js'))
        .pipe(uglify('bundle.js'))
        .pipe(dest('build/js'))
}

const imgmin = () => {
    return src('src/img/*')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('build/img'))
}

const serve = () => {
    bSync.init({
        server: './build'
    });

    watch([
        'src/scss/*.scss',
        'src/scss/**/*.scss'
    ], series(sassit)).on('change', bSync.reload)

    watch([
        'src/img/*'
    ], series(imgmin)).on('change', bSync.reload)

    watch([
        'src/app/*.pug',
        'src/app/**/*.pug'
    ], series(pugify)).on('change', bSync.reload)

    watch([
        'src/js/*.js',
        'src/js/**/*.js'
    ], series(babely)).on('change', bSync.reload)
}


exports.build = series(sassit, babely, pugify, imgmin)
exports.default = series(this.build,serve)