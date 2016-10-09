var gulp = require('gulp');
var postcss = require('gulp-postcss');
var lazyimagecss = require('./index.js');
var mocha = require('gulp-mocha');

var files = ['index.js'];
var watchFiles = ['index.js', 'test/**/*'];

gulp.task('lint', function () {
	var eslint = require('gulp-eslint');
	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test', function () {
	return gulp.src('test/*.js', { read: false })
		.pipe(mocha({ timeout: 1000000 }));
});

gulp.task('css', function () {
	return gulp.src('./test/src/css/*.css')
		.pipe(postcss([lazyimagecss({
			imagePath: ['../img','../slice']
		})]))
		.pipe(gulp.dest('./test/dist/css'));
});

gulp.task('default', ['watch']);

gulp.task('watch', function () {
	gulp.watch(watchFiles, ['css', 'test', 'lint']);
});
