// We need a bunch of dependencies, but they all do an important
// part of this workflow
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var rev = require('gulp-rev');
var buffer = require('gulp-buffer');
var glob = require('glob');

// We create an array of dependencies. These are NPM modules you have
// installed in node_modules. Think: "require('react')" or "require('underscore')"
var dependencies = [
    'react' // react is part of this boilerplate
];

// Now this task both runs your workflow and deploys the code,
// so you will see "options.development" being used to differenciate
// what to do
var browserifyTask = function (options) {

  /* First we define our application bundler. This bundle is the
     files you create in the "app" folder */
    var appBundler = browserify({
        entries: [options.src], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: options.development, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    /* We set our dependencies as externals of our app bundler.
     For some reason it does not work to set these in the options above */
    (options.development ? dependencies : []).forEach(function (dep) {
        appBundler.external(dep);
    });

  /* This is the actual rebundle process of our application bundle. It produces
    a "main.js" file in our "build" folder. */
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulpif(!options.development, buffer()))
      .pipe(gulpif(!options.development, rev()))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  /* When we are developing we want to watch for changes and
    trigger a rebundle */
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  // And trigger the initial bundling
  rebundle();

  if (options.development) {

    // We need to find all our test files to pass to our test bundler
    var testFiles = glob.sync('./specs/**/*-spec.js');

    /* This bundle will include all the test files and whatever modules
       they require from the application */
    var testBundler = browserify({
      entries: testFiles,
      debug: true,
      transform: [reactify],
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    // Again we tell this bundle about our external dependencies
    dependencies.forEach(function (dep) {
      testBundler.external(dep);
    });

    /* Now this is the actual bundle process that ends up in a "specs.js" file
      in our "build" folder */
    var rebundleTests = function () {
      var start = Date.now();
      console.log('Building TEST bundle');
      testBundler.bundle()
        .on('error', gutil.log)
        .pipe(source('specs.js'))
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
        }));
    };

    // We watch our test bundle
    testBundler = watchify(testBundler);

    // We make sure it rebundles on file change
    testBundler.on('update', rebundleTests);

    // Then we create the first bundle
    rebundleTests();

    /* And now we have to create our third bundle, which are our external dependencies,
      or vendors. This is React JS, underscore, jQuery etc. We only do this when developing
      as our deployed code will be one file with all application files and vendors */
    var vendorsBundler = browserify({
      debug: true, // It is nice to have sourcemapping when developing
      require: dependencies
    });

    /* We only run the vendor bundler once, as we do not care about changes here,
      as there are none */
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));

  }

}

// We also have a simple css task here that you can replace with
// SaSS, Less or whatever
var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        console.log('Building SASS');
        var start = new Date();
        gulp.src(options.src)
          .pipe(compass({
              sass: './public/styles'
          }))
          .pipe(gulp.dest(options.dest))
          .pipe(notify(function () {
              console.log('SASS built in ' + (Date.now() - start) + 'ms');
          }));
      };
      run();
    gulp.watch(options.src, run);
    } else {
      gulp.src(options.src)
          .pipe(compass({
              sass: './public/styles'
          }))
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest(options.dest));
    }
}

// Starts our development workflow
gulp.task('default', function () {

  browserifyTask({
    development: true,
    src: './public/js/app.js',
    dest: './public/build'
  });

  cssTask({
    development: true,
    src: './public/styles/**/*.scss',
    dest: './public/build'
  });

});

// Starts our development workflow
gulp.task('online', function () {

  browserifyTask({
    development: false,
    src: './public/js/app.js',
    dest: './public/build'
  });

  cssTask({
    development: false,
    src: './public/styles/**/*.scss',
    dest: './public/build'
  });

});
