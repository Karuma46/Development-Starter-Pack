var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');

gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('cleanCss', function(){
  return gulp.src('build/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('build/css'));
});

gulp.task('serve', ['sass', 'cleanCss'], function(){
  browserSync.init({
    server: './build'
  });
  
  gulp.watch(['src/scss/*.scss'], ['sass', 'cleanCss']);
  gulp.watch(['build/*.html']).on('change',browserSync.reload);
});

gulp.task('default', ['serve']);