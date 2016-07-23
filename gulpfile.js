var gulp = require('gulp'),
  connect = require('gulp-connect'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  autoprefix = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  compass = require('gulp-compass'),
  livereload = require('gulp-livereload'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  nodemon = require('gulp-nodemon');

var paths = {
  jsplugins: [
    'client/vendor_custom/js/vendor/modernizr-respond.min.js',
    'client/vendor_custom/js/helpers/excanvas.min.js',
    'client/vendor/jquery/dist/jquery.js',
    'client/vendor/bootstrap/dist/js/bootstrap.min.js',
    'client/vendor_custom/less/js/less.min.js',
    'client/vendor_custom/js/plugins.js',
    'client/vendor_custom/less/app.js',
    'client/vendor/highcharts/highstock.js',
    'client/vendor/angular/angular.js',
    'client/vendor/angular-resource/angular-resource.js',
    'client/vendor/angular-ui-router/release/angular-ui-router.js',
    'client/vendor/angular-touch/angular-touch.js',
    'client/vendor/angular-animate/angular-animate.js',
    'client/vendor/angular-ui-grid/ui-grid.js',
    'client/vendor/bootstrap-daterangepicker/moment.js',
    'client/vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
    'client/vendor/bootstrap-daterangepicker/daterangepicker.js',
    'client/vendor/bootstrap-daterangepicker/ng-bs-daterangepicker.js',
    'client/vendor/datatables/media/js/jquery.dataTables.min.js',
    'client/vendor/angular-datatables/dist/angular-datatables.min.js',
    'client/vendor/lodash/lodash.js',
    'client/vendor/notify/notify.min.js',
    'client/js/app.js',
    'client/js/services/lb-services.js',
    'client/views/dashboard/dashboardCtrl.js',
    'client/views/rates/ratesCtrl.js',
    'client/views/users/usersCtrl.js',
    'client/vendor_custom/js/pages/uiProgress.js',
    'client/vendor_custom/js/pages/formsValidation.js'
  ]
};

gulp.task('js', function() {
  gulp.src(paths.jsplugins)
    .pipe(uglify())
    .pipe(concat('rate.min.js'))
    .pipe(gulp.dest('client/public/build/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsplugins, ['js']);
});

gulp.task('autoload', [], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["./client"],
    port: 8000,
  });
  gulp.watch(['client/**/*.html'], reload);
  gulp.watch(['client/**/*.css'], reload);
});

gulp.task('default', [
  'js',
  'watch',
  'autoload'
]);


