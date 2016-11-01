var path = require('path');
var fs = require('fs');
var dirname = require('path').dirname;
var postcss = require('postcss');
var _ = require('lodash');
var fastImageSize = require('./lib/fastimagesize');

/**
 * a helper with recursion to find the real image absolute path,
 * deal with the issue like `../../img.jpg` and so on.
 * update: just do two times but no recursion.
 */
function fixAbsolutePath(dir, relative) {
	// find the first time
	var absolute = path.resolve(dir, relative);

	if (!fs.existsSync(absolute) && (relative.indexOf('../') > -1)) {
		relative = relative.replace('../', '');
		// find the second time
		absolute = path.resolve(dir, relative);
	}
	return absolute;
}

/**
 * main function
 */
module.exports = postcss.plugin('lazyimagecss', function (options) {
	return function (css) {
		options = options || {};

		options = _.extend({
			width: true,
			height: true,
			backgroundSize: true,
			imagePath: []
		}, options);

		var imagePath = options.imagePath;

		if (imagePath.length) {
			imagePath = '(' + options.imagePath.join('|') + '/)';
			imagePath = imagePath.replace(/\./g, '\\.');
		} else {
			imagePath = '';
		}

		var imageRegex = new RegExp('url\\(["\']?(' + imagePath + '[^)]*?)["\']?\\)');

		css.walkRules(function (rule) {
			rule.walkDecls(/^background(-image)?$/, function (decl) {
				var rule = decl.parent;
				var nodes = rule.nodes;
				var value = decl.value;
				// var prop = decl.prop;
				var CSSWidth = false;
				var CSSHeight = false;
				var CSSBGSize = false;

				nodes.forEach(function (node) {
					if (node.prop === 'width') {
						CSSWidth = true;
					}
					if (node.prop === 'height') {
						CSSHeight = true;
					}
					if (node.prop === 'background-size' || node.prop === '-webkit-background-size') {
						CSSBGSize = true;
					}
				});

				var matchValue = imageRegex.exec(value);

				if (!matchValue || matchValue[1].indexOf('data:') === 0) {
					return;
				}

				var relativePath = matchValue[1];
				var inputDir = dirname(decl.source.input.file);

				var absolutePath = fixAbsolutePath(inputDir, relativePath);

				if (value.indexOf('@2x') > -1) {
					options.retina = true;
				} else {
					options.retina = false;
				}

				var info = fastImageSize(absolutePath);

				if (info === undefined) {
					console.log('no exites file:' + absolutePath);
					return;
				}

				if (info.type === 'unknown') {
					console.log('unknown type: ' + absolutePath);
					return;
				}

				var valueWidth, valueHeight;

				if (options.retina) {
					valueWidth = (info.width / 2) + 'px';
					valueHeight = (info.height / 2) + 'px';
				} else {
					valueWidth = info.width + 'px';
					valueHeight = info.height + 'px';
				}

				if (options.width && !CSSWidth) {
					rule.append({prop: 'width', value: valueWidth});
				}

				if (options.height && !CSSHeight) {
					rule.append({prop: 'height', value: valueHeight});
				}

				if (options.backgroundSize && options.retina && !CSSBGSize) {
					rule.append({prop: 'background-size', value: valueWidth + ' ' + valueHeight});
				}
			});
		});
	};
});
