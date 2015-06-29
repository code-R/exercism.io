var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    uglify     = require('gulp-uglify'),
    minify     = require('gulp-minify-css'),
    prefix     = require('gulp-autoprefixer'),
    del        = require('del'),
    concat     = require('gulp-concat'),
    sass       = require('gulp-ruby-sass'),
    coffee     = require('gulp-coffee'),
    ngAnnotate = require('gulp-ng-annotate');

var options = {
  del : {
    force : true
  },
  prefix : {
      browsers : ['last 2 versions'],
      cascade : false,
      remove : true
  },
  minify : {
    keepSpecialComments : 0
  }
};

var paths = {
    fonts : [
        'stylesheets/vendors/font-awesome/fonts/**/*'
    ],
    scss : 'stylesheets/',
    dist : '../lib/app/public/',
    scripts : [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular/angular.js',
      'bower_components/Caret.js/dist/jquery.caret.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/emojify.js/dist/js/emojify.js',
      'bower_components/jquery-cookie/jquery.cookie.js',
      'bower_components/jquery.atwho/dist/js/jquery.atwho.js',
      'bower_components/jstree/dist/jstree.js',
      'bower_components/theia-sticky-sidebar/js/theia-sticky-sidebar.js',
      'bower_components/zeroclipboard/dist/ZeroClipboard.js',
      'scripts/libs/ui-bootstrap-custom-tpls-0.13.0.js',
      // Application Specific Files
      'app/js/namespace.js',
      'app/js/gen.coffee.js',
      'app/js/clipboardcopy.js',
      'app/js/nitstats.js',
      'app/js/script.js',
      'app/js/submission.js',
      'app/js/test_output.js',
      'app/js/tree_source.js'
    ],
    coffee : [
      'app/js/app.coffee',
      'app/js/controllers/*.coffee'
    ]
}
// Cleaning CSS Output Directory
gulp.task('clean:css', function(){
    return del([paths.dist+'css'], options.del, function(){
        console.log('Cleaning CSS Complete');
    });
});

// Cleaning Fonts Output Directory
gulp.task('clean:fonts', function(){
    return del([paths.dist+'fonts'], options.del, function(){
        console.log('Cleaning Fonts Complete');
    });
});

// Cleaning Everything
gulp.task('clean:all', ['clean:css', 'clean:fonts'], function(){
});

// SCSS Compilation, prefixing and minification.
gulp.task('scss',['clean:css'], function(){
  return sass(paths.scss+"application.scss")
    .pipe(prefix(options.prefix))
    .pipe(minify(options.minify))
    .pipe(gulp.dest(paths.dist+'css'));
});

// Coffee Compilation
gulp.task("coffee", function(){
  return gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(concat('gen.coffee.js'))
    .pipe(gulp.dest('app/js'));
});

// Scripts
gulp.task('scripts',['coffee'], function(){
  return gulp.src(paths.scripts)
    .pipe(concat('hootcode.min.js'))
    .pipe(jshint())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('../lib/app/public/js'));
});

// Copy Fonts
gulp.task('fonts', function(){
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dist+'fonts'));
});

// Watch For Changes
gulp.task('watch', function(){
  gulp.watch(paths.scss+'/**/*.scss', ['scss']);
})
