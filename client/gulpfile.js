/**
 * @author  Jozef Butko
 * @url		  www.jozefbutko.com/resume
 * @date    March 2015
 * @license MIT
 *
 * AngularJS Boilerplate: Build, watch and other useful tasks
 *
 * The build process consists of following steps:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    mainBowerFiles = require('main-bower-files');


// optimize images
gulp.task('images', function() {
  return gulp.src('./src/_shared/images/**/*')
    .pipe($.changed('./_build/dev/_shared/images'))
    .pipe(gulp.dest('./_build/dev/_shared/images'));
    // .pipe($.changed('./_build/prod/_shared/images'))
    // .pipe(gulp.dest('./_build/prod/_shared/images'));
    // .pipe($.imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true
    // }))
    // .pipe(gulp.dest('./_build/prod/_shared/images'))
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./_build/dev/"
    }
  });
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    //.pipe($.uglify())
    .pipe(gulp.dest('./_build/prod'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({keepBreaks:true}))
    .pipe(gulp.dest('./_build/dev/styles/'));
    // .pipe(gulp.dest('./_build/prod/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./*.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('./_build/prod'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./src/_shared/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
    .pipe($.changed('./_build/dev/_shared/fonts'))
    // .pipe(gulp.dest('./_build/prod/_shared/fonts'))
    .pipe(gulp.dest('./_build/dev/_shared/fonts'));
});

// copy bower_components folder
gulp.task('bower', function() {
  // gulp.src('./bower_components/**/*.*')
  //   .pipe($.changed('./_build/dev/_shared/vendor'))
  //   .pipe(gulp.dest('./_build/dev/_shared/vendor'));
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
      .pipe($.changed('./_build/dev/_shared/vendor'))
      .pipe(gulp.dest('./_build/dev/_shared/vendor'));
});

// copy app folder
gulp.task('copyApp', function() {
  return gulp.src('./src/app/**/*.*')
    .pipe($.changed('./_build/dev/app/'))
    .pipe(gulp.dest('./_build/dev/app/'));
});

// copy app folder
gulp.task('copyVendor', function() {
  return gulp.src('./src/_shared/vendor/**/*.*')
    .pipe($.changed('./_build/dev/_shared/vendor/'))
    .pipe(gulp.dest('./_build/dev/_shared/vendor/'));
});

// copy config folder
gulp.task('copyConfig', function() {
  return gulp.src('./src/config/**/*.*')
    .pipe($.changed('./_build/dev/config/'))
    .pipe(gulp.dest('./_build/dev/config/'));
});

// copy app folder
gulp.task('copyIndex', function() {
  return gulp.src('./src/index.html')
    .pipe($.changed('./_build/dev/'))
    // .pipe(gulp.dest('./_build/prod/'))
    .pipe(gulp.dest('./_build/dev/'));
});

// copy js files
gulp.task('copyJs', function() {
  return gulp.src('./src/_shared/*.js')
    .pipe($.changed('./_build/dev/_shared/'))
    .pipe(gulp.dest('./_build/dev/_shared/'));
});

// intro webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/dev/'
    }
  }, done);
});

// intro webserver from _build folder to check how it will look in production
gulp.task('server-build-prod', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/prod/'
    }
  }, done);
});

gulp.task('server-build-dev', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/dev'
    }
  }, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    './_build/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// concat files
gulp.task('concat', function() {
  gulp.src('./js/*.js')
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest('./_build/prod/'));
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp.src('./src/_shared/styles/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      style: 'expanded'
    }))
    .on('error', $.notify.onError({
      title: 'SASS Failed',
      message: 'Error(s) occurred during compile!'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('_build/dev/_shared/styles'))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

// SASS Build task
gulp.task('sass:build', function() {
  var s = $.size();

  return gulp.src('./src/_shared/styles/style.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .on('error', $.notify.onError({
      title: 'SASS Failed',
      message: 'Error(s) occurred during compile!'
    }))
    .pipe($.autoprefixer('last 3 version'))
    // .pipe($.uncss({
    //   html: ['./src/index.html', './views/**/*.html', './app/**/*.html'],
    //   ignore: [
    //     '.index',
    //     '.slick',
    //     /\.owl+/,
    //     /\.owl-next/,
    //     /\.owl-prev/
    //   ]
    // }))
    .pipe($.minifyCss({
      keepBreaks: true,
      aggressiveMerging: false,
      advanced: false
    }))
    // .pipe(gulp.dest('_build/prod/_shared/styles'))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('_build/prod/_shared/styles'))
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total CSS size ' + s.prettySize;
      }
    }));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// index.html build
// script/css concatenation
gulp.task('usemin', function() {
  return gulp.src('./_build/prod/index.html')
    // add templates path
    .pipe($.htmlReplace({
      'templates': '<script type="text/javascript" src="js/templates.js"></script>'
    }))
    .pipe($.usemin({
      css: [],
      libs: [],
      nonangularlibs: [],
      angularlibs: [],
      appcomponents: [],
      mainapp: []
    }))
    .pipe(gulp.dest('./_build/prod/'));
});

// make templateCache from all HTML files
gulp.task('templates', function() {
  return gulp.src([
      './src/**/*.html',
      '!bower_components/**/*.*',
      '!node_modules/**/*.*',
      '!_build/**/*.*'
    ])
    .pipe($.minifyHtml())
    .pipe($.angularTemplatecache({
      module: 'drilleo'
    }))
    .pipe(gulp.dest('./_build/dev/js'));
    // .pipe(gulp.dest('./_build/prod/js'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// calculate build folder size
gulp.task('build:size', function() {
  var s = $.size();

  return gulp.src('./_build/prod/**/*.*')
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total build size ' + s.prettySize;
      }
    }));
});


// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['bower', 'copyApp', 'copyConfig',
  'copyIndex', 'copyVendor', 'copyJs', 'browser-sync', 'fonts', 'images', 'sass'], function() {
  gulp.watch('./_build/shared/styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['src/*.html', 'src/**/*.html'], ['bower', 'copyApp', 'copyConfig',
    'copyIndex', 'copyVendor', 'copyJs','bs-reload']);
  gulp.watch(['src/app/*.js', 'src/app/**/*.js', 'js/*.js'], ['copyApp', 'copyConfig',
    'copyIndex', 'copyVendor', 'copyJs','bs-reload']);
  gulp.watch(['./src/_shared/styles/*.scss', './src/app/*.scss', './src/app/**/*.scss'], ['sass']);
});


/**
 * build task:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'bower',
    'sass:build',
    'copyIndex',
    'images',
    'templates',
    'usemin',
    'fonts',
    'build:size',
    callback);
});
