'use strict';

var request = require('request');
var utils = require('../utils');
var Promise = utils.Promise;
var fs = require('fs');
var path = require('path');
var locales = require('../locales');
// var cheerio = require('cheerio');

//https://accounts.google.com/SignUp for countries

// function getGoogleData(lang, data) {
// 	return new Promise(function(resolve, reject) {
// 		request({
// 			url: 'https://accounts.google.com/SignUp?hl=' + lang
// 		}, function(error, response, body) {
// 			if (error || !body) {
// 				return reject(error);
// 			}
// 			var $ = cheerio.load(body);
// 			$('#CountryCode option').each(function() {
// 				var el = $(this);
// 				var name = el.text().trim();
// 				var value = el.attr('value').trim();
// 				var i = name.indexOf('(');
// 				if (i > 0) {
// 					name = name.substr(0, i).trim();
// 				}
// 				if (data[value] && data[value] !== name) {
// 					console.log('renamed', data[value], 'to', name);
// 					data[value] = name;
// 				}
// 			});
// 			resolve(data);
// 		});
// 	});
// }

function getData(lang) {
	return new Promise(function(resolve, reject) {
		request({
			url: 'https://github.com/umpirsky/country-list/raw/master/country/cldr/' + lang + '/country.json',
			json: true
		}, function(error, response, body) {
			if (error || !body) {
				return reject(error);
			}
			// getGoogleData(lang, body).catch(reject).then(resolve);
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
