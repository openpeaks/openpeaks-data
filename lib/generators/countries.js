'use strict';

var request = require('request');
var _ = require('../utils')._;
var fs = require('fs');
var path = require('path');

function getData(callback) {
	request({
		url: 'https://github.com/mledoze/countries/raw/master/countries.json',
		json: true
	}, callback);
}

function deleteEmptyFields(data, fields) {
	fields = fields || [];
	for (var prop in data) {
		if (~[null, undefined, ''].indexOf(data[prop]) || (_.isArray(data[prop]) && data[prop].length === 0) || (_.isPlainObject(data[prop]) && Object.keys(data[prop]).length === 0)) {
			delete data[prop];
		} else if (~fields.indexOf(prop)) {
			deleteEmptyFields(data[prop]);
		}
	}
}

function formatName(name) {
	if (name.common === name.official) {
		delete name.official;
	}
	delete name.native;
	// if (name.native) {
	// 	var native = name.native;
	// 	var nnative = {};
	// 	for (var code in native) {
	// 		nnative[code.substr(0, 2)] = formatName(native[code]);
	// 	}
	// 	name.native = nnative;
	// }
	return name;
}

function saveData(data) {
	var countries = [],
		country;
	data.forEach(function(item) {
		country = _.pick(item, 'name', 'region', 'subregion', 'cca2', 'cca3', 'ccn3', 'cioc', 'latlng');
		country.id = 'country:' + country.cca2.toLowerCase();
		deleteEmptyFields(country, ['name']);
		formatName(country.name);
		countries.push(country);
	});
	var file = path.join(__dirname, '../../data/topics/countries.json');
	fs.writeFileSync(file, JSON.stringify(countries));
}

function generate(callback) {
	getData(function(error, response, body) {
		if (error) {
			return callback(error);
		}
		saveData(body);
		callback();
	});
}

generate(function(error) {
	if (error) {
		console.error(error);
	}
});
