'use strict';

var utils = require('./utils');
var _ = utils._;

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

function getCountries() {
	return require('../data/topics/countries');
}

function getCountry(id) {
	id = formatCountryId(id);
	var items = getCountries();
	return _.find(items, 'id', id);
}

function getCountriesByContinent(id) {
	id = formatContinentId(id);
	var items = getCountries();
	return _.filter(items, function(country) {
		return ~country.parents.indexOf(id);
	});
}

function topicsByType(type) {
	switch (type) {
		case 'continent':
			return getContinents();
		case 'country':
			return getCountries();
	}
	var topic;
	if (type.indexOf('continent') === 0) {
		topic = getContinent(type);
	} else if (type.indexOf('country') === 0) {
		topic = getCountry(type);
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
exports.getCountriesByContinent = getCountriesByContinent;
exports.topicsByType = topicsByType;
