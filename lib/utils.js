'use strict';

var _ = require('lodash');

exports._ = _;
exports.Promise = require('bluebird');
exports.fixLang = function(lang) {
	if (lang === 'en') {
		return null;
	}
	return lang;
};
