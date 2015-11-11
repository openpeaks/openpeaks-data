'use strict';

var utils = require('./utils');
var _ = utils._;

function getSets() {
	return require('../data/seqs/sets');
}

function getSetsBySource(source) {
	var items = getSets();
	return _.where(items, {
		source: source
	});
}

function getSet(id) {
	var items = getSets();
	return _.find(items, 'id', id);
}

exports.getSets = getSets;
exports.getSet = getSet;
exports.getSetsBySource = getSetsBySource;
