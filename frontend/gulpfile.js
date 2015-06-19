var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css')

gulp.task('compile:sass', function(){
  gulp.src("stylesheets/application.scss")
    .pipe(sass())
    .pipe(minify())
    .pipe(gulp.dest('generated/css'));
}); 
