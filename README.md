# postcss-lazyimagecss 

[![Build Status](https://travis-ci.org/Jeff2Ma/postcss-lazyimagecss.svg?branch=master)](https://travis-ci.org/Jeff2Ma/postcss-lazyimagecss)
[![npm version](https://badge.fury.io/js/postcss-lazyimagecss.svg)](http://badge.fury.io/js/postcss-lazyimagecss)

[![NPM](https://nodei.co/npm/postcss-lazyimagecss.png)](https://nodei.co/npm/postcss-lazyimagecss/)

A [PostCSS](https://github.com/postcss/postcss) plugin that generates images's CSS `width` & `height` properties from stylesheets automatically.

Another lazy way to write CSS, feel free to use it :)

Based on [gulp-lazyimagecss](https://github.com/weixin/gulp-lazyimagecss). Thanks to [hzlzh](https://github.com/hzlzh) and [littledu](https://github.com/littledu).

```css
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
```
## Installation

Install with npm:

	npm install postcss-lazyimagecss --save-dev
	

Or install width [yarn](https://github.com/yarnpkg/yarn):

	yarn add postcss-lazyimagecss

## Usage

### Work with [Gulp](http://gulpjs.com/)

Example:

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var lazyimagecss = require('postcss-lazyimagecss');

gulp.task('css', function () {
	return gulp.src('./src/css/*.css')
	    .pipe(another-plugin())
		.pipe(postcss([lazyimagecss({
			imagePath: ['../img','../slice']
		})]))
		.pipe(gulp.dest('./dist/css'));
});
```	

### Work with Gulp & [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)

Example:

```js
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
```

## Options
- **imagePath** Set image path to be worked (e.g. `['../slice','../img']`)

- **width**  Whether output `width` properties in CSS ( default: `true` )

- **height**  Whether output `height` properties in CSS ( default: `true` )

- **backgroundSize** Whether output `background-size` properties in CSS ( default: `true` )

