'use strict';

var request = require('request');
var utils = require('../utils');
var Promise = utils.Promise;
var fs = require('fs');
var path = require('path');
var locales = require('../locales');

function getData(lang) {
	return new Promise(function(resolve, reject) {
		request({
			url: 'https://github.com/umpirsky/country-list/raw/master/country/cldr/' + lang + '/country.json',
			json: true
		}, function(error, response, body) {
			if (error || !body) {
				return reject(error);
			}
			for (var code in body) {
				body[code] = {
					official: body[code]
				};
			}
			resolve(body);
		});
	});
}

function saveData(lang, data) {
	var file = path.join(__dirname, '../../data/topics/locales/countries/' + lang + '.json');
	fs.writeFileSync(file, JSON.stringify(data));
}

function generate() {
	var languages = locales.getLanguages();
	return Promise.each(languages, function(lang) {
		console.log('getting data for', lang);
		return getData(lang).then(function(data) {
			return saveData(lang, data);
		});
	});
}

generate()
	.then(function(result) {
		console.log('DONE!', result);
	})
	.catch(function(error) {
		console.error(error);
	});
