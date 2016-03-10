'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


var onError = function(err){
	$.util.log(err.plugin + ': ' + $.util.colors.red(err.message));
	$.util.beep();
};


gulp.task('js', function() {
	return gulp.src('./assets/javascripts/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'))
		.pipe($.uglify())
		.pipe(gulp.dest('./public/javascripts'));
});

gulp.task('sass', function () {
	return gulp.src('./assets/stylesheets/*.scss')
		.pipe($.sass())
		.on('error', onError)
		.pipe($.autoprefixer({
			browsers: ['> 5%'],
			cascade: false
		}))
		.pipe($.combineMediaQueries())
		.pipe($.csso())
		.pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('watch', function() {
	gulp.start('default');
	gulp.watch('./assets/**/*.scss', ['sass']);
	gulp.watch('./assets/**/*.js', ['js']);
});


gulp.task('default', ['sass', 'js']);
