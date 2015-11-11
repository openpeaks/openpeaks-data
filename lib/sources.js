'use strict';

var utils = require('./utils');
var _ = utils._;

function getDatasets() {
  return require('../data/sources/datasets');
}

function getDataset(id) {
  var datasets = getDatasets();
  return _.find(datasets, 'id', id);
}

exports.getDataset = getDataset;
exports.getDatasets = getDatasets;
