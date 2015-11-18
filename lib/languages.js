'use strict';

var utils = require('./utils');

function getLanguages(lang) {
	lang = utils.fixLang(lang);
	if (lang) {
		return require('../data/languages/locales/languages/' + lang);
	}
	return require('../data/languages/languages');
}

exports.getLanguages = getLanguages;
