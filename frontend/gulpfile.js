var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    uglify     = require('gulp-uglify'),
    minify     = require('gulp-minify-css'),
    prefix     = require('gulp-autoprefixer'),
    del        = require('del'),
    concat     = require('gulp-concat'),
    scss       = require('gulp-sass'),
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
      'bower_components/jquery.atwho/dist/js/jquery.atwho.js',
      'bower_components/Caret.js/dist/jquery.caret.js',
      'bower_components/jquery-cookie/jquery.cookie.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular/angular.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'bower_components/jstree/dist/jstree.js',
      'bower_components/theia-sticky-sidebar/js/theia-sticky-sidebar.js',
      'scripts/libs/emojify-cdn.js',
      'scripts/libs/jquery.zclip.js',
      'scripts/libs/ui-bootstrap-custom-tpls-0.13.0.js',
      // Application Specific Files
      'app/js/namespace.js',
      'app/js/clipboardcopy.js',
      'app/js/nitstats.js',
      'app/js/script.js',
      'app/js/submission.js',
      'app/js/test_output.js',
      'app/js/tree_source.js',
      'app/js/gen.coffee.js'
    ],
    coffee : [
      'app/js/app.coffee',
      'app/js/controllers/*.coffee'
    ],
    images : ['bower_components/jstree/dist/themes/**/*']
}
// Cleaning CSS Output Directory
gulp.task('clean:css', function(){
    return del([paths.dist+'css'], options.del, function(){
        console.log('Cleaning CSS Complete');
        fs = require('fs');
        fs.readFile('../lib/app/public/css/application.css', 'utf8', function(err, data){
          console.log("ERROR", err);
          console.log("DATA", data);
        });
    });

});

// Cleaning JS Output Directory
gulp.task('clean:js', function(){
    return del([paths.dist+'js'], options.del, function(){
        console.log('Cleaning JS Complete');
    });
});

// Cleaning Fonts Output Directory
gulp.task('clean:fonts', function(){
    return del([paths.dist+'fonts'], options.del, function(){
        console.log('Cleaning Fonts Complete');
    });
});

// Cleaning Everything
gulp.task('clean:all', ['clean:css', 'clean:fonts', "clean:js"], function(){
});

// SCSS Compilation, prefixing and minification.
gulp.task('scss',['clean:css'], function(){
  return gulp.src(paths.scss+"application.scss")
    .pipe(scss().on('error', scss.logError))
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

// Copy Images 
gulp.task("images", function(){
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist+"img"));
});

// Watch For Changes
gulp.task('watch', function(){
  // Styles
  gulp.watch(paths.scss+'/**/*.scss', ['scss']);

  //Scripts 
  gulp.watch(['app/**/**.js','app/**/*.coffee'], ['scripts']);
  
});

gulp.task("default", ['scripts','scss','fonts', 'images'], function(){
  fs.readFile('../lib/app/public/css/application.css', 'utf8', function(err, data){
    console.log("ERROR", err);
    console.log("DATA", data);
  });
});
