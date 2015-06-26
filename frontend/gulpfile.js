var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    del    = require('del');

var paths = {
    fonts : [
        'stylesheets/vendors/font-awesome/fonts/**/*'
    ],
    scss : ['stylesheets']
}
// Cleaning Directories
gulp.task('clean:css', function(){
    return del(['bundle/css'], function(){
        console.log("Cleaning CSS Complete");
    });
});

// Cleaning Everything
gulp.task('clean:all', ["clean:css"], function(){
});

// Sass Compilation, prefixing and minification.
gulp.task('compile:sass',['clean:css'], function(){
  gulp.src(paths.scss+"/application.scss")
    .pipe(sass())
    .pipe(prefix({
        browsers : ['last 2 versions'],
        cascade : false,
        remove : true
    }))
    .pipe(minify())
    .pipe(gulp.dest('bundle/css'));
});

// Copy Fonts
gulp.task("fonts", function(){
    gulp.src(paths.fonts)
        .pipe(gulp.dest("bundle/fonts"));
});

// Watch For Changes
gulp.task("watch", function(){
  gulp.watch(paths.scss+"/**/*.scss", ["compile:sass"]);
})
