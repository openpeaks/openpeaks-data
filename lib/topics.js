'use strict';

var utils = require('./utils');
var _ = utils._;

function requireCountries() {
	return require('../data/topics/countries');
}

function requireCountriesLocales(lang) {
	return require('../data/topics/locales/countries/' + lang);
}

function formatId(prefix, id) {
	if (id.indexOf(prefix) !== 0) {
		id = prefix + id;
	}
	return id;
}

function formatContinentId(id) {
	return formatId('continent:', id);
}

function formatCountryId(id) {
	return formatId('country:', id);
}

function getContinents() {
	return require('../data/topics/continents');
}

function getContinent(id) {
	id = formatContinentId(id);
	var items = getContinents();
	return _.find(items, 'id', id);
}

function getCountries(lang) {
	lang = utils.fixLang(lang);
	var countries = requireCountries();
	if (lang && !countries[0].name[lang]) {
		var locales = requireCountriesLocales(lang);
		countries.forEach(function(country) {
			country.name[lang] = locales[country.cca2];
		});
	}

	return countries;
}

function getCountry(id, lang) {
	id = formatCountryId(id);
	var items = getCountries(lang);
	return _.find(items, 'id', id);
}

function topicsByType(type, lang) {
	switch (type) {
		case 'continent':
			return getContinents(lang);
		case 'country':
			return getCountries(lang);
	}
	var topic;
	if (type.indexOf('continent') === 0) {
		topic = getContinent(type, lang);
	} else if (type.indexOf('country') === 0) {
		topic = getCountry(type, lang);
	}
	if (topic) {
		return [topic];
	}
	return [];
}

exports.formatContinentId = formatContinentId;
exports.getContinents = getContinents;
exports.getContinent = getContinent;
exports.getCountries = getCountries;
exports.getCountry = getCountry;
exports.topicsByType = topicsByType;
