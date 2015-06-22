var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    del    = require('del');

// Cleaning Directories
gulp.task('clean', function(){
    del(['bundle'], function(){
        console.log("Cleaning Complete");
    });
});

// Sass Compilation, prefixing and minification.
gulp.task('compile:sass',['clean'], function(){
  return gulp.src("stylesheets/application.scss")
    .pipe(sass())
    .pipe(prefix({
        browsers : ['last 2 versions'],
        cascade : false,
        remove : true
    }))
    .pipe(minify())
    .pipe(gulp.dest('bundle/css'));
}); 
