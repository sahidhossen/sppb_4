const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('main', function() {
  return gulp.src(['./src/scss/main.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(concat('sppb_main_style.min.css'))
    .pipe(gulp.dest('../dist/css'))
})

gulp.task('builder', function() {
  return gulp.src(['./src/scss/builder.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(concat('sppb_builder_style.min.css'))
    .pipe(gulp.dest('../dist/css'))
})

gulp.task('watch', function(){
  gulp.watch('./src/scss/*.scss', gulp.series( gulp.parallel('main','builder')));
})