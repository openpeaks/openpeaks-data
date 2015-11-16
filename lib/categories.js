'use strict';

var utils = require('./utils');
var _ = utils._;

function getCategories() {
	return require('../data/categories/categories');
}

function getRootCategories(lang) {
	var items = getCategories(lang);
	return items.filter(function(item) {
		return !item.parent;
	});
}

function getSubCategories(category, lang) {
	var items = getCategories(lang);
	return items.filter(function(item) {
		return item.parent === category.id;
	});
}

function getCategory(id, lang) {
	var items = getCategories(lang);
	return _.find(items, 'id', id);
}

exports.getCategory = getCategory;
exports.getCategories = getCategories;
exports.getRootCategories = getRootCategories;
exports.getSubCategories = getSubCategories;
