var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer');

gulp.task('compile:sass', function(){
  gulp.src("stylesheets/application.scss")
    .pipe(sass())
    .pipe(prefix({
        browsers : ['last 2 versions'],
        cascade : false,
        remove : true
    }))
    .pipe(minify())
    .pipe(gulp.dest('bundle/css'));
}); 
