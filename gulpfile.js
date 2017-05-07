'use strict';


var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-develop-server');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('styles', function() {
   return gulp.src('./assets/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('browserify', function() {
    return browserify('./assets/js/app/app.js')
        .bundle()
        .on('error', function(e) {
            console.log(e);
        })
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('app.min.js'))
        .pipe(gulp.dest('./assets/js/app/'));
});

// run server
gulp.task( 'server:start', function() {
    server.listen( {
    	path: './server.js' })
});

gulp.task('styles:watch',function() {
    gulp.watch('./assets/styles/**/*.*', gulp.series('styles'));
});

gulp.task('browserify:watch',function() {
    gulp.watch(['assets/js/app/**/*.*','!assets/js/app/*.min.js'], gulp.series('browserify'));
});

gulp.task( 'server:restart', function() {
    gulp.watch('./server.js', server.restart );
});

gulp.task('watchers', gulp.parallel(
    'styles:watch',
    'server:start',
    'browserify:watch'
    )
)

gulp.task('start', gulp.series(
    'browserify',
    'styles',
    gulp.parallel(
        'watchers'
        )
    )
)
