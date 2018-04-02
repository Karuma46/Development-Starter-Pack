var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');


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

gulp.task('babel', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', function(e){
          console.log('>>>> Error', e);
          this.emit('end');
        })
        .pipe(concat('all.js'))
        .pipe(uglify('all.js'))
        .pipe(gulp.dest('build/js'))
);

gulp.task('serve', ['sass', 'cleanCss', 'babel'], function(){
  browserSync.init({
    server: './build'
  });
  
  gulp.watch(['src/scss/*.scss'], ['sass', 'cleanCss']);
  gulp.watch(['src/js/*.js'], ['babel']).on('change', browserSync.reload);
  gulp.watch(['build/*.html']).on('change',browserSync.reload);
});

gulp.task('default', ['serve']);