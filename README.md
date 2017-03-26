# postcss-lazyimagecss 

[![Greenkeeper badge](https://badges.greenkeeper.io/Jeff2Ma/postcss-lazyimagecss.svg)](https://greenkeeper.io/)

<img align="right" width="130" height="130" title="PostCSS" src="http://postcss.github.io/postcss/logo.svg">

[![Build Status](https://travis-ci.org/Jeff2Ma/postcss-lazyimagecss.svg?branch=master)](https://travis-ci.org/Jeff2Ma/postcss-lazyimagecss)
[![npm version](https://badge.fury.io/js/postcss-lazyimagecss.svg)](http://badge.fury.io/js/postcss-lazyimagecss)

A [PostCSS](https://github.com/postcss/postcss) plugin that generates images's CSS `width` & `height` properties from stylesheets automatically.

Another lazy way to write CSS, feel free to use it :)

Based on [gulp-lazyimagecss](https://github.com/weixin/gulp-lazyimagecss). Thanks to [hzlzh](https://github.com/hzlzh) and [littledu](https://github.com/littledu).

```css
/* Input */
.icon-close {
	background-image: url(../slice/icon-close.png); //icon-close.png - 16x16
}

.icon-new {
	background-image: url(../slice/icon-new@2x.png); //icon-new@2x.png - 16x16
}
	
/* Output */
.icon-close {
	background-image: url(../slice/icon-close.png);
	width: 16px;
	height: 16px;
}

.icon-new {
	background-image: url(../slice/icon-new@2x.png);
	width: 8px;
	height: 8px;
	background-size: 8px 8px;
}

```

## Features

- Support `jpg`/`jpeg`/`png`/`gif`/`bmp`/`svg` file type.

- Support retina image (file name should like `demo@2x.png`).

- Both `background-image: url()` and `background: url()` can be detected successfully.

- CSS property generating will be ignored if any of those `width` / `height` / `background-size` already set.


## Installation

Install with npm:

	npm install postcss-lazyimagecss --save-dev
	

Or install width [yarn](https://github.com/yarnpkg/yarn):

	yarn add postcss-lazyimagecss --dev

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

## Contributing

[Issues](https://github.com/Jeff2Ma/postcss-lazyimagecss/issues/) and [Pull requests](https://github.com/Jeff2Ma/postcss-lazyimagecss/pulls) are welcome.

```shell
$ git clone https://github.com/Jeff2Ma/postcss-lazyimagecss
$ cd postcss-lazyimagecss
$ npm i
$ gulp
```
