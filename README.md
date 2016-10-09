## postcss-lazyimagecss

A [PostCSS](https://github.com/postcss/postcss) plugin that generates images's CSS `width` & `height` attributes from stylesheets automatically.

Another lazy way to write CSS, feel free to use it :)

Based on [gulp-lazyimagecss](https://github.com/weixin/gulp-lazyimagecss). Thanks to [hzlzh](https://github.com/hzlzh) and [littledu](https://github.com/littledu).

	/* Input */
	.icon-close {
		background-image: url(../slice/icon-close.png);
	}
	
	/* Output */
	.icon-close {
		background-image: url(../slice/icon-close.png);
		width: 16px;
		height: 16px;
	}


## Usage

### Work with [Gulp](http://gulpjs.com/)

Example:

	var gulp = require('gulp');
	var postcss = require('gulp-postcss');
	var lazyimagecss = require('postcss-lazyimagecss');

	gulp.task('css', function () {
		.pipe(postcss([lazyimagecss({
			imagePath: ['../img','../slice']
		})]))
		.pipe(gulp.dest('./dist/css'));
	});
	

### Work with Gulp & [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)

Example:

	var gulp = require('gulp');
	var postcss = require('gulp-postcss');
	var lazyimagecss = require('postcss-lazyimagecss');
	var sourcemaps = require('gulp-sourcemaps');

	gulp.task('css', function () {
		return gulp.src('./src/css/*.css')
			.pipe(sourcemaps.init())
			.pipe(another-plugin())
			.pipe(postcss([lazyimagecss({
				imagePath: ['../img','../slice']
			})]))
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest('./dist'));
	});

