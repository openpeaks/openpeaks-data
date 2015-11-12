'use strict';

var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

function parseFileParts(content) {
	var regex = /^\s*[^\n]*?(([^\s\d\w])\2{2,})(?:\x20*([a-z]+))?([\s\S]*?)[^\n]*?\1[^\n]*/;

	var match = regex.exec(content);
	if (match) {
		return {
			seperator: match[1],
			parser: match[3] || 'yaml',
			header: yaml.safeLoad(match[4].trim().split('\n').map(function(line) {
				return line.trim();
			}).join('\n')),
			body: content.substring(match[0].length).trim()
		};
	} else {
		return {
			header: {},
			body: content
		};
	}
}

function getModel(name) {
	return require('./models/' + name);
}

function getArticle(lang, name) {
	var file = path.join(__dirname, '../../data/articles', lang, name + '.md');
	var data = fs.readFileSync(file, 'utf8');
	return parseFileParts(data);
}

exports.getModel = getModel;
exports.getArticle = getArticle;
