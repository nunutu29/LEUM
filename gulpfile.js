var watchify      = require('watchify');
var gulp          = require('gulp');
var source        = require('vinyl-source-stream');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var cleanCSS      = require('gulp-clean-css');
var concat        = require('gulp-concat');
const imagemin    = require('gulp-imagemin');
const pngquant    = require('imagemin-pngquant');
const rename      = require('gulp-rename');
var browserify    = require('browserify');
var buffer        = require('vinyl-buffer');
var gutil         = require('gulp-util');
var babelify      = require('babelify');
var assign        = require('lodash.assign');
var browserSync   = require('browser-sync');

var config = {
  jsConcatFiles: [
      './node_modules/jquery/dist/jquery.min.js',
      './js/prefixfree.min.js',
      './js/classie.js',
      './js/api.js',
      './js/cookie.js',
      './js/app.js',
      './js/jquery.mCustomScrollbar.js',
      './js/bootstrap.min.js',
      './js/select2.full.min.js',
      './js/materialize.js',
      './js/readRDF.js',
      './js/ann-menu.js',
      './js/register.js',
      './js/back_to_top.js',
      './js/main.js'
    ],
    cssConcatFiles: [
      './css/flat-ui.min.css',
      './css/materialize.css',
      './css/demo.css',
      './css/component.css',
      './css/login.css',
      './css/jquery.mCustomScrollbar.css',
      './css/bootstrap.css',
      './css/style.css',
    ]
  }

// ////////////////////////////////////////////////
// Scripts Tasks
// ///////////////////////////////////////////////

gulp.task('js', function() {
  return gulp.src(config.jsConcatFiles)
  .pipe(sourcemaps.init())
    .pipe(concat('temp.js'))
    .pipe(uglify())
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'JS ERROR:' +
      '\n*********************************** \n\n'
      )))
    .pipe(rename('index.min.js'))   
    .pipe(sourcemaps.write('./dest/maps'))
    .pipe(gulp.dest('./dest/js/'));
});
// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

gulp.task('html', function() {
  return gulp.src('*.php')
});


// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function() {
    return gulp.src(config.cssConcatFiles)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'CSS ERROR:' +
        '\n*********************************** \n\n'
        )))
        .pipe(autoprefixer({
              browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9'],
              cascade: false
          }))
        .pipe(concat('index.min.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dest/css'))
 });
// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('media', function() {
    return gulp.src('mediaq.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'MEDIAQ ERROR:' +
        '\n*********************************** \n\n'
        )))
        .pipe(autoprefixer({
              browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9'],
              cascade: false
          }))
        .pipe(rename('mediaq.min.css')) 
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dest/css'))
 });

///////////////////////////////////////////////////
// images
///////////////////////////////////////////////////
gulp.task('images', function() {
  return gulp.src('./img/*')
    .pipe(sourcemaps.init())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dest/img'));
});

// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('*.php', ['html']);
  gulp.watch('./css/*.css', ['styles']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./mediaq.css', ['media']);
});


gulp.task('default', ['js', 'styles', 'media', 'images', 'watch']);

