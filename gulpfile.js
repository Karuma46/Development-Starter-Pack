var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');

gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('cleanCss', function(){
  return gulp.src('src/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('src/css'))
});

gulp.task('serve', ['sass', 'cleanCss'], function(){
  browserSync.init({
    server: './src'
  });
  
  gulp.watch(['src/scss/*.scss'], ['sass', 'cleanCss']);
  gulp.watch(['src/*.html']).on('change',browserSync.reload);
});

gulp.task('default', ['serve']);