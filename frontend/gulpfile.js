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
    scss : 'stylesheets/',
    dist : '../lib/app/public/'
}
// Cleaning CSS Output Directory
gulp.task('clean:css', function(){
    return del([paths.dist+'css'], function(){
        console.log('Cleaning CSS Complete');
    });
});

// Cleaning Fonts Output Directory
gulp.task('clean:fonts', function(){
    return del([paths.dist+'fonts'], function(){
        console.log('Cleaning Fonts Complete');
    });
});

// Cleaning Everything
gulp.task('clean:all', ['clean:css', 'clean:fonts'], function(){
});

// Sass Compilation, prefixing and minification.
gulp.task('compile:sass',['clean:css'], function(){
  gulp.src(paths.scss+"application.scss")
    .pipe(sass())
    .pipe(prefix({
        browsers : ['last 2 versions'],
        cascade : false,
        remove : true
    }))
    .pipe(minify())
    .pipe(gulp.dest(paths.dist+'css'));
});

// Copy Fonts
gulp.task('fonts', function(){
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dist+'fonts'));
});

// Watch For Changes
gulp.task('watch', function(){
  gulp.watch(paths.scss+'/**/*.scss', ['compile:sass']);
})
