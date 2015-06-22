var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    del    = require('del');

var paths = {
    fonts : [
        // 'stylesheets/vendors/bootstrap/fonts/**/*',
        'stylesheets/vendors/font-awesome/fonts/**/*'
    ],
    scss : ['stylesheets/application.scss']
}
// Cleaning Directories
gulp.task('clean:css', function(){
    del(['bundle/css'], function(){
        console.log("Cleaning CSS Complete");
    });
});

// Cleaning Directories
gulp.task('clean:all', function(){
    del(['bundle'], function(){
        console.log("Cleaning All Complete");
    });
});

// Sass Compilation, prefixing and minification.
gulp.task('compile:sass',['clean:css'], function(){
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(prefix({
        browsers : ['last 2 versions'],
        cascade : false,
        remove : true
    }))
    .pipe(minify())
    .pipe(gulp.dest('bundle/css'));
});

gulp.task("fonts", function(){
    gulp.src(paths.fonts)
        .pipe(gulp.dest("bundle/fonts"));
}) 
