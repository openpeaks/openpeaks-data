'use strict';

var utils = require('./utils');
var _ = utils._;

function getCategories() {
	return require('../data/categories/categories');
}

function getCategory(id) {
	var items = getCategories();
	return _.find(items, 'id', id);
}

exports.getCategory = getCategory;
exports.getCategories = getCategories;
